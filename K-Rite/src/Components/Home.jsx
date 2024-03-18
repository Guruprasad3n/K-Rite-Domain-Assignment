import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially, user is not logged in
  const [userName, setUserName] = useState(""); // State to hold the user's name
  const navigate = useNavigate();
  // console.log(userName);

  // const [userName, setUserName] = useState("");
  const getUserName = async () => {
    let userId = localStorage.getItem("userId");
    userId = userId.replace(/^"(.*)"$/, "$1");
    const token = localStorage.getItem("token");
    // console.log(userId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        const a = response.data.name;
        setUserName(a);
        // console.log("User data retrieved successfully:", response.data.name);
      } else {
        console.error("Failed to retrieve user data:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };

  useEffect(() => {
    // Check if authentication token exists in localStorage
    const authToken = localStorage.getItem("token");
    if (authToken) {
      // If token exists, set isLoggedIn to true and retrieve user's name
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("userName") || "");
    } else {
      setIsLoggedIn(false);
      setUserName("");
      navigate("/login");
    }
    getUserName();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Remove authentication token and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p="2"
        // bgColor="green"
        mb={20}
      >
        <Box p="2">
          <Heading size="md">DNS App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          {/* Conditionally render based on authentication state */}
          {isLoggedIn ? (
            <>
              <Box p="2">{userName}</Box>
              <Button colorScheme="teal" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button colorScheme="teal">
                <Link to={"/signup"}>Signup</Link>
              </Button>
              <Button colorScheme="teal">
                <Link to={"/login"}>Login</Link>
              </Button>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </>
  );
}
export default Home;

// import {
//   Flex,
//   Box,
//   Heading,
//   Spacer,
//   ButtonGroup,
//   Button,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <>
//       <Flex
//         minWidth="max-content"
//         alignItems="center"
//         gap="2"
//         p="2"
//         // bgColor="green"
//         mb={20}
//       >
//         <Box p="2">
//           <Heading size="md">DNS App</Heading>
//         </Box>
//         <Spacer />
//         <ButtonGroup gap="2">
//           <Button colorScheme="teal">
//             <Link to={"/signup"}>Signup</Link>
//           </Button>
//           <Button colorScheme="teal">
//             {" "}
//             <Link to={"/login"}>Login</Link>
//           </Button>
//         </ButtonGroup>
//       </Flex>
//     </>
//   );
// }
// export default Home;
