import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { SystemStatusPanel } from './components/SystemStatusPanel';
import { SystemStatus } from './types';

const App: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    registrationAgent: 'idle',
    infoAgent: 'idle',
    securityProtocol: 'secure'
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto flex">
        {/* Main Chat Area */}
        <div className="flex-1 w-full">
          <ChatInterface updateSystemStatus={setSystemStatus} />
        </div>

        {/* Sidebar Status (Visible on Large Screens) */}
        <SystemStatusPanel status={systemStatus} />
      </main>
    </div>
  );
};

export default App;