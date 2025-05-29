// in ActionProvider.jsx
import React from "react";
import { getGeiminiResponse } from "../services/middle-ware";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handlePrompt = async (message) => {
    const loadingMessage = createChatBotMessage("Thinking...");
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, loadingMessage],
    }));
    try {
      const prompt = `You are a travel assistant but no need of any greeting while responsing.
      If it is related to travel or something close, give answer like you do. Be specific and respond within 100 words.
      Use ** bullet points if answer is in form of list. Question: ${message}`;
      const updatedHistory = [
        ...history,
        { message: prompt, type: "user", id: Date.now() },
      ];
      const response = await getGeiminiResponse({ history: updatedHistory });
      const botResponse = createChatBotMessage(response.data);
      setState((prev) => {
        const messages = [...prev.messages];
        messages.pop(); // remove "Thinking..." message
        const updatedMessages = [...messages, botResponse];
        localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
        return {
          ...prev,
          messages: [...messages, botResponse],
        };
      });
    } catch (error) {
      console.error("Failed to get response from Gemini:", error);
      const errorMessage = createChatBotMessage("Oops! Something went wrong.");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handlePrompt,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

//      If the following question is not about adventure, tours, or travel guides, respond with: 'I am out!! Meri is me expertise nahi hai :)'.
//But if it is a sequal question, give your response like you do.
