import React, { useState } from 'react';
import { ExecutionPanelShell } from './ExecutionPanelShell';
import { ExecutionTabs, ExecutionTabId } from './ExecutionTabs';
import { RunTab } from './RunTab';
import { DebugTab } from './DebugTab';
import { HistoryTab } from './HistoryTab';
import { StepData } from './StepTimelineItem';
import { ExecutionStatus } from './StatusPill';

export const ExecutionPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ExecutionTabId>('run');
    const [status, setStatus] = useState<ExecutionStatus>('idle');
    const [steps, setSteps] = useState<StepData[]>([]);

    const mockSteps: StepData[] = [
        {
            id: '1',
            name: 'API Trigger',
            description: 'Webhook received from Shopify',
            status: 'success',
            startTime: '14:30:01',
            duration: '0.1s',
            input: { event: 'order.created', id: 'order_9982' },
            output: { order_id: '9982', total: 124.50 }
        },
        {
            id: '2',
            name: 'Validate Logic',
            description: 'Checking order against compliance rules',
            status: 'success',
            startTime: '14:30:02',
            duration: '0.3s',
            input: { order_id: '9982' },
            output: { valid: true, risk: 'low' }
        },
        {
            id: '3',
            name: 'Data Enrichment',
            description: 'Fetching additional customer data',
            status: 'failed',
            startTime: '14:30:03',
            duration: '5.0s',
            input: { customer_id: 'cust_772' },
            logs: [
                '[INFO] Requesting data from enrichment.io...',
                '[ERROR] Connection timeout after 5000ms',
                '[DEBUG] Retrying attempt 1...'
            ]
        },
        {
            id: '4',
            name: 'Format Output',
            description: 'Preparing final payload for ERP',
            status: 'pending'
        }
    ];

    const handleRun = () => {
        setStatus('running');
        setSteps(mockSteps.map(s => s.id === '3' ? { ...s, status: 'running' } : (parseInt(s.id) < 3 ? s : { ...s, status: 'pending' })));

        // Simulate failure after a delay
        setTimeout(() => {
            setStatus('failed');
            setSteps(mockSteps);
        }, 2000);
    };

    const handleReset = () => {
        setStatus('idle');
        setSteps([]);
        setActiveTab('run');
    };

    const handleDebug = () => {
        setActiveTab('debug');
    };

    const handleStopDebug = () => {
        setActiveTab('run');
    };

    return (
        <ExecutionPanelShell
            status={status}
            onClear={handleReset}
        >
            <ExecutionTabs activeTab={activeTab} onChange={setActiveTab} />

            <div className="flex-1">
                {activeTab === 'run' && (
                    <RunTab
                        status={status}
                        steps={steps}
                        onRun={handleRun}
                        onReset={handleReset}
                        onDebug={handleDebug}
                    />
                )}

                {activeTab === 'debug' && (
                    <DebugTab onStop={handleStopDebug} />
                )}

                {activeTab === 'history' && (
                    <HistoryTab />
                )}
            </div>
        </ExecutionPanelShell>
    );
};
