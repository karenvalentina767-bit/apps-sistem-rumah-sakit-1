import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { Message, Role, SystemStatus } from '../types';
import { sendMessageStream, initializeChat } from '../services/geminiService';

interface ChatInterfaceProps {
  updateSystemStatus: (status: SystemStatus) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ updateSystemStatus }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: "Halo! Saya adalah **Koordinator Sistem Rumah Sakit**. \n\nAda yang bisa saya bantu hari ini? Anda bisa melakukan **Pendaftaran Pasien Baru** atau menanyakan **Informasi Umum** rumah sakit.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat on mount
  useEffect(() => {
    initializeChat();
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Very simple keyword detection to simulate "Sub-agent" activation visual
  const detectIntentAndUpdateStatus = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('daftar') || lower.includes('registrasi') || lower.includes('pasien baru')) {
      updateSystemStatus({
        registrationAgent: 'active',
        infoAgent: 'idle',
        securityProtocol: 'secure'
      });
    } else {
       updateSystemStatus({
        registrationAgent: 'idle',
        infoAgent: 'active',
        securityProtocol: 'secure'
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    detectIntentAndUpdateStatus(userText);

    // Add User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Add Placeholder for Bot Message
      const botMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMessageId,
        role: Role.MODEL,
        text: '',
        timestamp: new Date()
      }]);

      let fullResponse = '';
      
      const stream = sendMessageStream(userText);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
        ));
      }

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: "Maaf, terjadi kesalahan pada koneksi sistem. Silakan coba lagi.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
      // Reset status visual after a delay
      setTimeout(() => {
        updateSystemStatus({
            registrationAgent: 'idle',
            infoAgent: 'idle',
            securityProtocol: 'secure'
        });
      }, 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1].text === '' && (
           <div className="flex items-center gap-2 text-gray-400 text-sm ml-12 animate-pulse">
             <Loader2 className="w-4 h-4 animate-spin" />
             <span>Koordinator sedang mengetik...</span>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-gray-50 border border-gray-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-medical-500 focus-within:border-transparent transition-all shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan... (Contoh: Saya ingin daftar pasien baru)"
            className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 resize-none max-h-32 py-3 px-2"
            rows={1}
            disabled={isLoading}
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              input.trim() && !isLoading
                ? 'bg-medical-600 text-white hover:bg-medical-700 shadow-md' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          AI dapat melakukan kesalahan. Jangan masukkan data rekam medis sensitif.
        </p>
      </div>
    </div>
  );
};