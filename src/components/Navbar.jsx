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
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure
} from "@chakra-ui/react";
const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log("Current language:", t('home')); // Should show "Home" or "الرئيسية"
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const handleHome = () => {
    navigate("/");
  };
  //new lines
   const { isOpen, onOpen, onClose } = useDisclosure();
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
       {!isLargerThan && (
          <Button variant="ghost" color="white" onClick={onOpen}>
            <FiMenu size={24} />
          </Button>
        )}
         {/* Navigation Links */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
  <DrawerOverlay />
  <DrawerContent bg="gray.900" color="white">
    <DrawerCloseButton />

    <DrawerHeader borderBottomWidth="1px">
      Menu
    </DrawerHeader>

    <DrawerBody>
      <HStack flexDirection="column" align="flex-start" spacing={4}>
        <NavLink to="/" onClick={onClose}>
          <Text>{t("Home")}</Text>
        </NavLink>

        <NavLink to="/products" onClick={onClose}>
          <Text>{t("Products")}</Text>
        </NavLink>

        <NavLink to="/men" onClick={onClose}>
          <Text>{t("Men")}</Text>
        </NavLink>

        <NavLink to="/women" onClick={onClose}>
          <Text>{t("Women")}</Text>
        </NavLink>

        <NavLink to="/shoes" onClick={onClose}>
          <Text>{t("Shoes")}</Text>
        </NavLink>

        {/* Language Switcher */}
        <Box pt={4}>
          <LanguageSwitcher />
        </Box>
      </HStack>
    </DrawerBody>
  </DrawerContent>
</Drawer>
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
