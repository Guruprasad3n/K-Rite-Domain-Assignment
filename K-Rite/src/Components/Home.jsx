import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p="2"
        bgColor="green"
      >
        <Box p="2">
          <Heading size="md">DNS App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="teal">
            <Link to={"/create-domain"}>Create</Link>
          </Button>
          <Button colorScheme="teal">
            {" "}
            <Link to={"/list-domain"}>List</Link>
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
}
export default Home;
