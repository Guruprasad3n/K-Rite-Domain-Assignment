import {
  Container,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  Flex,
  useToast,
  Heading,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const toast = useToast();
  const [error, setError] = useState(null);

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        formData
      );
      console.log("User registered:", response.data);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      toast({
        title: "Registration Success",
        description: response.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");

      setError(null);
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      setError(error.response.data.message);
      toast({
        title: "Registration Failed",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Heading textAlign={"center"} as="h1" mb={4}>
        Register
      </Heading>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            pr="4.5rem"
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Flex justify="center">
        <Button mt={4} colorScheme="telegram" onClick={handleSubmit}>
          Signup
        </Button>
      </Flex>

      {error && (
        <Flex justify="center" color="red" mt={4}>
          {error}
        </Flex>
      )}
      <Text>
        Already Have an account Please{" "}
        <Link to={"/login"} style={{ color: "red" }}>Login</Link>
      </Text>
    </Container>
  );
}

export default Signup;

