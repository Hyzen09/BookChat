import React, { useState, useEffect, useRef } from 'react';
import { FileText,Bot, User, Home, Settings, HelpCircle } from 'lucide-react';

export const NavigationBar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'chat', icon: FileText, label: 'Documents' },
    // { id: 'settings', icon: Settings, label: 'Settings' },
    // { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <nav className="bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-700 flex flex-col items-center gap-4">
      <div className="p-2 mb-2">
        <Bot className="h-8 w-8 text-blue-400" />
      </div>
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`p-3 rounded-lg transition-colors duration-200 ${currentPage === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700'}`}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
          </button>
        ))}
      </div>
       <div className="mt-auto p-2">
         <a href="#" className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 block">
            <User className="h-7 w-7 text-gray-400"/>
         </a>
       </div>
    </nav>
  );
};
  