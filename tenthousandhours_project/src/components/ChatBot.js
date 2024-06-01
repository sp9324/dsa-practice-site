import React, { useState } from 'react';
import { Button, Input, InputGroup, InputRightElement, InputLeftAddon } from "@chakra-ui/react";
function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      console.log(message)
      const storedToken = localStorage.getItem('token');
      console.log("storedToken:", storedToken);
      const accessToken = JSON.parse(storedToken);
      console.log("accessToken:", accessToken);
      const res = await fetch('http://localhost:3001/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      console.log(data.message);
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
    <InputGroup size='md'>
                    <InputLeftAddon mr="1" style={{color: 'orange'}}>ASK:</InputLeftAddon>
                    <Input className="input-field"
                        value={message}
                        variant='flushed'
                        mb='1rem'
                        pr='4.5rem'
                        placeholder='   Ask a doubt!'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button onClick={sendMessage} ml='1' style={{color: 'orange'}}>
                          Send
                        </Button>
                    </InputRightElement>
                    </InputGroup>
      {response.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

export default Chatbot;