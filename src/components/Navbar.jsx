import { Box, Flex, Text, Button, HStack, Image, Spacer,useColorMode,useMediaQuery,Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState ,useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiFileText, 
  FiSettings, 
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiChevronDown,
  FiShoppingCart,
  FiHeart,
  FiShoppingBag,
  FiDatabase,
  FiMenu
} from "react-icons/fi";
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log("Current language:", t('home')); // Should show "Home" or "الرئيسية"
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const handleHome = () => {
    navigate("/");
  };
  //new lines
  //const textColor = useColorModeValue("gray.800", "white");
   const [isOpen, setIsOpen] = useState(false);
  //loged in user
      const { user, logout } = useContext(AuthContext);
      const role = user?.role;
      const isLoggedIn = user !== null && user !== undefined; //!!user;
      const [userData, setUserData] = useState({
          name: "",
          email: "",
          mobile: "",
          address: "",
          joinDate: "",
          avatar: "https://via.placeholder.com/150"
        });
  
        useEffect(() => {
          if (user) {
            setUserData({
              name: user.name || "",
              email: user.email || "",
              mobile: user.mobile || "",
              address: user.address || "",
              joinDate: user.createdAt ? user.createdAt.slice(0,4) : "2026",
              avatar: user.avatar || "https://via.placeholder.com/150"
            });
          }
        }, [user]);


  const handleLogout = () => {
  logout();
  navigate("/login");
   };
  /////////////////////////////////////////////////ll      
  const { colorMode } = useColorMode();

  // Base and active style for NavLink
  const baseStyle = { color: "white", textDecoration: "none" };
  const activeStyle = {
    color: "#38B2AC",
    fontWeight: "bold",
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      p="4"
      bg="#1a202c"
      color="white"
    >
      {/* Logo */}
      <HStack onClick={handleHome} cursor="pointer">
        <Image
          src="/images/gpicon.ico"
          alt="GoldiPay Logo"
          width={["45px", "50px", "60px"]}
        />
        <Text fontSize="xl" fontWeight="bold">
          GoldiPay
        </Text>
      </HStack>

      {/* Navigation Links */}
      <Spacer />
        {isLargerThan ? (
          <HStack>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              to="/"
            >
              <Text
                color={"white"}
                my="4"
                mx="2"
              >
                {t('Home')}
              </Text>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              to="/products"
            >
              <Text
                color={"white"}
                my="4"
                mx="2"
              >
                {t('Products')}
              </Text>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              to="/men"
            >
              <Text
                color={"white"}
                my="4"
                mx="2"
              >
                {t('Men')}
              </Text>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              to="/women"
            >
              <Text
                color={"white"}
                my="4"
                mx="2"
              >
                {t('Women')}
              </Text>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              to="/shoes"
            >
              <Text
                color={"white"}
                my="4"
                mx="2"
              >
                {t('Shoes')}
              </Text>
            </NavLink>
          </HStack>
              ) : ( <Box>
          <Button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu />
          </Button>

          {isOpen && (
            <Box
              position="absolute"
              top="70px"
              left="0"
              width="100%"
              bg="gray.800"
              p="4"
              zIndex="1000"
            >
              <NavLink to="/"><Text color="white">{t("Home")}</Text></NavLink>
              <NavLink to="/products"><Text color="white">{t("Products")}</Text></NavLink>
              <NavLink to="/men"><Text color="white">{t("Men")}</Text></NavLink>
              <NavLink to="/women"><Text color="white">{t("Women")}</Text></NavLink>
              <NavLink to="/shoes"><Text color="white">{t("Shoes")}</Text></NavLink>
            </Box>
          )}
        </Box>
      )}

      <Spacer />
        <LanguageSwitcher />
       {/* Right side - Changes based on login status */}
        <HStack spacing={2}>
          {isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<FiChevronDown />}
                _hover={{ bg: "gray.700" }}
              >
                <HStack spacing={2}>
                  <Avatar 
                    size="sm" 
                    name={userData.name} 
                    src={userData.avatar} 
                  />
                  <Text color="white" display={{ base: "none", md: "block" }}>
                    {userData.name}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList bg={"#1a202c"}>
                {role === "client" && (
                 <>
                      <MenuItem bg={"#1a202c"} icon={<FiUser />} 
                      onClick={() => navigate("/client-dashboard")}>
                        {t('My Profile')}
                      </MenuItem>
                      <MenuItem bg={"#1a202c"} icon={<FiShoppingCart />}
                      onClick={() => navigate("/cart")}>
                        {t('Cart')}
                      </MenuItem>
                      <MenuItem bg={"#1a202c"} icon={<FiShoppingBag />} 
                      onClick={() => navigate("/orders")}>
                        {t('Orders')}
                      </MenuItem>
                      <MenuItem bg={"#1a202c"} icon={<FiHeart />}
                      onClick={() => navigate("/whishlist")}>
                        {t('Wishlist')}
                      </MenuItem>
                      <MenuItem bg={"#1a202c"} icon={<FiSettings />}
                      onClick={() => navigate("/settings")}>
                        {t('Settings')}
                        
                      </MenuItem>
                  </> )}
                  {role === "seller" && (
                    <>
                     <MenuItem bg={"#1a202c"} icon={<FiFileText />} 
                      onClick={() => navigate("/saller-dashboard")}>
                        {t('Dashboard')}
                      </MenuItem>
                      <MenuItem bg={"#1a202c"} icon={<FiShoppingBag />} 
                      onClick={() => navigate("/orders")}>
                        {t('Orders')}
                      </MenuItem>
                      <MenuItem bg={"#1a202c"} icon={<FiSettings />}
                      onClick={() => navigate("/settings")}>
                        {t('Settings')}
                        
                      </MenuItem>
                    </>)}
                  <MenuDivider />
                  <MenuItem 
                    icon={<FiLogOut />} 
                    onClick={handleLogout}
                    color="red.500"
                    bg={"#1a202c"}
                  >
                    {t('Logout')}
                  </MenuItem>
                </MenuList>
            </Menu>
          ) : (
            /* Logged Out State - Login/Signup Buttons */
          <>
          <Box>
            <Button
              mr="2"
              variant="outline"
              colorScheme="teal"
              onClick={() => navigate("/login")}
            >
              {t('Login')}
            </Button>
            <Button colorScheme="teal" onClick={() => navigate("/register")}>
              {t('Sign Up')}
            </Button>
          </Box>
          
        </>

        )}
      </HStack> 
    </Flex>
  );
  
};

export default Navbar;
