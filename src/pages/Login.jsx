import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';

const Login = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      toast({
        title: t("Missing fields"),
        description: t("Please enter email and password"),
        status: "warning",
        duration: 3000,
        position: "top",
      });
      return;
    }

    try {

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {

        login(data.user);

        toast({
          title: t("Login successful"),
          description: t("Welcome to GoldiPay"),
          status: "success",
          duration: 2000,
          position: "top",
        });

        if (data.user.role === "client") {
          navigate("/");
        }

        if (data.user.role === "seller") {
          navigate("/");
        }

      } else {

        toast({
          title: t("Login failed"),
          description: data.message || t("Invalid email or password"),
          status: "error",
          duration: 3000,
          position: "top",
        });

      }

    } catch (error) {

      toast({
        title: t("Server error"),
        description: t("Cannot connect to backend"),
        status: "error",
        duration: 3000,
        position: "top",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing={8} maxW="md" w="100%" p={6}>

        <Heading textAlign="center">{t("Sign in to GoldiPay")}</Heading>

        <Box p={6} rounded="lg" boxShadow="lg">

          <Stack spacing={4}>

            <FormControl isRequired>
              <FormLabel>{t("Email")}</FormLabel>
              <Input
                type="email"
                placeholder={t("Enter your email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("Password")}</FormLabel>

              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder={t("Enter your password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <InputRightElement>
                  <Button
                    variant="ghost"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>

              </InputGroup>
            </FormControl>

            <Stack direction="row" justify="space-between">
              <Checkbox>{t("Remember me")}</Checkbox>
              <Link color="blue.400">{t("Forgot password?")}</Link>
            </Stack>

            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              onClick={handleLogin}
              isLoading={loading}
            >
              {t("Sign in")}
            </Button>

            <Text textAlign="center">
              {t("Don’t have an account?")}{" "}
              <RouterLink to="/register">
                <Link color="blue.400">{t("Sign up")}</Link>
              </RouterLink>
            </Text>

          </Stack>

        </Box>

      </Stack>
    </Flex>
  );
};

export default Login;