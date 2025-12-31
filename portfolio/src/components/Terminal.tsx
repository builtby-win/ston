import { useCallback, useEffect, useState, useMemo } from "react";
import { FaInstagram, FaYoutube, FaGithub, FaTicketAlt } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

interface TerminalItem {
	name: string;
	url: string;
	type: "social" | "app" | "blog" | "header";
	icon?: React.ReactNode;
	color?: string;
	description?: string;
	isInternal?: boolean;
}

// Section header items (tabbable)
const sectionHeaders: TerminalItem[] = [
	{
		name: "blog/",
		url: "/ston/blog",
		type: "header",
		color: "var(--color-term-fg-muted)",
		isInternal: true,
	},
	{
		name: "socials/",
		url: "/ston/socials",
		type: "header",
		color: "var(--color-term-fg-muted)",
		isInternal: true,
	},
	{
		name: "apps/",
		url: "/ston/apps",
		type: "header",
		color: "var(--color-term-fg-muted)",
		isInternal: true,
	},
	{
		name: "repos/",
		url: "https://github.com/builtby-win",
		type: "header",
		color: "var(--color-term-fg-muted)",
		isInternal: false,
	},
];

interface BlogPost {
	title: string;
	slug: string;
	date: string;
	url: string;
}

interface TerminalProps {
	blogPosts?: BlogPost[];
}

const socialLinks: TerminalItem[] = [
	{
		name: "instagram",
		url: "https://instagram.com/winnieletsgo",
		type: "social",
		color: "var(--color-term-branch)",
		icon: <FaInstagram />,
		description: "short form video about development",
	},
	{
		name: "youtube",
		url: "https://youtube.com/@winnieletsgo",
		type: "social",
		color: "var(--color-term-orange)",
		icon: <FaYoutube />,
		description: "long form videos about life",
	},
];

const apps: TerminalItem[] = [
	// { name: 'back2vibing', url: 'https://back2vibing.com', type: 'app', color: 'var(--color-term-dir)', icon: <FaMusic /> },
	{
		name: "import-magic",
		url: "https://importmagic.app",
		type: "app",
		color: "var(--color-term-link)",
		icon: "✨",
		description: "a file transfer app like shotput pro or hedge offshoot",
	},
	{
		name: "areyougo.ing",
		url: "https://areyougo.ing/",
		type: "app",
		color: "var(--color-term-dir)",
		icon: <FaTicketAlt />,
		description: "a whimsical app for planning adventures",
	},
];

const repos: TerminalItem[] = [
	{
		name: "configs",
		url: "https://github.com/builtby-win/configs",
		type: "app",
		color: "var(--color-term-fg)",
		icon: <FaGithub />,
		description: "sensible biome configs",
	},
	{
		name: "skills",
		url: "https://github.com/builtby-win/skills",
		type: "app",
		color: "var(--color-term-fg)",
		icon: <FaGithub />,
		description: "useful claude skills to streamline development",
	},
	{
		name: "generate-app-cli",
		url: "https://github.com/builtby-win/generate-app-cli",
		type: "app",
		color: "var(--color-term-fg)",
		icon: <FaGithub />,
		description: "cli to generate production ready desktop and web app boilerplates",
	},
	{
		name: "ston",
		url: "https://github.com/builtby-win/ston",
		type: "app",
		color: "var(--color-term-fg)",
		icon: <FaGithub />,
		description: "this portfolio website code that's open source",
	},
];

