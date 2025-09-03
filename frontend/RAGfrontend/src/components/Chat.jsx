import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import axiosInstance from "../config/axios";
export const Chat = ({ getAnswers }) => {
  const [answer, setanswer] = useState();
  const [messages, setMessages] = useState([
    { id: 1, text: answer, sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("summarize this book");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchInitialSummary = async () => {
      try {
        // Fetch the initial summary
        const answerRes = await axiosInstance.post("api/v1/chat", { question: "Summarize this document" });
        const initialAnswer = answerRes.data.data.answer;
        
        const aiMessage = { id: Date.now(), text: initialAnswer, sender: "ai" };
        setMessages([aiMessage]); // Set the first message

        // Fetch suggestions based on that summary
        const suggestionsRes = await axiosInstance.post("/api/v1/suggest_question", { lastAnswer: initialAnswer });
        getAnswers(suggestionsRes.data.suggestions); // Update parent
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    };
    
    fetchInitialSummary();
  }, []); 
  
  const handleSend = async() => {
    if (input.trim() === "") return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    try {
      // 2. Fetch AI response based on ACTUAL user input
      const answerRes = await axiosInstance.post("api/v1/chat", { question: input });
      const newAnswer = answerRes.data.data.answer;

      const aiResponse = { id: Date.now() + 1, text: newAnswer, sender: "ai" };
      setMessages((prev) => [...prev, aiResponse]); // Add REAL response

      // 3. Fetch new suggestions based on the NEW answer
      const suggestionsRes = await axiosInstance.post("/api/v1/suggest_question", { lastAnswer: newAnswer });
      getAnswers(suggestionsRes.data.suggestions);

    } catch (err) {
      console.error("Failed to get AI response:", err);
      // Optionally, add an error message to the chat
      const errorMessage = { id: Date.now() + 1, text: "Sorry, something went wrong.", sender: "ai" };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg flex flex-col h-full border border-gray-700 animate-fade-in"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100">AI Assistant</h2>
      </div>
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="bg-blue-500/20 rounded-full p-2">
                <Bot className="h-6 w-6 text-blue-400" />
              </div>
            )}
            <div
              className={`max-w-md lg:max-w-lg px-4 py-3 rounded-xl ${
                msg.sender === "user"
                  ? "bg-gray-700 text-gray-200 rounded-br-none"
                  : "bg-gray-900/60 text-gray-300 rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <div className="bg-gray-700/50 rounded-full p-2">
                <User className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center bg-gray-900/70 rounded-lg px-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Start typing..."
            className="w-full bg-transparent p-3 text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
            rows="1"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2 m-1 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
