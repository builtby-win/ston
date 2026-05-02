import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaGithub, FaInstagram, FaTicketAlt, FaYoutube } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'

interface TerminalItem {
  name: string
  url: string
  type: 'social' | 'app' | 'blog' | 'header' | 'page'
  icon?: React.ReactNode
  color?: string
  description?: string
  isInternal?: boolean
}

interface TerminalSection {
  header: TerminalItem
  items: TerminalItem[]
}

// Section header items (tabbable)
const sectionHeaders: TerminalItem[] = [
  {
    name: 'pinned/',
    url: '/ston/pinned',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'blog/',
    url: '/ston/blog',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'socials/',
    url: '/ston/socials',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'apps/',
    url: '/ston/apps',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'repos/',
    url: '/ston/repos',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'misc/',
    url: '/ston/misc',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
]

interface BlogPost {
  title: string
  slug: string
  date: string
  url: string
}

interface TerminalProps {
  blogPosts?: BlogPost[]
}

const socialLinks: TerminalItem[] = [
  {
    name: 'instagram',
    url: 'https://instagram.com/winnieletsgo',
    type: 'social',
    color: 'var(--color-term-branch)',
    icon: <FaInstagram />,
    description: 'short form video about development',
  },
  {
    name: 'youtube',
    url: 'https://youtube.com/@winnieletsgo',
    type: 'social',
    color: 'var(--color-term-orange)',
    icon: <FaYoutube />,
    description: 'long form videos about life',
  },
]

const apps: TerminalItem[] = [
  {
    name: 'back2vibing',
    url: 'https://back2vibing.builtby.win/',
    type: 'app',
    color: 'var(--color-term-dir)',
    icon: '⚡',
    description:
      'superpower your AI workflow and easily juggle 10+ claude code, gemini, codex, or cursor sessions all at once.',
  },
  {
    name: 'import-magic',
    url: 'https://importmagic.app',
    type: 'app',
    color: 'var(--color-term-link)',
    icon: '✨',
    description: 'a file transfer app like shotput pro or hedge offshoot',
  },
  {
    name: 'areyougo.ing',
    url: 'https://areyougo.ing/',
    type: 'app',
    color: 'var(--color-term-dir)',
    icon: <FaTicketAlt />,
    description: 'a whimsical app for planning adventures',
  },
]

const repos: TerminalItem[] = [
  {
    name: 'dotfiles',
    url: 'https://github.com/builtby-win/dotfiles',
    type: 'app',
    color: 'var(--color-term-fg)',
    icon: <FaGithub />,
    description: 'my dev environment',
  },
  {
    name: 'configs',
    url: 'https://github.com/builtby-win/configs',
    type: 'app',
    color: 'var(--color-term-fg)',
    icon: <FaGithub />,
    description: 'sensible biome configs',
  },
  {
    name: 'skills',
    url: 'https://github.com/builtby-win/skills',
    type: 'app',
    color: 'var(--color-term-fg)',
    icon: <FaGithub />,
    description: 'useful claude skills to streamline development',
  },
  {
    name: 'generate-app-cli',
    url: 'https://github.com/builtby-win/generate-app-cli',
    type: 'app',
    color: 'var(--color-term-fg)',
    icon: <FaGithub />,
    description: 'cli to generate production ready desktop and web app boilerplates',
  },
  {
    name: 'ston',
    url: 'https://github.com/builtby-win/ston',
    type: 'app',
    color: 'var(--color-term-fg)',
    icon: <FaGithub />,
    description: "this portfolio website code that's open source",
  },
]

const misc: TerminalItem[] = [
  {
    name: 'fonts',
    url: '/ston/misc/fonts',
    type: 'page',
    color: 'var(--color-term-purple)',
    icon: <HiDocumentText />,
    description: 'typefaces i like for videos, sites, and experiments',
    isInternal: true,
  },
]

const pinned: TerminalItem[] = [
  {
    name: 'about',
    url: '/ston/about',
    type: 'page',
    color: 'var(--color-term-dir)',
    icon: <HiDocumentText />,
    description: 'now',
    isInternal: true,
  },
  {
    name: 'loose rules (to live by)',
    url: '/ston/blog/2026-01-12/loose-rules',
    type: 'blog',
    color: 'var(--color-term-orange)',
    icon: <HiDocumentText />,
    description: '📍 - thoughts on a loose life',
    isInternal: true,
  },
]

// Truncate text in the middle to fit a max length
const truncateMiddle = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  const ellipsis = '…'
  const charsToShow = maxLength - ellipsis.length
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)
  return text.slice(0, frontChars) + ellipsis + text.slice(-backChars)
}

