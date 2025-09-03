import React, { useState, useEffect, useRef } from 'react';
import { FileText} from 'lucide-react';
export const FileDisplay = ({ fileName }) => {
    return (
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-100 mb-3">Active Document</h2>
        <div className="flex items-center bg-gray-700/50 p-3 rounded-lg">
          <FileText className="text-blue-400 h-6 w-6 mr-3 flex-shrink-0" />
          <span className="text-gray-300 truncate font-medium" title={fileName}>
            {fileName}
          </span>
        </div>
      </div>
    );
  };
  