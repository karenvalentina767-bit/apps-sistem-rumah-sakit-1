import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot, AlertTriangle } from 'lucide-react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === Role.MODEL;
  const isError = message.isError;

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          isBot ? 'bg-medical-600' : 'bg-gray-700'
        }`}>
          {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isError 
              ? 'bg-red-50 border border-red-200 text-red-800'
              : isBot 
                ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' 
                : 'bg-medical-600 text-white rounded-tr-none'
          }`}>
             {isError && (
               <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
                 <AlertTriangle className="w-4 h-4" />
                 <span>System Alert</span>
               </div>
             )}
             <div className={`markdown-content ${isBot ? 'prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-strong:text-medical-800' : ''}`}>
               <ReactMarkdown>{message.text}</ReactMarkdown>
             </div>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};