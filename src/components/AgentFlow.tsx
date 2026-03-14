import React, { useState, useEffect } from 'react';

type Agent = {
  id: string;
  name: string;
  status: 'working' | 'done' | 'needs-input';
  color: string;
  content: string[];
};

const AGENTS: Agent[] = [
  { 
    id: 'claude', 
    name: '1:claude', 
    status: 'working', 
    color: '#f778ba',
    content: ['Plan mode active', 'Generating components...', '✓ Layout complete', 'Testing...']
  },
  { 
    id: 'gemini', 
    name: '2:gemini', 
    status: 'working', 
    color: '#58a6ff',
    content: ['Analyzing codebase', 'Refactoring hooks...', '✓ Types updated', 'Linting...']
  },
  { 
    id: 'codex', 
    name: '3:codex', 
    status: 'working', 
    color: '#7ee787',
    content: ['Scanning schemas', 'Seeding database...', '✓ Migrations done', 'Ready.']
  },
  { 
    id: 'opencode', 
    name: '4:opencode', 
    status: 'working', 
    color: '#ffa657',
    content: ['Indexing files', 'Fixing imports...', '✓ Exports clean', 'Waiting_']
  },
];

export const AgentFlow = () => {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [focusIdx, setFocusIdx] = useState<number | null>(null);
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks(t => t + 1);
      
      // Simulate random agent completion
      if (Math.random() > 0.7) {
        const idx = Math.floor(Math.random() * agents.length);
        setAgents(prev => prev.map((a, i) => 
          i === idx ? { ...a, status: Math.random() > 0.5 ? 'done' : 'needs-input' } : a
        ));
        
        // Focus on the one that just "finished"
        setFocusIdx(idx);
        
        // Reset after a bit
        setTimeout(() => {
          setFocusIdx(null);
          setAgents(prev => prev.map((a, i) => 
            i === idx ? { ...a, status: 'working' } : a
          ));
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [agents.length]);

  return (
    <div className="not-prose my-8 w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg bg-[#0d1117] border border-[#30363d] shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            back2vibing: 4 sessions active
          </div>
          <div className="w-12"></div>
        </div>

        {/* Tmux Grid */}
        <div className="grid grid-cols-2 grid-rows-2 h-64 border-b border-[#30363d]">
          {agents.map((agent, i) => (
            <div 
              key={agent.id}
              className={`relative p-3 border-[#30363d] overflow-hidden transition-all duration-500 ${
                i % 2 === 0 ? 'border-r' : ''
              } ${
                i < 2 ? 'border-b' : ''
              } ${
                focusIdx === i ? 'bg-white/[0.03]' : 'bg-transparent'
              }`}
            >
              {/* Focus Ring */}
              {focusIdx === i && (
                <div 
                  className="absolute inset-0 border-2 pointer-events-none transition-all duration-300 z-20"
                  style={{ borderColor: agent.color, opacity: 0.4 }}
                ></div>
              )}

              {/* Pane Label */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-gray-500 uppercase">{agent.name}</span>
                {agent.status !== 'working' && (
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: agent.color }}></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: agent.color }}></span>
                  </span>
                )}
              </div>

              {/* Console Output */}
              <div className="text-[10px] space-y-1">
                <div className="flex gap-2">
                  <span className="text-gray-600">➜</span>
                  <span className="text-gray-300">worktree: feature-{agent.id}</span>
                </div>
                {agent.content.slice(0, (ticks + i) % 4 + 1).map((line, li) => (
                  <div key={li} className="text-gray-500 opacity-80 pl-4 truncate">
                    {line}
                  </div>
                ))}
                {agent.status === 'working' ? (
                  <div className="flex gap-2 pl-4">
                    <span className="text-blue-400 animate-pulse">...</span>
                  </div>
                ) : (
                  <div className="flex gap-2 pl-4 font-bold" style={{ color: agent.color }}>
                    {agent.status === 'done' ? '✓ TASK COMPLETE' : '! NEEDS INPUT'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tmux Status Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#238636] text-black text-[10px] font-bold">
          <div className="flex gap-3">
            <span>[b2v-orchestrator]</span>
            <span className="opacity-80">0:nvim* 1:claude- 2:gemini 3:codex 4:opencode</span>
          </div>
          <div className="flex items-center gap-4">
            {focusIdx !== null && (
              <span className="animate-pulse">SWITCHING TO {agents[focusIdx].id.toUpperCase()}...</span>
            )}
            <span>20:26</span>
          </div>
        </div>
      </div>
      
      {/* Legend / Info */}
      <div className="mt-4 flex justify-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full border border-gray-700"></div>
          Background Execution
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          Context Steering
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Auto-Focus
        </div>
      </div>
    </div>
  );
};