export default function Terminal({ blogPosts = [] }: TerminalProps) {
	const blogItems: TerminalItem[] = useMemo(() =>
		blogPosts.map(post => ({
			name: post.title,
			url: post.url,
			type: "blog" as const,
			color: "var(--color-term-fg)",
			icon: <HiDocumentText />,
			description: post.date,
			isInternal: true,
		})),
		[blogPosts]
	);

	// Build allItems with headers interleaved: [blogHeader, ...blogItems, socialsHeader, ...socialLinks, ...]
	const allItems = useMemo(() => [
		sectionHeaders[0], // blog/
		...blogItems,
		sectionHeaders[1], // socials/
		...socialLinks,
		sectionHeaders[2], // apps/
		...apps,
		sectionHeaders[3], // repos/
		...repos,
	], [blogItems]);

	// Get the full path including section prefix for the selected item
	const getItemPath = useCallback((index: number) => {
		const item = allItems[index];

		// Find which section this item belongs to
		let sectionPrefix = '';
		if (index <= blogItems.length) {
			sectionPrefix = 'blog/';
		} else if (index <= 1 + blogItems.length + 1 + socialLinks.length) {
			sectionPrefix = 'socials/';
		} else if (index <= 1 + blogItems.length + 1 + socialLinks.length + 1 + apps.length) {
			sectionPrefix = 'apps/';
		} else {
			sectionPrefix = 'repos/';
		}

		// Headers already have the slash, other items need the prefix
		if (item.type === 'header') {
			return item.name;
		}
		return sectionPrefix + item.name;
	}, [allItems, blogItems.length, socialLinks.length, apps.length]);
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

	const navigateToItem = useCallback((item: TerminalItem) => {
		if (item.isInternal) {
			window.location.href = item.url;
		} else {
			window.open(item.url, "_blank");
		}
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
				navigateToItem(allItems[selectedIndex]);
			} else if (e.key === "Escape") {
				setSelectedIndex(null);
			}
		},
		[selectedIndex, allItems, navigateToItem],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	const handleItemClick = (e: React.MouseEvent, item: TerminalItem, index: number) => {
		e.preventDefault();
		e.stopPropagation();

		if (isMobile) {
			// Mobile: Two-click behavior
			if (selectedIndex === index) {
				// Second click on same item: Navigate
				navigateToItem(item);
			} else {
				// First click or different item: Just select
				setSelectedIndex(index);
			}
		} else {
			// Desktop: Navigate immediately
			navigateToItem(item);
		}
	};

	const handleItemHover = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<div className="min-h-screen flex flex-col justify-center px-6 py-12 max-w-4xl mx-auto">
			{/* Terminal prompt */}
			<div className="mb-8">
				<div className={isMobile ? "" : "inline"}>
					<span style={{ color: "var(--color-term-prompt)" }}>→</span>
					<span className="ml-2" style={{ color: "var(--color-term-dir)" }}>~/builtby.win/ston</span>
					<span className="ml-2" style={{ color: "var(--color-term-fg-muted)" }}>
						git:(
					</span>
					<span style={{ color: "var(--color-term-branch)" }}>main</span>
					<span style={{ color: "var(--color-term-fg-muted)" }}>)</span>
				</div>
				{isMobile && <br />}
				<span className={isMobile ? "" : "ml-2"}>cd</span>
				{selectedIndex !== null && (
					<span
						className="ml-1"
						style={{ color: allItems[selectedIndex].color }}
					>
						{getItemPath(selectedIndex)}
					</span>
				)}
				<span
					className={`inline-block w-2 h-5 ml-1 align-middle ${showCursor ? "bg-[var(--color-term-fg)]" : "bg-transparent"}`}
				/>
			</div>

			{/* Sections container - aligned with prompt */}
			<div className="pl-5">
			{/* Blog section */}
			<div className="mb-6">
				<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
					{(() => {
						const headerIndex = 0; // blog/ is at index 0
						const isHeaderSelected = selectedIndex === headerIndex;
						return (
							<button
								type="button"
								onClick={(e) => handleItemClick(e, sectionHeaders[0], headerIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
								onFocus={() => !isMobile && handleItemHover(headerIndex)}
								className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]" : "text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline"}
								`}
								tabIndex={-1}
							>
								blog/
							</button>
						);
					})()}
					{blogItems.map((item, idx) => {
						const globalIndex = 1 + idx; // starts after blog/ header
						const isSelected = selectedIndex === globalIndex;
						return (
							<button
								type="button"
								key={item.url}
								onClick={(e) => handleItemClick(e, item, globalIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
								onFocus={() => !isMobile && handleItemHover(globalIndex)}
								className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded" : ""}
								`}
								style={{ color: item.color }}
								tabIndex={-1}
							>
								{item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
								{item.name}
							</button>
						);
					})}
				</div>
			</div>

			{/* Socials section */}
			<div className="mb-6">
				<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
					{(() => {
						const headerIndex = 1 + blogItems.length; // socials/ header index
						const isHeaderSelected = selectedIndex === headerIndex;
						return (
							<button
								type="button"
								onClick={(e) => handleItemClick(e, sectionHeaders[1], headerIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
								onFocus={() => !isMobile && handleItemHover(headerIndex)}
								className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]" : "text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline"}
								`}
								tabIndex={-1}
							>
								socials/
							</button>
						);
					})()}
					{socialLinks.map((item, idx) => {
						const globalIndex = 1 + blogItems.length + 1 + idx; // after blog section + socials header
						const isSelected = selectedIndex === globalIndex;
						return (
							<button
								type="button"
								key={item.name}
								onClick={(e) => handleItemClick(e, item, globalIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
								onFocus={() => !isMobile && handleItemHover(globalIndex)}
								className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded" : ""}
								`}
								style={{ color: item.color }}
								tabIndex={-1}
							>
								{item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
								{item.name}
							</button>
						);
					})}
				</div>
			</div>

			{/* Apps section */}
			<div className="mb-6">
				<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
					{(() => {
						const headerIndex = 1 + blogItems.length + 1 + socialLinks.length; // apps/ header index
						const isHeaderSelected = selectedIndex === headerIndex;
						return (
							<button
								type="button"
								onClick={(e) => handleItemClick(e, sectionHeaders[2], headerIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
								onFocus={() => !isMobile && handleItemHover(headerIndex)}
								className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]" : "text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline"}
								`}
								tabIndex={-1}
							>
								apps/
							</button>
						);
					})()}
					{apps.map((item, idx) => {
						const globalIndex = 1 + blogItems.length + 1 + socialLinks.length + 1 + idx;
						const isSelected = selectedIndex === globalIndex;
						return (
							<button
								type="button"
								key={item.name}
								onClick={(e) => handleItemClick(e, item, globalIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
								onFocus={() => !isMobile && handleItemHover(globalIndex)}
								className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded" : ""}
								`}
								style={{ color: item.color }}
								tabIndex={-1}
							>
								{item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
								{item.name}
							</button>
						);
					})}
				</div>
			</div>

			{/* Repos section */}
			<div className="mb-8">
				<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
					{(() => {
						const headerIndex = 1 + blogItems.length + 1 + socialLinks.length + 1 + apps.length; // repos/ header index
						const isHeaderSelected = selectedIndex === headerIndex;
						return (
							<button
								type="button"
								onClick={(e) => handleItemClick(e, sectionHeaders[3], headerIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
								onFocus={() => !isMobile && handleItemHover(headerIndex)}
								className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]" : "text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline"}
								`}
								tabIndex={-1}
							>
								repos/
							</button>
						);
					})()}
					{repos.map((item, idx) => {
						const globalIndex = 1 + blogItems.length + 1 + socialLinks.length + 1 + apps.length + 1 + idx;
						const isSelected = selectedIndex === globalIndex;
						return (
							<button
								type="button"
								key={item.name}
								onClick={(e) => handleItemClick(e, item, globalIndex)}
								onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
								onFocus={() => !isMobile && handleItemHover(globalIndex)}
								className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? "ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded" : ""}
								`}
								style={{ color: item.color }}
								tabIndex={-1}
							>
								{item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
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
			</div>

			{/* Instructions */}
			<div className="pl-5 mt-12 text-[var(--color-term-fg-muted)] text-sm">
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
