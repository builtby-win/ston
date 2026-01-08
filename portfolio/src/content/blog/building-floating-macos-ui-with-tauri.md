---
title: "Building Floating macOS UI with Tauri and NSPanel"
date: 2026-01-06
description: "A deep dive into building a floating dock UI on macOS - NSPanel configuration, click-through transparency, cross-process window raising, and the peek-on-hover pattern"
tags: ["rust", "tauri", "macos", "nspanel", "back2vibing"]
draft: true
---

![Floating dock demo showing the back2vibing session dock](/blog/floating-dock-demo.gif)

While building [back2vibing](https://back2vibing.builtby.win/), I needed to create a floating session dock that stays above all windows, supports peek-on-hover, and doesn't interfere with other apps. This turned out to be way harder than expected.

Here's everything I learned about building floating UI on macOS with Tauri.

## The Goal

I wanted a small dock that:
1. Floats above all windows (including fullscreen apps)
2. Stays visible when switching apps
3. Has transparent rounded corners that pass through clicks
4. Can "peek" other app windows on hover without losing focus
5. Supports native drag-to-move

Sounds simple, right? It took me weeks to get right.

## NSPanel vs NSWindow

Regular Tauri windows are `NSWindow` under the hood. They work fine for most apps, but for floating UI you need `NSPanel` - a special window subclass designed for palettes, inspectors, and floating tools.

I used [tauri-nspanel](https://github.com/nicoburniske/tauri-nspanel) to convert my Tauri window to an NSPanel:

```rust
use tauri_nspanel::{ManagerExt, WebviewWindowExt};

// Convert existing window to panel
let window = app.get_webview_window("session-dock")?;
let panel = window.to_panel::<SessionDockPanel>()?;
```

## Staying Above Everything

Three things make a panel float above all windows:

### 1. Window Level

```rust
panel.set_level(25); // NSStatusWindowLevel
```

Level 25 is `NSStatusWindowLevel` - the same level as the menu bar clock. This keeps the panel above normal windows but below alerts.

### 2. Collection Behavior

```rust
use tauri_nspanel::panel::NSWindowCollectionBehavior;

panel.set_collection_behavior(
    NSWindowCollectionBehavior::CanJoinAllSpaces      // visible on all desktops
        | NSWindowCollectionBehavior::FullScreenAuxiliary  // visible in fullscreen
        | NSWindowCollectionBehavior::Stationary      // immune to Cmd+H
        | NSWindowCollectionBehavior::IgnoresCycle,   // skip in Cmd+Tab
);
```

The key ones are:
- `CanJoinAllSpaces`: Shows on every virtual desktop
- `FullScreenAuxiliary`: Visible when another app is fullscreen
- `Stationary`: Prevents Cmd+H from hiding it

### 3. Prevent Hiding

```rust
unsafe {
    let ns_window_ptr = panel.ns_window()? as *mut objc::runtime::Object;
    let _: () = msg_send![ns_window_ptr, setCanHide: false];
}
panel.set_hides_on_deactivate(false);
```

This prevents macOS from hiding the panel when the app loses focus.

## Click-Through Transparency

I wanted rounded corners with a drop shadow, but clicks on transparent areas should pass through to windows below. This requires two things:

### In Rust

```rust
unsafe {
    let ns_window_ptr = panel.ns_window()? as *mut objc::runtime::Object;

    // Make window non-opaque
    let _: () = msg_send![ns_window_ptr, setOpaque: false];

    // Set clear background - critical for click-through
    let clear_color: *mut objc::runtime::Object = msg_send![class!(NSColor), clearColor];
    let _: () = msg_send![ns_window_ptr, setBackgroundColor: clear_color];
}
```

### In CSS

```css
html, body {
  background: transparent !important;
}
#root {
  background: transparent !important;
  display: inline-block; /* fit content exactly */
}
```

Now clicks on the rounded corners pass through to whatever's underneath.

## The Peek-on-Hover Pattern

This was the hardest part. I wanted to hover over a session tile and have that app's window rise to the front *without* losing mouse focus on the dock.

### The Problem

When you raise another app's window, macOS activates that app. This means:
1. Your app loses focus
2. Your NSPanel might hide (depending on configuration)
3. Even if it doesn't hide, it stops receiving mouse events

### The Solution: Non-Activating Panel

The key insight is `NSWindowStyleMaskNonActivatingPanel`:

```rust
use tauri_nspanel::objc2_app_kit::NSWindowStyleMask;
panel.set_style_mask(NSWindowStyleMask::NonactivatingPanel);
```

This makes the panel receive mouse events *without activating your app*. When hovering, your panel keeps receiving events even when another app is frontmost.

### Cross-Process Window Raising

But wait - how do you raise another app's window without making it the active app?

I tried `CGSSetWindowLevel` first - it silently fails for windows you don't own.

The solution is the private SkyLight framework API:

```rust
#[link(name = "SkyLight", kind = "framework")]
extern "C" {
    fn _SLPSSetFrontProcessWithOptions(
        psn: *mut ProcessSerialNumber,
        window_id: u32,
        mode: u32,
    ) -> i32;
}

pub fn raise_window_without_focus(pid: i32, window_id: u32) -> Result<(), String> {
    let mut psn = get_psn_for_pid(pid)?;

    // UserGenerated mode (0x200) raises the window visually
    let result = unsafe {
        _SLPSSetFrontProcessWithOptions(&mut psn, window_id, 0x200)
    };

    // Don't reactivate our app - the non-activating panel keeps receiving events!
    Ok(())
}
```

The magic is that with `NonactivatingPanel`, you don't need to reactivate your app after raising the other window. The panel just keeps receiving hover events.

## Dynamic Sizing

For the dock to resize based on content, I measure the DOM after render:

```tsx
const containerRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const frameId = requestAnimationFrame(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth
      commands.resizeDock(width, DOCK_HEIGHT)
    }
  })
  return () => cancelAnimationFrame(frameId)
}, [sessions.length])
```

On the Rust side, I use `setFrame:display:animate:` for atomic position + size updates:

```rust
let new_frame = NSRect {
    origin: NSPoint { x, y },
    size: NSSize { width, height },
};
let _: () = msg_send![ns_window, setFrame:new_frame display:true animate:false];
```

## Dragging

CSS `app-region: drag` doesn't work with NSPanel. You need to handle dragging manually.

The cleanest approach is `performWindowDragWithEvent`:

```rust
pub fn start_drag_dock(app: &AppHandle) -> Result<(), String> {
    let panel = app.get_webview_panel("session-dock")?;
    let ns_window = panel.ns_window()? as *mut objc::runtime::Object;

    unsafe {
        let ns_app: *mut objc::runtime::Object =
            msg_send![class!(NSApplication), sharedApplication];
        let current_event: *mut objc::runtime::Object = msg_send![ns_app, currentEvent];

        if !current_event.is_null() {
            let _: () = msg_send![ns_window, performWindowDragWithEvent: current_event];
        }
    }
    Ok(())
}
```

In React, trigger this on mousedown:

```tsx
<div
  onMouseDown={() => commands.startDragDock()}
  className="cursor-grab active:cursor-grabbing"
>
  ⋮⋮
</div>
```

## Thread Safety Warning

ALL NSWindow/NSPanel operations must run on the main thread. Calling from tokio tasks or worker threads causes hard crashes.

Always wrap in `run_on_main_thread()`:

```rust
// WRONG - crashes from tokio/worker thread
panel.show();

// CORRECT - runs on main thread
app_handle.run_on_main_thread(move || {
    panel.show();
});
```

## Summary

Building floating UI on macOS with Tauri requires:

1. **NSPanel** instead of NSWindow (via tauri-nspanel)
2. **Window level 25** + collection behaviors for floating
3. **Clear background + non-opaque** for click-through transparency
4. **NonactivatingPanel style mask** for hover-while-focused behavior
5. **SkyLight APIs** for cross-process window raising
6. **performWindowDragWithEvent** for dragging
7. **Main thread** for all window operations

It's a lot of undocumented macOS knowledge, but once you understand it, you can build some really slick floating UI.

Check out [back2vibing](https://github.com/builtby-win/back2vibing) if you want to see the full implementation.
