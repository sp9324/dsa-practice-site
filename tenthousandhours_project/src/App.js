import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor.js";
import Question1 from "./components/Question1.js"; // Import the Question1 component
import Question2 from "./components/Question2.js"; // Import the Question2 component
import RegisterLogin from "./components/RegisterLogin.js"; // Import the Register_Login component
import RegistrationPage from "./components/RegistrationPage.js"; // Import the Register component
import LoginPage from "./components/LoginPage.js"; // Import the Login component
import Roadmap from "./components/Roadmap.js"; // Import the Roadmap component
import ProfilePage from "./components/ProfilePage.js"; // Import the Profile component
import LiveChat from "./components/LiveChat.js"; // Import the LiveChat component
import { ChatContextProvider } from "./context/ChatContext.js";

function App() {
  return (
    <BrowserRouter>
      <ChatContextProvider>
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
          <Routes>
            <Route path="/" element={<RegisterLogin />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/question1" element={<Question1 />} />
            <Route path="/question2" element={<Question2 />} />
            <Route path="/codeeditor" element={<CodeEditor />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/discussionforum" element={<LiveChat />} />
          </Routes>
        </Box>
      </ChatContextProvider>
    </BrowserRouter>
  );
}

export default App;
