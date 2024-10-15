import { createContext, useContext, useState } from "react";
const ChatContext = createContext([]);

const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessages = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatContextProvider, useChatContext };
