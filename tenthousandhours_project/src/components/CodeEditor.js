import { useRef, useState, useEffect } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.js";
import { CODE_SNIPPETS } from "../constants.js";
import Output from "./Output.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Chatbot from './ChatBot.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import './CodeEditor.css';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [llpoints, setllpoints] = useState(null);
  const [stackpoints, setstackpoints] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();

  useEffect(() => {
    console.log("location:", location.state.name);
    const storedToken = localStorage.getItem('token');
    console.log("storedToken:", storedToken);
    const accessToken = JSON.parse(storedToken);
    console.log("accessToken:", accessToken);
    // fetch(`http://localhost:3001/api/retrievePoints`, {
    fetch('https://dsa-practice-site.vercel.app/api/retrievePoints', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name:location.state.name }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from API:', data);
        setllpoints(data[0]);
        setstackpoints(data[1]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleLLClick = () => {
    const url = window.location.protocol + '//' + window.location.host + '/question1';
  window.open(url, '_blank');
  };

  const handleSTACKClick = () => {
    const url = window.location.protocol + '//' + window.location.host + '/question2';
  window.open(url, '_blank');
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: '34px', right: '20px' }}> 
      <FontAwesomeIcon
        icon={faRobot}
        size="2xl"
        style={{ color: "orange" }}
        onClick={() => setShowChatbot(true)}
      />
      <div style={{ position: 'absolute', top: '8px', right: '46px', width: '240px', color: 'orange' }}>Hey, there! I'm Partner! Click me!</div>
</div>
      <Modal isOpen={showChatbot} onClose={() => setShowChatbot(false)} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader id='modal' style={{fontSize: '18px'}}>Hey, there! I'm Partner! Please be patient with me. I will take a while to prepare your reponse.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Chatbot />
          </ModalBody>
        </ModalContent>
      </Modal>
      {llpoints === 0 && stackpoints !== 0 && (
        <Button 
          variant="outline"
          colorScheme="blue"
          mb={4}
          onClick={handleLLClick}
        >
          Go to Linked List Visualization
        </Button>
      )}
      {stackpoints === 0 && llpoints !== 0 && (
        <Button id='stackvis'
          variant="outline"
          colorScheme="blue"
          mb={4}
          onClick={handleSTACKClick}
        >
          Go to Stack Visualization
        </Button>
      )}
      {llpoints === 0 && stackpoints === 0 && (
        <>
          <Button
            variant="outline"
            colorScheme="blue"
            mb={4}
            onClick={handleLLClick}
            mr={4}
            ml={52}
          >
            Go to Linked List Visualization
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            mb={4}
            onClick={handleSTACKClick}
          >
            Go to Stack Visualization
          </Button>
        </>
      )}
      <Box id='codeeditor'>
        <HStack spacing={4}>
          <Box w="50%">
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="75vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <Output editorRef={editorRef} language={language} />
        </HStack>
      </Box>
    </div>
  );
};
export default CodeEditor;