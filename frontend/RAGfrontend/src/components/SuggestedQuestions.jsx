import React, { useState, useEffect, useRef } from 'react';
import { CornerUpLeft } from 'lucide-react';
export const SuggestedQuestions = ({ questions }) => {
    return (
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg flex-grow flex flex-col border border-gray-700 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Suggested Questions</h2>
        <div className="space-y-3 overflow-y-auto">
          {questions.map((q, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200 p-3 rounded-lg cursor-pointer"
            >
              <CornerUpLeft className="h-4 w-4 mt-1 text-gray-400 flex-shrink-0" />
              <p className="text-sm text-gray-300">{q}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };