import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Text,
  Box,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListDomains() {
  const [domains, setDomains] = useState([]);
  const [editedDomain, setEditedDomain] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/domains");
      setDomains(response.data);
    } catch (error) {
      console.error("Error fetching domains:", error.message);
      toast({
        title: "Error",
        description: "Failed to fetch domains",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/domains/${id}`);
      // Update the state after successful deletion
      setDomains(domains.filter((domain) => domain._id !== id));
      toast({
        title: "Domain deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting domain:", error.message);
      toast({
        title: "Error",
        description: "Failed to delete domain",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleEdit = (domain) => {
    setEditedDomain(domain);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDomain((prevDomain) => ({
      ...prevDomain,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/domains/${editedDomain._id}`,
        editedDomain
      );
      // Update the domain in the list
      setDomains((prevDomains) =>
        prevDomains.map((domain) =>
          domain._id === editedDomain._id ? response.data : domain
        )
      );
      toast({
        title: "Domain updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating domain:", error.message);
      toast({
        title: "Error",
        description: "Failed to update domain",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedDomain(null);
    setIsEditing(false);
  };

  return (
    <Container>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading>List Domains</Heading>
        <Link
          to={"/create-domain"}
          style={{ textDecoration: "underline", color: "red" }}
        >
          Create Domain
        </Link>
      </Flex>
      <List spacing={3}>
        {domains.map((domain) => (
          <ListItem key={domain._id}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="4"
              boxShadow="md"
            >
              <Text fontSize="xl" fontWeight="semibold" mb="2">
                {domain.name}
              </Text>
              <Text>{domain.type}</Text>
              <Text>{domain.description}</Text>
              <Button
                colorScheme="blue"
                onClick={() => handleEdit(domain)}
                mt="2"
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(domain._id)}
                mt="2"
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isEditing ? "Edit Domain" : "Create Domain"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={editedDomain?.name || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Input
                  type="text"
                  name="type"
                  value={editedDomain?.type || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={editedDomain?.description || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </List>
    </Container>
  );
}

export default ListDomains;
