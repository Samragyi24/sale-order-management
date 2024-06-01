import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (username === "dummy" && password === "dummy") {
      setError("");
      navigate("/sale-orders"); // Redirect to main app on successful login
    } else {
      setError("Invalid username or password. Please try again.");
      setUserName("");
      setPassword("");
    }
  }

  return (
    <Box
      className="Login"
      p={4}
      maxWidth="400px"
      mx="auto"
      bg={bg}
      color={color}
    >
      <form onSubmit={handleSubmit}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {error && (
          <Text color="red.500" mt={2}>
            {error}
          </Text>
        )}

        <Button
          colorScheme="teal"
          size="md"
          mt={4}
          type="submit"
          isDisabled={!validateForm()}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
