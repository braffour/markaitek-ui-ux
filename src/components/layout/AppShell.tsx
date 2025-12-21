import React, { useState } from 'react';
import { useNodesState, useEdgesState, Node, Edge } from '@xyflow/react';
import { useTranslation } from 'react-i18next';
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
import { ExecutionPanel } from '../execution/ExecutionPanel';
import { LanguageSelector } from '../ui/LanguageSelector';
import bgImage from '../../assets/auth-bg.png';

const SECTIONS = [
    { id: 'advisor', label: 'nav.advisor', icon: BrainCircuit },
    { id: 'yolo', label: 'nav.agent', icon: MessageSquare },
    { id: 'classic', label: 'nav.editor', icon: Layers },
    { id: 'lucky', label: 'nav.insights', icon: Wand2 },
];

const AppShell = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('advisor');
    const [currentWorkspace, setCurrentWorkspace] = useState(WORKSPACES[0]);
    const [isQaOpen, setIsQaOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Workflow State (Lifted up for Classic View)
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES as Node[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES as Edge[]);

    return (
        <div className="h-screen mobile-h-screen w-full flex flex-col bg-brand-bg text-brand-text-primary font-sans selection:bg-brand-accent/30 transition-colors duration-300">

            {/* Premium Header with Blurred Background */}
            <header className="h-16 shrink-0 z-50 flex items-center justify-between px-6 bg-brand-surface-1/40 backdrop-blur-xl border-b border-brand-border-low transition-all sticky top-0 overflow-hidden">
                {/* Header Background Image with Gradient */}
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale scale-110 blur-xl opacity-20 -z-10 after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#0F1519]/80 after:to-transparent"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>

                {/* Left: Brand & Context */}
                <div className="flex items-center gap-6">
                    <div className="relative group cursor-pointer">
                        {/* Enhanced Ambient Glow behind the badge */}
                        <div className="absolute inset-0 bg-brand-accent/20 blur-2xl -z-10 rounded-full scale-150 group-hover:opacity-100 opacity-70 transition-opacity animate-pulse-soft"></div>
                        {/* Outer Ring Glow */}
                        <div className="absolute inset-0 border-2 border-brand-accent/30 rounded-2xl -z-10 scale-110 group-hover:border-brand-accent/50 group-hover:scale-115 transition-all duration-300"></div>
                        {/* Elevated Logo Badge with Gradient Background */}
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_32px_-8px_rgba(13,148,136,0.4)]">
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-brand-accent/90 to-brand-accent/80"></div>
                            {/* Subtle Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '16px 16px'
                            }}></div>
                            {/* Logo Container with Inverted/White Filter */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img 
                                    src={logo} 
                                    alt="Markaitek" 
                                    className="w-10 h-10 object-contain brightness-0 invert opacity-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" 
                                />
                            </div>
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="hidden md:block h-6 w-px bg-brand-border-base mx-1"></div>

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
                <div className="hidden md:flex items-center gap-1.5 p-1 bg-brand-surface-2/40 backdrop-blur-md rounded-2xl border border-brand-border-low">
                    {SECTIONS.map(section => {
                        const Icon = section.icon;
                        const isActive = activeTab === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`
                                    relative flex items-center gap-2.5 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-500
                                    ${isActive
                                        ? 'bg-brand-surface-1 text-brand-accent shadow-lg shadow-black/20 ring-1 ring-brand-border-high'
                                        : 'text-brand-text-muted hover:text-brand-text-secondary hover:bg-white/5'
                                    }
                                `}
                            >
                                <Icon size={15} className={isActive ? 'text-brand-accent' : 'text-brand-text-muted'} />
                                {t(section.label)}
                                {isActive && <div className="ml-1 w-1 h-1 rounded-full bg-brand-accent animate-pulse-soft"></div>}
                            </button>
                        )
                    })}
                </div>

                {/* Right: Search & Actions */}
                <div className="flex items-center justify-end gap-3">

                    {/* Search Bar - Hidden on small mobile */}
                    <div className="hidden lg:flex items-center relative w-72 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted group-focus-within:text-brand-accent transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder={t('shell.searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-2 bg-brand-surface-2/50 border border-brand-border-low rounded-xl text-xs font-medium focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/30 focus:bg-brand-surface-2 outline-none transition-all placeholder-brand-text-muted/50 text-brand-text-primary"
                        />
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                            <span className="text-[10px] text-brand-text-muted/60 bg-brand-surface-3 px-1.5 py-0.5 rounded-md border border-brand-border-low">⌘K</span>
                        </div>
                    </div>

                    <div className="hidden lg:block h-6 w-px bg-brand-border-base mx-1"></div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Switcher */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 text-brand-text-muted hover:text-brand-accent hover:bg-brand-accent/5 rounded-xl transition-all"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="hidden md:block h-6 w-px bg-brand-border-base mx-1"></div>

                        <LanguageSelector />

                        <div className="w-9 h-9 rounded-2xl bg-brand-accent flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-brand-accent/20 cursor-pointer hover:scale-105 transition-transform">
                            BR
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area + Persistent Execution Panel */}
            <div className="flex-1 flex overflow-hidden relative">
                <main className="flex-1 overflow-hidden relative bg-brand-bg flex flex-col pb-16 md:pb-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

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

                <ExecutionPanel />
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-6 inset-x-6 h-16 bg-brand-surface-1/40 backdrop-blur-2xl border border-brand-border-low flex items-center justify-around z-50 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] px-4">
                {SECTIONS.map(section => {
                    const Icon = section.icon;
                    const isActive = activeTab === section.id;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`flex flex-col items-center justify-center p-2 w-full transition-all duration-300 ${isActive ? 'text-brand-accent transform -translate-y-1' : 'text-brand-text-muted hover:text-brand-text-secondary'}`}
                        >
                            <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-brand-accent/10 shadow-lg shadow-brand-accent/5' : ''}`}>
                                <Icon size={20} className={isActive ? 'animate-pulse-soft' : ''} />
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)]"></div>
                                )}
                            </div>
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
