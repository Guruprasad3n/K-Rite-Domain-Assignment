import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Container,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateDomain() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/domains",
        formData
      );
      console.log("Domain created:", response.data);
      toast({
        title: "Domain created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset form fields
      setFormData({ name: "", type: "", description: "" });
    } catch (error) {
      console.error("Error creating domain:", error.response.data.message);
      toast({
        title: "Error",
        description: "Failed to create domain",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Heading mb={10}>Create Domain</Heading>
      <form onSubmit={handleSubmit}>
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
          <FormLabel>Type</FormLabel>
          <Input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Domain
        </Button>
        <Container textAlign={"center"}>
          <Link
            to={"/list-domain"}
            style={{ textDecoration: "underline", color: "red" }}
          >
            View Domines
          </Link>
        </Container>
      </form>
    </Container>
  );
}

export default CreateDomain;
