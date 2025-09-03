import { Chat } from "../components/Chat";
import { FileDisplay } from "../components/FileDisplay";
import { SuggestedQuestions } from "../components/SuggestedQuestions";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";

const suggestedQuestions = [
  "What are the key highlights of this report?",
  "Summarize the main findings in three bullet points.",
  "What is the projected revenue for the next quarter?",
  "Are there any potential risks mentioned?",
];

export const ChatInterface = ({ file, fileName }) => {
  const [questions, setQuestions] = useState([]);
  
  const onMessageChange = (newQuestions)=>{
    setQuestions(newQuestions)
  }

  return (
    <div className="flex flex-row h-full gap-4">
      {/* Left Sidebar */}
      <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 gap-4">
        <FileDisplay fileName={fileName || "No file selected"} />
        <SuggestedQuestions questions={questions} />
      </div>

      {/* Main Chat Component */}
      <div className="flex-grow flex flex-col h-full">
        <Chat 
        getAnswers = {onMessageChange} />
      </div>
    </div>
  );
};