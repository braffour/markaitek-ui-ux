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
    Search,
    Sun,
    Moon,
    BrainCircuit
} from 'lucide-react';
import { WORKSPACES, INITIAL_NODES, INITIAL_EDGES } from '../../constants';
import YoloView from '../views/YoloView';
import ClassicView from '../views/ClassicView';
import LuckyView from '../views/LuckyView';
import AdvisorView from '../views/AdvisorView';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { EditableBreadcrumbs } from '../ui/EditableBreadcrumbs';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../markaitek.svg';

const SECTIONS = [
    { id: 'advisor', label: 'Advisor', icon: BrainCircuit },
    { id: 'yolo', label: 'Agent', icon: MessageSquare },
    { id: 'classic', label: 'Editor', icon: Layers },
    { id: 'lucky', label: 'Insights', icon: Wand2 },
];

const AppShell = () => {
    const [activeTab, setActiveTab] = useState('advisor');
    const [currentWorkspace, setCurrentWorkspace] = useState(WORKSPACES[0]);
    const [isQaOpen, setIsQaOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Workflow State (Lifted up for Classic View)
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES as Node[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES as Edge[]);

    return (
        <div className="h-screen mobile-h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">

            {/* Apple-style Top Bar */}
            <header className="h-16 shrink-0 z-50 flex items-center justify-between px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 transition-all sticky top-0">

                {/* Left: Brand & Context */}
                <div className="flex items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                        <img src={logo} alt="Markaitek" className="w-16 h-16 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 relative z-10" />
                    </div>

                    <div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

                    {/* Editable Breadcrumbs (Workspace / Workflow) - Hidden on Mobile */}
                    <div className="hidden md:block">
                        <EditableBreadcrumbs
                            workspace={currentWorkspace}
                            workflow="Order Processing"
                            version="v4.2"
                            onWorkspaceChange={setCurrentWorkspace}
                            onWorkflowChange={(newVal) => console.log('Renamed workflow to:', newVal)}
                        />
                    </div>
                </div>

                {/* Center: Mode Toggles (Desktop Only) */}
                <div className="hidden md:flex items-center gap-2 p-1 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-lg ring-1 ring-black/5 dark:ring-white/5">
                    {SECTIONS.map(section => {
                        const Icon = section.icon;
                        const isActive = activeTab === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`
                                    relative flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all duration-300
                                    ${isActive
                                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                                    }
                                `}
                            >
                                <Icon size={14} className={isActive ? 'text-indigo-500' : 'text-slate-400'} />
                                {section.label}
                                {isActive && <div className="ml-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
                            </button>
                        )
                    })}
                </div>

                {/* Right: Search & Actions */}
                <div className="flex items-center justify-end gap-3">

                    {/* Search Bar - Hidden on small mobile */}
                    <div className="hidden lg:flex items-center relative w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Search workflows library..."
                            className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder-slate-400 text-slate-700 dark:text-slate-200"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                            <span className="text-[10px] text-slate-400 bg-white dark:bg-slate-700 px-1 rounded shadow-sm border border-slate-200 dark:border-slate-600">⌘K</span>
                        </div>
                    </div>

                    <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Switcher */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-full transition-all"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white dark:ring-white/10 cursor-pointer">
                            BR
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - Padded at bottom for mobile nav */}
            <main className="flex-1 overflow-hidden relative bg-slate-50/50 dark:bg-slate-950/50 flex flex-col pb-16 md:pb-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                {activeTab === 'advisor' && <AdvisorView />}
                {activeTab === 'yolo' && <YoloView />}

                {activeTab === 'classic' && (
                    <ClassicView
                        nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}
                        edges={edges} setEdges={setEdges} onEdgesChange={onEdgesChange}
                    />
                )}

                {activeTab === 'lucky' && <LuckyView />}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around z-50 pb-safe">
                {SECTIONS.map(section => {
                    const Icon = section.icon;
                    const isActive = activeTab === section.id;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`flex flex-col items-center justify-center p-2 w-full transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}
                        >
                            <Icon size={20} className={`mb-1 ${isActive ? 'fill-current opacity-20' : ''}`} />
                            <span className="text-[10px] font-bold uppercase tracking-wide">{section.label}</span>
                        </button>
                    )
                })}
            </div>

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
