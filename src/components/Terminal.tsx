import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaEnvelope, FaGithub, FaInstagram, FaTicketAlt, FaYoutube } from 'react-icons/fa'
import { HiBriefcase, HiDocumentText, HiUser } from 'react-icons/hi'

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
    url: '/ston/pinned/',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'referrals/',
    url: '/ston/raw/',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'blog/',
    url: '/ston/blog/',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'socials/',
    url: '/ston/socials/',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'apps/',
    url: '/ston/apps/',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'repos/',
    url: '/ston/repos/',
    type: 'header',
    color: 'var(--color-term-fg-muted)',
    isInternal: true,
  },
  {
    name: 'misc/',
    url: '/ston/misc/',
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
  {
    name: 'email',
    url: 'mailto:winston.j.zhao@gmail.com',
    type: 'social',
    color: 'var(--color-term-link)',
    icon: <FaEnvelope />,
    description: 'email me',
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
    description: 'a live event database with set times, planned with friends',
  },
  {
    name: 'maple-closet',
    url: 'https://maple-closet.builtby.win/',
    type: 'app',
    color: 'var(--color-term-branch)',
    icon: '🍁',
    description: 'dress-up preview for maplestory classic world',
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
    url: '/ston/misc/fonts/',
    type: 'page',
    color: 'var(--color-term-purple)',
    icon: <HiDocumentText />,
    description: 'typefaces i like for videos, sites, and experiments',
    isInternal: true,
  },
]


const referrals: TerminalItem[] = [
  {
    name: 'opencode go $5',
    url: 'https://opencode.ai/go?ref=N38MF3HBV5',
    type: 'page',
    color: 'var(--color-term-link)',
    icon: <HiDocumentText />,
    description: 'we both get $5 usage credit on go',
  },
  {
    name: 'z.ai glm 10% off',
    url: 'https://z.ai/subscribe?ic=BLT9B4XI8A',
    type: 'page',
    color: 'var(--color-term-dir)',
    icon: <HiDocumentText />,
    description: '10% off first glm coding order',
  },
]

