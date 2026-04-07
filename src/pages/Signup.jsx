import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    storeName: "",
    businessType: "",
    storeDescription: "",
    storeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(t("Account created successfully ✅"));
        navigate("/login");
      } else {
        alert(data.message || t("Something went wrong ❌"));
      }
    } catch (error) {
      console.error(error);
      alert(t("Server error ❌"));
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} maxW="lg" w="full" px={6}>
        <Heading textAlign="center">{t("Create Account")}</Heading>

        <Box
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            {/* Account Type */}
            <FormControl>
              <FormLabel>{t("Account Type")}</FormLabel>
              <RadioGroup value={role} onChange={setRole}>
                <Stack direction="row">
                  <Radio value="client">{t("Client")}</Radio>
                  <Radio value="seller">{t("Seller")}</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Common Fields */}
            <FormControl isRequired>
              <FormLabel>{t("Name")}</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("Email")}</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("Password")}</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("Mobile")}</FormLabel>
              <Input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </FormControl>

            {/* Seller Extra Fields */}
            {role === "seller" && (
              <>
                <FormControl isRequired>
                  <FormLabel>{t("Store Name")}</FormLabel>
                  <Input
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t("Business Type")}</FormLabel>
                  <Input
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t("Store Description")}</FormLabel>
                  <Input
                    name="storeDescription"
                    value={formData.storeDescription}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t("Store Address")}</FormLabel>
                  <Input
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            )}

            <Button
              size="lg"
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              onClick={handleSubmit}
            >
              {t("Create Account")}
            </Button>

            <Text align="center">
              {t("Already have an account?")}{" "}
              <RouterLink to="/login" style={{ color: "#3182ce" }}>
                {t("Login")}
              </RouterLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;