const normalizeSearchText = (text: string) => text.toLowerCase().replace(/\s+/g, ' ').trim()

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

export default function Terminal({ blogPosts = [] }: TerminalProps) {
  const blogItems: TerminalItem[] = useMemo(
    () =>
      blogPosts.map((post) => ({
        name: post.title,
        url: post.url,
        type: 'blog' as const,
        color: 'var(--color-term-fg)',
        icon: <HiDocumentText />,
        description: post.date,
        isInternal: true,
      })),
    [blogPosts],
  )

  const sections = useMemo<TerminalSection[]>(
    () => [
      { header: sectionHeaders[0], items: pinned },
      { header: sectionHeaders[1], items: blogItems },
      { header: sectionHeaders[2], items: socialLinks },
      { header: sectionHeaders[3], items: apps },
      { header: sectionHeaders[4], items: repos },
      { header: sectionHeaders[5], items: misc },
    ],
    [blogItems],
  )

  // Build allItems with headers interleaved: [pinnedHeader, ...pinned, blogHeader, ...blogItems, ...]
  const allItems = useMemo(
    () => sections.flatMap((section) => [section.header, ...section.items]),
    [sections],
  )

  // Get the full path including section prefix for the selected item
  const getItemPath = useCallback(
    (index: number) => {
      const item = allItems[index]

      // Find which section this item belongs to
      let cursor = 0

      for (const section of sections) {
        if (index === cursor) {
          return section.header.name
        }

        const itemStartIndex = cursor + 1
        const itemEndIndex = itemStartIndex + section.items.length

        if (index >= itemStartIndex && index < itemEndIndex) {
          return section.header.name + item.name
        }

        cursor = itemEndIndex
      }

      return item.name
    },
    [allItems, sections],
  )
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const normalizedSearchQuery = normalizeSearchText(searchQuery)

  const filteredIndices = useMemo(() => {
    if (!normalizedSearchQuery) return allItems.map((_, index) => index)

    return allItems.reduce<number[]>((matches, item, index) => {
      const searchableText = normalizeSearchText(
        [getItemPath(index), item.name, item.description ?? '', item.type].join(' '),
      )

      if (searchableText.includes(normalizedSearchQuery)) {
        matches.push(index)
      }

      return matches
    }, [])
  }, [allItems, getItemPath, normalizedSearchQuery])

  const visibleIndices = useMemo(() => {
    if (!normalizedSearchQuery) return filteredIndices

    const visible = new Set(filteredIndices)
    let nextHeaderIndex = 0

    for (const section of sections) {
      const headerIndex = nextHeaderIndex
      const itemStartIndex = headerIndex + 1
      const itemEndIndex = itemStartIndex + section.items.length
      const hasVisibleChild = filteredIndices.some(
        (index) => index >= itemStartIndex && index < itemEndIndex,
      )

      if (hasVisibleChild) {
        visible.add(headerIndex)
      }

      nextHeaderIndex = itemEndIndex
    }

    return Array.from(visible).sort((a, b) => a - b)
  }, [filteredIndices, normalizedSearchQuery, sections])

  const visibleIndexSet = useMemo(() => new Set(visibleIndices), [visibleIndices])

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const navigateToItem = useCallback((item: TerminalItem) => {
    if (item.isInternal) {
      window.location.href = item.url
    } else {
      window.open(item.url, '_blank')
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isEditableTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === 'Tab') {
        e.preventDefault()
        const navigableIndices =
          filteredIndices.length > 0 ? filteredIndices : allItems.map((_, index) => index)

        if (e.shiftKey) {
          // Shift+Tab: go backwards
          setSelectedIndex((prev) => {
            if (prev === null) return navigableIndices[navigableIndices.length - 1]
            const currentPosition = navigableIndices.indexOf(prev)
            if (currentPosition <= 0) return navigableIndices[navigableIndices.length - 1]
            return navigableIndices[currentPosition - 1]
          })
        } else {
          // Tab: go forwards
          setSelectedIndex((prev) => {
            if (prev === null) return navigableIndices[0]
            const currentPosition = navigableIndices.indexOf(prev)
            if (currentPosition === -1 || currentPosition === navigableIndices.length - 1) {
              return navigableIndices[0]
            }
            return navigableIndices[currentPosition + 1]
          })
        }
      } else if (e.key === 'Enter' && selectedIndex !== null) {
        e.preventDefault()
        navigateToItem(allItems[selectedIndex])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setSearchQuery('')
        setSelectedIndex(null)
      } else if (e.key === 'Backspace' && searchQuery.length > 0) {
        e.preventDefault()
        const nextQuery = searchQuery.slice(0, -1)
        const normalizedNextQuery = normalizeSearchText(nextQuery)
        const nextMatches = normalizedNextQuery
          ? allItems.reduce<number[]>((matches, item, index) => {
              const searchableText = normalizeSearchText(
                [getItemPath(index), item.name, item.description ?? '', item.type].join(' '),
              )

              if (searchableText.includes(normalizedNextQuery)) {
                matches.push(index)
              }

              return matches
            }, [])
          : []

        setSearchQuery(nextQuery)
        setSelectedIndex(nextMatches[0] ?? null)
      } else if (e.key.length === 1) {
        e.preventDefault()
        const nextQuery = searchQuery + e.key
        const normalizedNextQuery = normalizeSearchText(nextQuery)
        const nextMatches = allItems.reduce<number[]>((matches, item, index) => {
          const searchableText = normalizeSearchText(
            [getItemPath(index), item.name, item.description ?? '', item.type].join(' '),
          )

          if (searchableText.includes(normalizedNextQuery)) {
            matches.push(index)
          }

          return matches
        }, [])

        setSearchQuery(nextQuery)
        setSelectedIndex(nextMatches[0] ?? null)
      }
    },
    [selectedIndex, filteredIndices, allItems, navigateToItem, searchQuery, getItemPath],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleItemClick = (e: React.MouseEvent, item: TerminalItem, index: number) => {
    e.preventDefault()
    e.stopPropagation()

    if (isMobile) {
      // Mobile: Two-click behavior
      if (selectedIndex === index) {
        // Second click on same item: Navigate
        navigateToItem(item)
      } else {
        // First click or different item: Just select
        setSelectedIndex(index)
      }
    } else {
      // Desktop: Navigate immediately
      navigateToItem(item)
    }
  }

  const handleItemHover = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 max-w-4xl mx-auto">
      {/* Terminal prompt */}
      <div className="mb-8">
        <div className={isMobile ? '' : 'inline'}>
          <span style={{ color: 'var(--color-term-prompt)' }}>→</span>
          <span className="ml-2" style={{ color: 'var(--color-term-dir)' }}>
            ~/builtby.win/ston
          </span>
          <span className="ml-2" style={{ color: 'var(--color-term-fg-muted)' }}>
            git:(
          </span>
          <span style={{ color: 'var(--color-term-branch)' }}>main</span>
          <span style={{ color: 'var(--color-term-fg-muted)' }}>)</span>
        </div>
        {isMobile && <br />}
        <span className={isMobile ? '' : 'ml-2'}>cd</span>
        {(searchQuery || selectedIndex !== null) && (
          <span
            className="ml-1"
            style={{
              color:
                selectedIndex !== null ? allItems[selectedIndex].color : 'var(--color-term-fg)',
            }}
          >
            {truncateMiddle(searchQuery || getItemPath(selectedIndex ?? 0), 30)}
          </span>
        )}
        <span
          className={`inline-block w-2 h-5 ml-1 align-middle ${showCursor ? 'bg-[var(--color-term-fg)]' : 'bg-transparent'}`}
        />
      </div>

      {/* Sections container - aligned with prompt */}
      <div className="pl-5 min-h-[28rem]">
        {/* Pinned section */}
        <div className={visibleIndexSet.has(0) ? 'mb-6' : 'hidden'}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(() => {
              const headerIndex = 0 // pinned/ is at index 0
              const isHeaderSelected = selectedIndex === headerIndex
              return (
                <button
                  type="button"
                  onClick={(e) => handleItemClick(e, sectionHeaders[0], headerIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                  onFocus={() => !isMobile && handleItemHover(headerIndex)}
                  className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
									${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
								`}
                  tabIndex={-1}
                >
                  pinned/
                </button>
              )
            })()}
            {pinned.map((item, idx) => {
              const globalIndex = 1 + idx // after pinned/ header
              const isSelected = selectedIndex === globalIndex
              return (
                <button
                  type="button"
                  key={item.url}
                  onClick={(e) => handleItemClick(e, item, globalIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                  onFocus={() => !isMobile && handleItemHover(globalIndex)}
                  className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
									${visibleIndexSet.has(globalIndex) ? '' : 'hidden'}
								`}
                  style={{ color: item.color }}
                  tabIndex={-1}
                >
                  {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Blog section */}
        <div className={visibleIndexSet.has(1 + pinned.length) ? 'mb-6' : 'hidden'}>
          <div className="flex items-start gap-x-2">
            {(() => {
              const headerIndex = 1 + pinned.length // blog/ header index
              const isHeaderSelected = selectedIndex === headerIndex
              return (
                <button
                  type="button"
                  onClick={(e) => handleItemClick(e, sectionHeaders[1], headerIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                  onFocus={() => !isMobile && handleItemHover(headerIndex)}
                  className={`
									transition-all duration-100 outline-none font-medium shrink-0
									${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
									${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
								`}
                  tabIndex={-1}
                >
                  blog/
                </button>
              )
            })()}
            <div className="flex flex-col gap-y-1">
              {blogItems.map((item, idx) => {
                const globalIndex = 1 + pinned.length + 1 + idx // starts after pinned section + blog/ header
                const isSelected = selectedIndex === globalIndex
                return (
                  <button
                    type="button"
                    key={item.url}
                    onClick={(e) => handleItemClick(e, item, globalIndex)}
                    onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                    onFocus={() => !isMobile && handleItemHover(globalIndex)}
                    className={`
										text-left transition-all duration-100 outline-none flex items-center 										${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
										${visibleIndexSet.has(globalIndex) ? '' : 'hidden'}
									`}
                    style={{ color: item.color }}
                    tabIndex={-1}
                  >
                    {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Socials section */}
        <div
          className={
            visibleIndexSet.has(1 + pinned.length + 1 + blogItems.length) ? 'mb-6' : 'hidden'
          }
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(() => {
              const headerIndex = 1 + pinned.length + 1 + blogItems.length // socials/ header index
              const isHeaderSelected = selectedIndex === headerIndex
              return (
                <button
                  type="button"
                  onClick={(e) => handleItemClick(e, sectionHeaders[2], headerIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                  onFocus={() => !isMobile && handleItemHover(headerIndex)}
                  className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
									${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
								`}
                  tabIndex={-1}
                >
                  socials/
                </button>
              )
            })()}
            {socialLinks.map((item, idx) => {
              const globalIndex = 1 + pinned.length + 1 + blogItems.length + 1 + idx // after pinned + blog section + socials header
              const isSelected = selectedIndex === globalIndex
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={(e) => handleItemClick(e, item, globalIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                  onFocus={() => !isMobile && handleItemHover(globalIndex)}
                  className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
									${visibleIndexSet.has(globalIndex) ? '' : 'hidden'}
								`}
                  style={{ color: item.color }}
                  tabIndex={-1}
                >
                  {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Apps section */}
        <div
          className={
            visibleIndexSet.has(1 + pinned.length + 1 + blogItems.length + 1 + socialLinks.length)
              ? 'mb-6'
              : 'hidden'
          }
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(() => {
              const headerIndex = 1 + pinned.length + 1 + blogItems.length + 1 + socialLinks.length // apps/ header index
              const isHeaderSelected = selectedIndex === headerIndex
              return (
                <button
                  type="button"
                  onClick={(e) => handleItemClick(e, sectionHeaders[3], headerIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                  onFocus={() => !isMobile && handleItemHover(headerIndex)}
                  className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
									${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
								`}
                  tabIndex={-1}
                >
                  apps/
                </button>
              )
            })()}
            {apps.map((item, idx) => {
              const globalIndex =
                1 + pinned.length + 1 + blogItems.length + 1 + socialLinks.length + 1 + idx
              const isSelected = selectedIndex === globalIndex
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={(e) => handleItemClick(e, item, globalIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                  onFocus={() => !isMobile && handleItemHover(globalIndex)}
                  className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
									${visibleIndexSet.has(globalIndex) ? '' : 'hidden'}
								`}
                  style={{ color: item.color }}
                  tabIndex={-1}
                >
                  {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Repos section */}
        <div
          className={
            visibleIndexSet.has(
              1 + pinned.length + 1 + blogItems.length + 1 + socialLinks.length + 1 + apps.length,
            )
              ? 'mb-6'
              : 'hidden'
          }
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(() => {
              const headerIndex =
                1 + pinned.length + 1 + blogItems.length + 1 + socialLinks.length + 1 + apps.length
              const isHeaderSelected = selectedIndex === headerIndex
              return (
                <button
                  type="button"
                  onClick={(e) => handleItemClick(e, sectionHeaders[4], headerIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                  onFocus={() => !isMobile && handleItemHover(headerIndex)}
                  className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
									${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
								`}
                  tabIndex={-1}
                >
                  repos/
                </button>
              )
            })()}
            {repos.map((item, idx) => {
              const globalIndex =
                1 +
                pinned.length +
                1 +
                blogItems.length +
                1 +
                socialLinks.length +
                1 +
                apps.length +
                1 +
                idx
              const isSelected = selectedIndex === globalIndex
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={(e) => handleItemClick(e, item, globalIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                  onFocus={() => !isMobile && handleItemHover(globalIndex)}
                  className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
									${visibleIndexSet.has(globalIndex) ? '' : 'hidden'}
								`}
                  style={{ color: item.color }}
                  tabIndex={-1}
                >
                  {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Misc section */}
        <div
          className={
            visibleIndexSet.has(
              1 +
                pinned.length +
                1 +
                blogItems.length +
                1 +
                socialLinks.length +
                1 +
                apps.length +
                1 +
                repos.length,
            )
              ? 'mb-8'
              : 'hidden'
          }
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(() => {
              const headerIndex =
                1 +
                pinned.length +
                1 +
                blogItems.length +
                1 +
                socialLinks.length +
                1 +
                apps.length +
                1 +
                repos.length
              const isHeaderSelected = selectedIndex === headerIndex
              return (
                <button
                  type="button"
                  onClick={(e) => handleItemClick(e, sectionHeaders[5], headerIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                  onFocus={() => !isMobile && handleItemHover(headerIndex)}
                  className={`
									transition-all duration-100 outline-none font-medium
									${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
									${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
								`}
                  tabIndex={-1}
                >
                  misc/
                </button>
              )
            })()}
            {misc.map((item, idx) => {
              const globalIndex =
                1 +
                pinned.length +
                1 +
                blogItems.length +
                1 +
                socialLinks.length +
                1 +
                apps.length +
                1 +
                repos.length +
                1 +
                idx
              const isSelected = selectedIndex === globalIndex
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={(e) => handleItemClick(e, item, globalIndex)}
                  onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                  onFocus={() => !isMobile && handleItemHover(globalIndex)}
                  className={`
									text-left transition-all duration-100 outline-none flex items-center
									${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
									${visibleIndexSet.has(globalIndex) ? '' : 'hidden'}
								`}
                  style={{ color: item.color }}
                  tabIndex={-1}
                >
                  {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Description */}
        {normalizedSearchQuery && filteredIndices.length === 0 && (
          <div className="mt-4 text-[var(--color-term-fg-muted)] text-sm">
            No matches. Press Esc to clear.
          </div>
        )}

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
            <span className="opacity-60">Type to filter,</span>
            <kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">
              Tab
            </kbd>
            <span className="opacity-60">to cycle,</span>
            <span className="opacity-60 ml-1">press</span>
            <kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">
              Enter
            </kbd>
            <span className="opacity-60">to open,</span>
            <kbd className="mx-1 px-1.5 py-0.5 bg-[var(--color-term-bg-lighter)] rounded text-xs">
              Esc
            </kbd>
            <span className="opacity-60">to clear</span>
          </>
        )}
      </div>
    </div>
  )
}
