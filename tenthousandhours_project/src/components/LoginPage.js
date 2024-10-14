import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  InputAddon,
} from "@chakra-ui/react";

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePwdClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://dsa-practice-site-server.onrender.com/login",
        {
          // const response = await fetch('https://dsa-practice-site.onrender/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log("user logged in");
        console.log("setting token in local storage: ", data.accessToken);
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        console.log("done setting token in local storage: ", data.accessToken);
        navigate("/roadmap", { state: { name: name } });
      } else if (response.status === 400) {
        console.log("invalid password");
      } else {
        console.log("unexpected error");
      }
    } catch (error) {
      console.log("network error");
    }
  };

  return (
    <div className="div-form">
      <form onSubmit={handleSubmit} className="form">
        <InputGroup size="md">
          <InputLeftAddon className="label-field">Name:</InputLeftAddon>
          <Input
            className="input-field"
            value={name}
            variant="flushed"
            pr="4.5rem"
            onChange={handleNameChange}
          />
        </InputGroup>
        <br />
        <InputGroup size="md">
          <InputLeftAddon className="label-field">E-mail:</InputLeftAddon>
          <Input
            className="input-field"
            value={email}
            variant="flushed"
            pr="4.5rem"
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePwdClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <br />
        <Button type="submit" id="button">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
