import { useState, useEffect, useCallback } from 'react';

interface TerminalItem {
  name: string;
  url: string;
  type: 'social' | 'app';
  icon?: string;
  color?: string;
}

const socialLinks: TerminalItem[] = [
  { name: 'instagram', url: 'https://instagram.com/builtbywin', type: 'social', color: 'var(--color-term-branch)' },
  { name: 'youtube', url: 'https://youtube.com/@builtbywin', type: 'social', color: 'var(--color-term-orange)' },
  { name: 'github', url: 'https://github.com/builtby-win', type: 'social', color: 'var(--color-term-fg)' },
];

const apps: TerminalItem[] = [
  { name: 'back2vibing', url: 'https://back2vibing.com', type: 'app', color: 'var(--color-term-dir)' },
  { name: 'import-magic', url: 'https://import-magic.com', type: 'app', color: 'var(--color-term-link)' },
];

const allItems = [...socialLinks, ...apps];

export default function Terminal() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: go backwards
        setSelectedIndex((prev) => {
          if (prev === null || prev === 0) return allItems.length - 1;
          return prev - 1;
        });
      } else {
        // Tab: go forwards
        setSelectedIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % allItems.length;
        });
      }
    } else if (e.key === 'Enter' && selectedIndex !== null) {
      window.open(allItems[selectedIndex].url, '_blank');
    } else if (e.key === 'Escape') {
      setSelectedIndex(null);
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleItemClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleItemHover = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 max-w-4xl mx-auto">
      {/* Terminal prompt */}
      <div className="mb-8">
        <span style={{ color: 'var(--color-term-prompt)' }}>→</span>
        <span className="ml-2">builtby.win</span>
        <span className="ml-2" style={{ color: 'var(--color-term-fg-muted)' }}>git:(</span>
        <span style={{ color: 'var(--color-term-branch)' }}>main</span>
        <span style={{ color: 'var(--color-term-fg-muted)' }}>)</span>
        <span className="ml-2">ls -la</span>
      </div>

      {/* Socials section */}
      <div className="mb-6">
        <div className="text-[var(--color-term-fg-muted)] mb-2 text-sm">drwxr-xr-x  socials/</div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 pl-4">
          {socialLinks.map((item, idx) => {
            const globalIndex = idx;
            const isSelected = selectedIndex === globalIndex;
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item.url)}
                onMouseEnter={() => handleItemHover(globalIndex)}
                onFocus={() => handleItemHover(globalIndex)}
                className={`
                  text-left transition-all duration-100 outline-none
                  ${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
                `}
                style={{ color: item.color }}
                tabIndex={-1}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Apps section */}
      <div className="mb-8">
        <div className="text-[var(--color-term-fg-muted)] mb-2 text-sm">drwxr-xr-x  apps/</div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 pl-4">
          {apps.map((item, idx) => {
            const globalIndex = socialLinks.length + idx;
            const isSelected = selectedIndex === globalIndex;
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item.url)}
                onMouseEnter={() => handleItemHover(globalIndex)}
                onFocus={() => handleItemHover(globalIndex)}
                className={`
                  text-left transition-all duration-100 outline-none
                  ${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
                `}
                style={{ color: item.color }}
                tabIndex={-1}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input line with blinking cursor */}
      <div className="mt-4">
        <span style={{ color: 'var(--color-term-prompt)' }}>→</span>
        <span className="ml-2">builtby.win</span>
        <span className="ml-2" style={{ color: 'var(--color-term-fg-muted)' }}>git:(</span>
        <span style={{ color: 'var(--color-term-branch)' }}>main</span>
        <span style={{ color: 'var(--color-term-fg-muted)' }}>)</span>
        <span className="ml-2">
          {selectedIndex !== null && (
            <span style={{ color: 'var(--color-term-fg-muted)' }}>
              cd {allItems[selectedIndex].name}
            </span>
          )}
          <span
            className={`inline-block w-2 h-5 ml-1 align-middle ${showCursor ? 'bg-[var(--color-term-fg)]' : 'bg-transparent'}`}
          />
        </span>
      </div>

      {/* Instructions */}
      <div className="mt-12 text-[var(--color-term-fg-muted)] text-sm">
        <span className="opacity-60">Press</span>
        <kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">Tab</kbd>
        <span className="opacity-60">to navigate,</span>
        <kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">Enter</kbd>
        <span className="opacity-60">to open</span>
      </div>
    </div>
  );
}
