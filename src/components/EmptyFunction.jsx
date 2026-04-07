import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Empty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleproducts = () => {
    navigate("/products");
  };
  return (
    <div>
      <Container
        w="75%"
        m="auto"
        align={"left"}
        h="80vh"
        display="flex"
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <Heading mx={"4"} my={"6"} textTransform={"uppercase"}>
            {t("Your Bag is Empty")}
          </Heading>
          <Text mx={"4"} my={"6"}>
            {t("Once you add something to your bag - it will appear here. Ready to get started?")}
          </Text>

          <Button
            onClick={handleproducts}
            mx={"4"}
            my={"5"}
            p="1rem 4rem"
            bg={"black"}
            color={"whitesmoke"}
            colorScheme={"orange"}
          >
            {t("GET STARTED")}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Empty;