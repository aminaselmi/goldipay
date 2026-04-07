// Home.jsx
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  Container,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  FaShieldAlt,
  FaStore,
  FaFileInvoiceDollar,
  FaNewspaper,
  FaChartLine,
  FaConciergeBell,
  FaEllipsisH,
  FaUserLock,
  FaHeadset,
  FaCoins,
  FaCreditCard,
  FaCrown,
  FaLock,
  FaAmazon,
  FaTv,
  FaWifi,
  FaCity,
  FaStore as FaStoreIcon,
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const quickAccessItems = [
    { icon: FaNewspaper, label: t('Latest') },
    { icon: FaChartLine, label: t('Fees') },
    { icon: FaConciergeBell, label: t('Services') },
    { icon: FaEllipsisH, label: t('Other Services') },
  ];

  const features = [
    { icon: FaShieldAlt, title: t('Secure & Fast Payment'), desc: t('High encryption technology to protect your transactions') },
    { icon: FaStore, title: t('Shop, Multiple Platforms'), desc: t('Jumia, Shop&Go, Temu and more') },
    { icon: FaFileInvoiceDollar, title: t('Transfer & Bill Payment'), desc: t('Phone, electricity, and internet bills') },
  ];

  const supportItems = [
    { icon: FaUserLock, label: t('Secure Access') },
    { icon: FaHeadset, label: t('Instant Support') },
    { icon: FaCoins, label: t('Funds') },
    { icon: FaConciergeBell, label: t('Services') },
    { icon: FaCreditCard, label: t('Payments') },
  ];

  const steps = [
    { number: '1', title: t('Create Account'), desc: t('Sign up for free and enter your basic information') },
    { number: '2', title: t('Verify Profile'), desc: t('Activate secure payment with Gold Card') },
    { number: '3', title: t('Link Protection Cards'), desc: t('Add your Gold Card and start shopping') },
  ];

  const brands = [
    { icon: FaAmazon, name: t('JUMIA') },
    { icon: FaStoreIcon, name: t('Store.dz') },
   // { icon: FaChartSimple, name: t('Analyzer') },
    { icon: FaTv, name: t('Shahid') },
    { icon: FaWifi, name: t('LocalTelecom') },
    { icon: FaCity, name: t('North Nineveh') },
  ];

  return (
    <Box >
      <Container maxW="container.xl" py={8}>
        {/* Hero Banner */}
        <Box
          borderRadius="32px"
          overflow="hidden"
          boxShadow="0 12px 28px rgba(0, 0, 0, 0.05)"
          mb="40px"
        >
          <Image
            src="/images/gpimg.png"
            alt={t('GoldiPay Banner')}
            objectFit="cover"
            w="100%"
            maxH="300px"
            fallbackSrc="https://placehold.co/1200x500/fbf3e4/d4a73a?text=GoldiPay"
          />
        </Box>

        {/* Features Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="28px" mb="40px">
          {features.map((feature, idx) => (
            <Box
              key={idx}
              bg="white"
              borderRadius="28px"
              p="28px 16px"
              textAlign="center"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.02)"
              border="1px solid #f0e9da"
              transition="all 0.25s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
            >
              <Icon as={feature.icon} boxSize="2.8rem" color="#e6b13e" mb="16px" />
              <Heading size="md" mb="12px" fontWeight="700">
                {feature.title}
              </Heading>
              <Text color="#5a6874" fontWeight="500">
                {feature.desc}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Online Shopping Section */}
        <Box mb="30px">
          <Heading size="lg" fontWeight="700" mb="16px">
            {t('Online shopping made easy and secure')}
          </Heading>
          
          {/* Quick Access */}
          <Flex
            wrap="wrap"
            justify="space-between"
            bg="#fbf8f0"
            borderRadius="48px"
            p="16px 32px"
            gap="20px"
          >
            {quickAccessItems.map((item, idx) => (
              <VStack
                key={idx}
                spacing="8px"
                cursor="pointer"
                p="8px 16px"
                borderRadius="40px"
                _hover={{ bg: '#fff2df' }}
                transition="0.2s"
                flex="1"
                minW="80px"
              >
                <Icon as={item.icon} boxSize="1.8rem" color="#cfa23d" />
                <Text fontWeight="600" color="#2c3e4e">
                  {item.label}
                </Text>
              </VStack>
            ))}
          </Flex>
        </Box>

        {/* Support Section */}
        <Box
          bgGradient="linear(145deg, #fef9ed, #fffcf5)"
          borderRadius="48px"
          p={{ base: "30px 20px", md: "40px 32px" }}
          textAlign="center"
          mb="40px"
        >
          <Heading size="xl" mb="32px" fontWeight="800" color="#1e2a36">
            🌟 {t('Support sent to you:')}{' '}
            <Text as="span" color="#dba32e">
              {t('Get our features')}
            </Text>
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing="30px">
            {supportItems.map((item, idx) => (
              <VStack key={idx} spacing="12px" cursor="pointer">
                <Box
                  bg="white"
                  p="16px"
                  borderRadius="60px"
                  boxShadow="0 6px 14px rgba(0,0,0,0.03)"
                >
                  <Icon as={item.icon} boxSize="1.8rem" color="#e6b13e" />
                </Box>
                <Text fontWeight="600" color="#2c3e4e">{item.label}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        {/* How It Works */}
        <Box mb="48px">
          <Heading textAlign="center" size="xl" fontWeight="800" mb="48px" color="#e6b13e">
            {t('How does GoldiPay work?')}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="32px">
            {steps.map((step, idx) => (
              <Box
                key={idx}
                bg="white"
                borderRadius="32px"
                p="32px 20px"
                textAlign="center"
                boxShadow="0 12px 24px rgba(0,0,0,0.02)"
                border="1px solid #ede6d8"
              >
                <Box
                  bg="#e6b13e20"
                  w="56px"
                  h="56px"
                  fontSize="1.8rem"
                  fontWeight="800"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mx="auto"
                  mb="20px"
                  borderRadius="60px"
                  color="#c48b2b"
                >
                  {step.number}
                </Box>
                <Heading size="md" mb="12px">
                  {step.title}
                </Heading>
                <Text color="#5a6874">{step.desc}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Brands Strip */}
        <Flex
          wrap="wrap"
          justify="center"
          gap="48px"
          py="20px"
          my="20px"
          borderTop="1px solid #ece3d4"
          borderBottom="1px solid #ece3d4"
        >
          {brands.map((brand, idx) => (
            <HStack key={idx} spacing="8px" cursor="pointer">
              <Icon as={brand.icon} boxSize="1.5rem" color="#e6b13e" />
              <Text fontWeight="700" color="#5d6f7f">
                {brand.name}
              </Text>
            </HStack>
          ))}
        </Flex>

        {/* CTA Section */}
        <Box
          bg="#f5e5cb"
          borderRadius="48px"
          p={{ base: "40px 20px", md: "56px 32px" }}
          textAlign="center"
          mb="64px"
        >
          <Heading size="xl" mb="24px" fontWeight="800">
            {t('Start using GoldiPay today')}
          </Heading>
          <Button
            bg="#1e2a36"
            color="white"
            size="lg"
            px="42px"
            py="14px"
            fontSize="1.1rem"
            fontWeight="700"
            borderRadius="60px"
            _hover={{ bg: '#2c3f4e', transform: 'scale(1.02)' }}
            onClick={handleCreateAccount}
          >
            {t('Create Free Account')}
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        textAlign="center"
        py="32px"
        px="20px"
        borderTop="1px solid #ede3cf"
        color="#6c7a89"
        fontSize="0.85rem"
      >
        <Icon as={FaLock} mr="6px" />
        {t('Secure electronic payment | Gold Card | All rights reserved © 2026 GoldiPay')}
      </Box>
    </Box>
  );
};

export default Home;