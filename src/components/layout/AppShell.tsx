import React, { useState } from 'react';
import { useNodesState, useEdgesState, Node, Edge } from '@xyflow/react';
import {
    MessageSquare,
    Layers,
    Wand2,
    Layout,
    ShieldCheck,
    User,
    Bell,
    Search
} from 'lucide-react';
import { WORKSPACES, INITIAL_NODES, INITIAL_EDGES } from '../../constants';
import YoloView from '../views/YoloView';
import ClassicView from '../views/ClassicView';
import LuckyView from '../views/LuckyView';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../logo.png';
import { Sun, Moon, Monitor } from 'lucide-react';

const SECTIONS = [
    { id: 'yolo', label: 'Agent', icon: MessageSquare },
    { id: 'classic', label: 'Editor', icon: Layers },
    { id: 'lucky', label: 'Insights', icon: Wand2 },
];

const AppShell = () => {
    const [activeTab, setActiveTab] = useState('yolo');
    const [currentWorkspace, setCurrentWorkspace] = useState(WORKSPACES[0]);
    const [isQaOpen, setIsQaOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Workflow State (Lifted up for Classic View)
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES as Node[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES as Edge[]);

    return (
        <div className="h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">

            {/* Apple-style Top Bar */}
            <header className="h-16 shrink-0 z-50 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 transition-all sticky top-0">

                {/* Left: Brand */}
                <div className="flex items-center gap-4 w-60">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                        <img src={logo} alt="Markaitek" className="w-10 h-10 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 relative z-10" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-none">Markaitek</span>
                        <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">Enterprise</span>
                    </div>
                </div>

                {/* Center: Tabs (Segmented Control) */}
                <nav className="hidden md:flex p-1 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-lg ring-1 ring-black/5 dark:ring-white/5 shadow-inner">
                    {SECTIONS.map(section => {
                        const Icon = section.icon;
                        const isActive = activeTab === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`
                            relative flex items-center gap-2 px-6 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ease-out
                            ${isActive
                                        ? 'bg-white dark:bg-slate-700/80 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/5'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                                    }
                        `}
                            >
                                <Icon size={16} strokeWidth={2.5} className={isActive ? 'scale-110 transition-transform' : ''} />
                                {section.label}
                            </button>
                        )
                    })}
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-5 w-60">
                    <div className="flex items-center gap-3 pr-5 border-r border-slate-200/60 dark:border-slate-700/60">
                        {/* Theme Switcher */}
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 ring-1 ring-black/5 dark:ring-white/5">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-600 shadow-sm text-amber-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                            >
                                <Sun size={14} />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                            >
                                <Moon size={14} />
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`p-1.5 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-600 dark:text-slate-200' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                            >
                                <Monitor size={14} />
                            </button>
                        </div>
                        <button
                            onClick={() => setIsQaOpen(true)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative group"
                            title="Governance Checks"
                        >
                            <ShieldCheck size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                            <Bell size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/50 p-1 rounded-full pr-3 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-white/10">
                            BR
                        </div>
                        <div className="hidden lg:block text-right">
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-200">Ben Raffour</div>
                            <div className="text-[10px] text-slate-400 font-medium">Admin</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden relative bg-slate-50/50 dark:bg-slate-950/50">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                {activeTab === 'yolo' && <YoloView />}

                {activeTab === 'classic' && (
                    <ClassicView
                        nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}
                        edges={edges} setEdges={setEdges} onEdgesChange={onEdgesChange}
                    />
                )}

                {activeTab === 'lucky' && <LuckyView />}
            </main>

            {/* Global Modals */}
            <Modal
                isOpen={isQaOpen}
                onClose={() => setIsQaOpen(false)}
                title="Governance & QA"
            >
                <div className="space-y-6">
                    {/* Reusing existing logic for QA modal */}
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-3">
                        <ShieldCheck className="text-indigo-600 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-indigo-900 text-sm">Policy Alignment Engine</h4>
                            <p className="text-indigo-700 text-xs mt-1">Your current configuration is being checked against <span className="font-mono font-bold">SOC2-Strict</span>.</p>
                        </div>
                    </div>
                    {/* ... existing checks ... */}
                </div>
            </Modal>

        </div>
    );
};

export default AppShell;
