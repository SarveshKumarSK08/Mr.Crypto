import { Button, HStack, Link, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import Logo from "../../../public/logo.png";

const Headers = () => {
  return (
    <HStack
      p={"1"}
      shadow={"base"}
      bgColor={"blackAlpha.900"}
      justifyContent={['center','space-between']}
      display={['grid','flex']}
      
    >
      <NavLink to="/">
        <Image
          src={Logo}
          alt={"Logo"}
          maxH={"120px"}
          maxW={"250px"}
          shadow={"lg"}
          borderRadius={"lg"}
          transition={"all 0.3s"}
          m={"4"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </NavLink>
      <HStack spacing={"4"}
      justifyContent={'center'}
      display={['grid','flex']}
      flexDirection={['column','row']}
      >
        <Button
          variant={"unstyled"}
          color={"white"}
          transition={"all 0.3s"}
          css={{
            "&:hover": {
              color: "Highlight",
              transform: "scale(1.1)",
            },
          }}
        >
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button
          variant={"unstyled"}
          color={"white"}
          transition={"all 0.3s"}
          css={{
            "&:hover": {
              color: "Highlight",
              transform: "scale(1.1)",
            },
          }}
        >
          <NavLink to="/coins">Coins</NavLink>
        </Button>
        <Button
          variant={"unstyled"}
          color={"white"}
          transition={"all 0.3s"}
          css={{
            "&:hover": {
              color: "Highlight",
              transform: "scale(1.1)",
            },
          }}
        >
          <NavLink to="/exchange">Exchanges</NavLink>
        </Button>
        <Button
          variant={"unstyled"}
          color={"white"}
          transition={"all 0.3s"}
          css={{
            "&:hover": {
              color: "Highlight",
              transform: "scale(1.1)",
            },
          }}
        >
          <NavLink to="/search">Search</NavLink>
        </Button>
      </HStack>
    </HStack>
  );
};

export default Headers;





