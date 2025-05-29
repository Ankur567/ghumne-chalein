import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownMessage = ({ message }) => {
  return (
    <div className="bg-pink-800 text-white p-3 rounded-lg max-w-[90%] whitespace-pre-wrap text-sm">
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
