import { createChatBotMessage } from "react-chatbot-kit";
import MarkdownMessage from "./MarkdownMessage";

const botName = "Natasha";
const config = {
  initialMessages: [
    createChatBotMessage(
      `Hii! I am ${botName}, your travel assistant. How can I help you today?`
    ),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#8729D6",
    },
    chatButton: {
      backgroundColor: "#DB2777",
    },
  },
  customComponents: {
    botChatMessage: (props) => <MarkdownMessage {...props} />,
  },
};

export default config;
