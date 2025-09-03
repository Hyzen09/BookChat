import React, { useState, useEffect, useRef } from 'react';
import {UploadCloud } from 'lucide-react';
import axiosInstance from '../config/axios';
export const HomePage = ({ onFileSelect }) => {
    const fileInputRef = useRef(null);
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
            
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onFileSelect(file);
            const formData = new FormData()
            formData.append('file', file)            
            try {
                const res = await axiosInstance.post("api/v1/ingest_book", formData);
                console.log("responce is ",res);
            } catch (err) {
                console.log(err);
                if (err.response && err.response.status === 413) {
                    alert('File is too large! Please upload a smaller file.');
                }
            }

        }
    }

    const onButtonClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div 
            className="flex flex-col items-center justify-center h-full w-full bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 transition-all duration-300 hover:border-blue-500 hover:bg-gray-800/50 animate-fade-in"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="text-center p-8">
                <div className="mb-6">
                    <UploadCloud className="mx-auto h-16 w-16 text-gray-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-100 mb-2">Upload Your Document</h1>
                <p className="text-gray-400 mb-8">Drag & drop a PDF file here, or click to select a file.</p>
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf"
                />
                <button 
                    onClick={onButtonClick}
                    className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 animate-pulse-glow"
                >
                    Select File
                </button>
            </div>
        </div>
    );
};
