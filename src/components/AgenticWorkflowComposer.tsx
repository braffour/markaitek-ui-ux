import React, { useState } from 'react';
import AppShell from './layout/AppShell';
import AgentView from './views/AgentView';
import WorkflowEditor from './views/WorkflowEditor';
import InsightsView from './views/InsightsView';

const AgenticWorkflowComposer = () => {
  const [currentView, setCurrentView] = useState<'agent' | 'workflow' | 'insights'>('agent');

  return (
    <AppShell currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'agent' && <AgentView />}
      {currentView === 'workflow' && <WorkflowEditor />}
      {currentView === 'insights' && <InsightsView />}
    </AppShell>
  );
};

export default AgenticWorkflowComposer;
