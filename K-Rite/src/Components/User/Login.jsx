import { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Heading,
  InputRightElement,
  InputGroup,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
      console.log("User logged in:", response.data);

      setFormData({
        email: "",
        password: "",
      });
      toast({
        title: "Login Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear any previous error messages
      navigate("/create-domain");
      setError(null);
    } catch (error) {
      console.error("Login failed:", error.response.data.message);

      // Display error toast
      toast({
        title: "Login Failed",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setError(error.response.data.message);
    }
  };

  return (
    <Container maxW="container.sm">
      <Heading textAlign={"center"} as="h1" mb={4}>
        Login
      </Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={4}>
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

      <Flex justify="center" mt={6}>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Login
        </Button>
      </Flex>

      {error && (
        <Flex justify="center" color="red" mt={4}>
          {error}
        </Flex>
      )}
      <Text>
        Don't you have an account Please{" "}
        <Link to={"/signup"} style={{ color: "red" }}>
          Signup
        </Link>
      </Text>
    </Container>
  );
}

export default Login;
