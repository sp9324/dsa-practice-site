import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from "@chakra-ui/react";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const handlePwdClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("in handle submit");
      const response = await fetch(
        "https://dsa-practice-site-server.onrender.com/register",
        {
          // const response = await fetch('http://localhost:3001/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      console.log("response:", response);
      const data = await response.json();
      if (response.ok) {
        console.log("user logged in");
        console.log("setting token in local storage: ", data.accessToken);
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        console.log("done setting token in local storage: ", data.accessToken);
        console.log("user data sent to backend url");
        navigate("/roadmap", { state: { name: name } });
      } else {
        console.log("couldn't send user data to backend url");
      }
    } catch (error) {
      console.log("network error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <InputGroup size="md">
          <InputLeftAddon className="label-field">Name:</InputLeftAddon>
          <Input
            className="input-field"
            value={name}
            variant="flushed"
            pr="4.5rem"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <br />
        <InputGroup size="md">
          <InputLeftAddon className="label-field">Email:</InputLeftAddon>
          <Input
            className="input-field"
            value={email}
            variant="flushed"
            pr="4.5rem"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <br />
        <InputGroup size="md">
          <InputLeftAddon className="label-field">Password:</InputLeftAddon>
          <Input
            className="input-field"
            value={password}
            variant="flushed"
            pr="4.5rem"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePwdClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <br />
        <Button type="submit" id="button">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegistrationPage;
