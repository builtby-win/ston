import { useCallback, useEffect, useState } from "react";

interface TerminalItem {
	name: string;
	url: string;
	type: "social" | "app";
	icon?: string;
	color?: string;
	description?: string;
}

const socialLinks: TerminalItem[] = [
	{
		name: "instagram",
		url: "https://instagram.com/winnieletsgo",
		type: "social",
		color: "var(--color-term-branch)",
		icon: "📷",
		description: "short form video about development",
	},
	{
		name: "youtube",
		url: "https://youtube.com/@winnieletsgo",
		type: "social",
		color: "var(--color-term-orange)",
		icon: "▶️",
		description: "long form videos about life",
	},
	{
		name: "github",
		url: "https://github.com/snoolord",
		type: "social",
		color: "var(--color-term-fg)",
		icon: "⚙️",
		description: "my public repositories",
	},
];

const apps: TerminalItem[] = [
	// { name: 'back2vibing', url: 'https://back2vibing.com', type: 'app', color: 'var(--color-term-dir)', icon: '🎵' },
	{
		name: "import-magic",
		url: "https://importmagic.app",
		type: "app",
		color: "var(--color-term-link)",
		icon: "✨",
		description: "a file transfer app like shotput pro or hedge offshoot",
	},
];

const allItems = [...socialLinks, ...apps];

export default function Terminal() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [showCursor, setShowCursor] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	// Detect mobile on mount
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Blinking cursor effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Tab") {
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
			} else if (e.key === "Enter" && selectedIndex !== null) {
				window.open(allItems[selectedIndex].url, "_blank");
			} else if (e.key === "Escape") {
				setSelectedIndex(null);
			}
		},
		[selectedIndex],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	const handleItemClick = (e: React.MouseEvent, url: string, index: number) => {
		e.preventDefault();
		e.stopPropagation();

		if (isMobile) {
			// Mobile: Two-click behavior
			if (selectedIndex === index) {
				// Second click on same item: Navigate
				window.open(url, "_blank");
			} else {
				// First click or different item: Just select
				setSelectedIndex(index);
			}
		} else {
			// Desktop: Navigate immediately
			window.open(url, "_blank");
		}
	};

	const handleItemHover = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<div className="min-h-screen flex flex-col justify-center px-6 py-12 max-w-4xl mx-auto">
			{/* Terminal prompt */}
			<div className="mb-8">
				<span style={{ color: "var(--color-term-prompt)" }}>→</span>
				<span className="ml-2">builtby.win</span>
				<span className="ml-2" style={{ color: "var(--color-term-fg-muted)" }}>
					git:(
				</span>
				<span style={{ color: "var(--color-term-branch)" }}>main</span>
				<span style={{ color: "var(--color-term-fg-muted)" }}>)</span>
				<span className="ml-2">cd</span>
				{selectedIndex !== null && (
					<span
						className="ml-1"
						style={{ color: allItems[selectedIndex].color }}
					>
						{allItems[selectedIndex].name}
					</span>
				)}
				<span
					className={`inline-block w-2 h-5 ml-1 align-middle ${showCursor ? "bg-[var(--color-term-fg)]" : "bg-transparent"}`}
				/>
			</div>

			{/* Socials section */}
			<div className="mb-6">
				<div className="text-[var(--color-term-fg-muted)] mb-2 text-sm">
					socials/
				</div>
				<div className="flex flex-wrap gap-x-8 gap-y-2 pl-4">
					{socialLinks.map((item, idx) => {
						const globalIndex = idx;
						const isSelected = selectedIndex === globalIndex;
						return (
							<button
								type="button"
								key={item.name}
								onClick={(e) => handleItemClick(e, item.url, globalIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
								onFocus={() => !isMobile && handleItemHover(globalIndex)}
								className={`
                  text-left transition-all duration-100 outline-none
                  ${isSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded" : ""}
                `}
								style={{ color: item.color }}
								tabIndex={-1}
							>
								{item.icon && <span className="mr-2">{item.icon}</span>}
								{item.name}
							</button>
						);
					})}
				</div>
			</div>

			{/* Apps section */}
			<div className="mb-8">
				<div className="text-[var(--color-term-fg-muted)] mb-2 text-sm">
					apps/
				</div>
				<div className="flex flex-wrap gap-x-8 gap-y-2 pl-4">
					{apps.map((item, idx) => {
						const globalIndex = socialLinks.length + idx;
						const isSelected = selectedIndex === globalIndex;
						return (
							<button
								type="button"
								key={item.name}
								onClick={(e) => handleItemClick(e, item.url, globalIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
								onFocus={() => !isMobile && handleItemHover(globalIndex)}
								className={`
                  text-left transition-all duration-100 outline-none
                  ${isSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded" : ""}
                `}
								style={{ color: item.color }}
								tabIndex={-1}
							>
								{item.icon && <span className="mr-2">{item.icon}</span>}
								{item.name}
							</button>
						);
					})}
				</div>
			</div>

			{/* Description */}
			{selectedIndex !== null && allItems[selectedIndex].description && (
				<div className="mt-4 text-[var(--color-term-fg-muted)] text-sm">
					{allItems[selectedIndex].description}
				</div>
			)}

			{/* Instructions */}
			<div className="mt-12 text-[var(--color-term-fg-muted)] text-sm">
				{isMobile ? (
					<>
						<span className="opacity-60">Tap to switch, tap again to open</span>
					</>
				) : (
					<>
						<span className="opacity-60">Press</span>
						<kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">
							Tab
						</kbd>
						<span className="opacity-60">to navigate,</span>
						<kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">
							Enter/Click
						</kbd>
						<span className="opacity-60">to open</span>
					</>
				)}
			</div>
		</div>
	);
}
