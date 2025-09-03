
import { NavigationBar } from "../components/NavigationBar";
import { HomePage } from "./HomePage";
import { ChatInterface } from "../components/ChatInterface";
import React, { useState, useEffect, useRef } from 'react';
// import { FileText, Send, CornerUpLeft, Bot, User, Home, Settings, HelpCircle, UploadCloud } from 'lucide-react';
export default function Main() {
  const [currentPage, setCurrentPage] = useState("home");
  const [File,setFile] = useState()
  const [fileName,setFileName] = useState()

  // This function is called by the HomePage when a file is uploaded
  const handleFileSelect = (file) => {
    if (file) {
      setFileName(file.name);
      setCurrentPage("chat"); // Switch to the chat view
      setFile(file)
    }
  };

  return (
    <>
      {/* Adding keyframe animations for the home page */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 35px rgba(59, 130, 246, 0.7); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s infinite ease-in-out;
        }
      `}</style>
      <div className="bg-gray-900 text-gray-200 font-sans flex flex-row h-screen p-4 gap-4">
        <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Conditionally render Home page or Chat interface */}
        <div className="flex-grow h-full">
          {currentPage === "home" ? (
            <HomePage onFileSelect={handleFileSelect} />
          ) : (
            <ChatInterface
              file ={File}
              fileName={fileName}
            />
          )}
        </div>
      </div>
    </>
  );
}
