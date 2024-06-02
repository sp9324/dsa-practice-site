import { useState, useEffect } from "react";
import { Box, Button, Text, useToast, Select } from "@chakra-ui/react";
import { executeCode } from "../api.js";
import { useLocation, useNavigate } from "react-router-dom";
import './Output.css';
// import { set } from "mongoose";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [room, setRoom] = useState('room1');
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // New state variable
  const [isSTACKClicked, setSTACKClicked] = useState(false);
  const [isLLClicked, setLLClicked] = useState(false);
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(() => {
    console.log("location:", location.state.name);
  });

  const handleLLQClick = () => {
    setSelectedQuestion('LL');
    setLLClicked(true);
    setSTACKClicked(false);
    setRoom('room1');
  };

  const handleSTACKQClick = () => {
    setSelectedQuestion('STACK');
    setSTACKClicked(true);
    setLLClicked(false);
    setRoom('room2');
  };

  const handleChatClick = () => {
    navigate('/discussionforum', { state: { name: location.state.name, room } });
  };

  const handleRoom1Click = () => {
    setRoom('room1');
    console.log("room1 clicked");
    navigate('/discussionforum', { state: { name: location.state.name, room } });
  };

  const handleRoom2Click = () => {
    setRoom('room2');
    console.log("room2 clicked");
    navigate('/discussionforum', { state: { name: location.state.name, room } });
  };


  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const outputResult = result.output.split("\n");
      setOutput(outputResult);
      result.stderr ? setIsError(true) : setIsError(false);
      if (outputResult.join(' ').trim() === "5 4 3 2 1") {
        setIsCorrect(true);
        console.log(selectedQuestion);
        // Parse the access token from local storage
        const storedToken = localStorage.getItem('token');
        console.log("storedToken:", storedToken);
        const accessToken = JSON.parse(storedToken);
        console.log("accessToken:", accessToken);
        // fetch(`http://localhost:3001/api/update${selectedQuestion}Points`, { 
        fetch(`https://dsa-practice-site.onrender.com/api/update${selectedQuestion}Points`, { 
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ name:location.state.name }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
      } else {
        setIsCorrect(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
    <div id='selected-ques-div'>
      <Text mb={2} mt={6} textAlign='left' color= 'lightblue'>
        Make sure to select the question you are solving before solving it.
      </Text>
      
      
      <Button 
        variant="outline"
        colorScheme={isLLClicked ? "orange" : "blue"}
        mr={4}
        mb={2}
        onClick={handleLLQClick}
      >
        Linked List
      </Button>
      <Button
  variant="outline"
  colorScheme={isSTACKClicked ? "orange" : "blue"}
  mb={2}
  onClick={handleSTACKQClick}
>
  Stack
</Button>
</div>
<div id="discussion">
<Select id='drop-down' value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="room1">Linked List discussion</option>
          <option value="room2">Stack discussion</option>
        </Select>
<Button
        variant="outline"
        colorScheme="blue"
        mr={4}
        mb={2}
        onClick={handleChatClick}
> 
Real-Time Discussion Forum
</Button>
</div>
      
      {isCorrect && <Text color="green.500" fontSize="xl">CORRECT (You get +5 points!)</Text>}
      {!isCorrect && output && <Text color="red.500" fontSize="xl">Oh, no! Wrong answer... try again!</Text>}
      <Text mb={2} fontSize="md" color= 'orange'>
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
        mr={4}
      >
        Run Code
      </Button>
      <Button
      variant="outline"
      colorScheme="blue"
      mb={4}
      onClick={() => navigate('/roadmap', { state: { name: location.state.name } })}
    >
      Roadmap
    </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;