const pinned: TerminalItem[] = [
  {
    name: 'about',
    url: '/ston/about/',
    type: 'page',
    color: 'var(--color-term-purple)',
    icon: <HiUser />,
    description: 'now',
    isInternal: true,
  },
  {
    name: 'resume',
    url: '/ston/resume/',
    type: 'page',
    color: 'var(--color-term-dir)',
    icon: <HiDocumentText />,
    description: "what i've built",
    isInternal: true,
  },
  {
    name: 'work with me',
    url: '/ston/work-with-me/',
    type: 'page',
    color: 'var(--color-term-prompt)',
    icon: <HiBriefcase />,
    description: '4-call ai app sprint · $1,500',
    isInternal: true,
  },
  {
    name: 'loose rules (to live by)',
    url: '/ston/blog/2026-01-12/loose-rules/',
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
      { header: sectionHeaders[1], items: referrals },
      { header: sectionHeaders[2], items: blogItems },
      { header: sectionHeaders[3], items: socialLinks },
      { header: sectionHeaders[4], items: apps },
      { header: sectionHeaders[5], items: repos },
      { header: sectionHeaders[6], items: misc },
    ],
    [blogItems],
  )

  // Build allItems with headers interleaved: [pinnedHeader, ...pinned, blogHeader, ...blogItems, ...]
  const allItems = useMemo(
    () => sections.flatMap((section) => [section.header, ...section.items]),
    [sections],
  )

  // Derived per-section indices — single source of truth so adding a section never desyncs
  const sectionMeta = useMemo(() => {
    let cursor = 0
    return sections.map((section) => {
      const headerIndex = cursor
      const itemStartIndex = cursor + 1
      const itemEndIndex = itemStartIndex + section.items.length
      const meta = { section, headerIndex, itemStartIndex, itemEndIndex }
      cursor = itemEndIndex
      return meta
    })
  }, [sections])

  // Get the full path including section prefix for the selected item
  const getItemPath = useCallback(
    (index: number) => {
      const item = allItems[index]
      for (const { section, headerIndex, itemStartIndex, itemEndIndex } of sectionMeta) {
        if (index === headerIndex) return section.header.name
        if (index >= itemStartIndex && index < itemEndIndex) return section.header.name + item.name
      }
      return item.name
    },
    [allItems, sectionMeta],
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
    for (const { headerIndex, itemStartIndex, itemEndIndex } of sectionMeta) {
      const hasVisibleChild = filteredIndices.some(
        (index) => index >= itemStartIndex && index < itemEndIndex,
      )
      if (hasVisibleChild) visible.add(headerIndex)
    }
    return Array.from(visible).sort((a, b) => a - b)
  }, [filteredIndices, normalizedSearchQuery, sectionMeta])

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
    window.posthog?.capture('terminal_item_opened', {
      item_name: item.name,
      item_type: item.type,
      item_url: item.url,
      is_internal: item.isInternal ?? false,
    })
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
        if (searchQuery) {
          window.posthog?.capture('terminal_searched', {
            query: searchQuery,
            result_count: filteredIndices.length,
          })
        }
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
        if (searchQuery) {
          window.posthog?.capture('terminal_searched', {
            query: searchQuery,
            result_count: filteredIndices.length,
          })
        }
        navigateToItem(item)
      } else {
        // First click or different item: Just select
        setSelectedIndex(index)
      }
    } else {
      // Desktop: Navigate immediately
      if (searchQuery) {
        window.posthog?.capture('terminal_searched', {
          query: searchQuery,
          result_count: filteredIndices.length,
        })
      }
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
        <div className="md:inline">
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
        <br className="md:hidden" />
        <span className="md:ml-2">cd</span>
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
        {sectionMeta.map(({ section, headerIndex, itemStartIndex }, sectionIdx) => {
          const isLast = sectionIdx === sectionMeta.length - 1
          const isBlog = section.header.name === 'blog/'
          const isHeaderSelected = selectedIndex === headerIndex
          const sectionVisible = visibleIndexSet.has(headerIndex)
          return (
            <div
              key={section.header.name}
              className={sectionVisible ? (isLast ? 'mb-8' : 'mb-6') : 'hidden'}
            >
              {isBlog ? (
                <div className="flex items-start gap-x-2">
                  <button
                    type="button"
                    onClick={(e) => handleItemClick(e, section.header, headerIndex)}
                    onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                    onFocus={() => !isMobile && handleItemHover(headerIndex)}
                    className={`
                      transition-all duration-100 outline-none font-medium shrink-0
                      ${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
                      ${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
                    `}
                    tabIndex={-1}
                  >
                    {section.header.name}
                  </button>
                  <div className="flex flex-col gap-y-1">
                    {section.items.map((item, idx) => {
                      const globalIndex = itemStartIndex + idx
                      const isSelected = selectedIndex === globalIndex
                      return (
                        <button
                          type="button"
                          key={item.url}
                          onClick={(e) => handleItemClick(e, item, globalIndex)}
                          onMouseEnter={() => !isMobile && handleItemHover(globalIndex)}
                          onFocus={() => !isMobile && handleItemHover(globalIndex)}
                          className={`
                            text-left transition-all duration-100 outline-none flex items-center ${isSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded' : ''}
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
              ) : (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <button
                    type="button"
                    onClick={(e) => handleItemClick(e, section.header, headerIndex)}
                    onMouseEnter={() => !isMobile && handleItemHover(headerIndex)}
                    onFocus={() => !isMobile && handleItemHover(headerIndex)}
                    className={`
                      transition-all duration-100 outline-none font-medium
                      ${isHeaderSelected ? 'ring-2 ring-[var(--color-term-selection-border)] bg-[var(--color-term-selection)] px-2 -mx-2 rounded text-[var(--color-term-link)]' : 'text-[var(--color-term-link)] hover:text-[var(--color-term-purple)] hover:underline'}
                      ${visibleIndexSet.has(headerIndex) ? '' : 'hidden'}
                    `}
                    tabIndex={-1}
                  >
                    {section.header.name}
                  </button>
                  {section.items.map((item, idx) => {
                    const globalIndex = itemStartIndex + idx
                    const isSelected = selectedIndex === globalIndex
                    return (
                      <button
                        type="button"
                        key={item.url || item.name}
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
              )}
            </div>
          )
        })}
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
        <span className="md:hidden opacity-60">Tap to switch, tap again to open</span>
        <span className="hidden md:inline">
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
        </span>
      </div>
    </div>
  )
}
