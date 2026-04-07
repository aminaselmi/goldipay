import React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CheckOutPage = ({
  cart,
  show_price,
  discount_price,
  link,
  title,
  coupon,
  total_discount,
  discount,
  quantity,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <Box w="100%" m="auto">
      <Stack>
        <Button
          border={"3px solid beige"}
          bg={"black"}
          color={"white"}
          fontWeight={"bold"}
          colorScheme={"none"}
          p="1.5rem"
          _hover={{ bg: "none", color: "teal" }}
          onClick={() => navigate(link)}
        >
          {title}
        </Button>
      </Stack>

      <Stack spacing={5} my={"7"} border="3px solid beige">
        <Heading size={"md"} align={"left"} mx={"2"}>
          {t('ORDER SUMMARY')}
        </Heading>
        <Flex lineHeight={"10"}>
          <Box align={"left"} mx={"2"} my={"4"}>
            <Text>{t('ORIGINAL PRICE')}</Text>
            <Text>{cart.length} {t('ITEMS')}</Text>
            <Text>{t('QUANTITY')}</Text>
            <Text>{t('DISCOUNT')}</Text>
            <Text>{t('DELIVERY')}</Text>
            <Text>{t('TOTAL')}</Text>
            <Badge colorScheme="red">({t('inclusive to all taxes')})</Badge>
          </Box>
          <Box mx={"2"} my={"4"}>
            <Text as="s" color="grey">
              {show_price}.00 DA
            </Text>
            <Text>{discount_price}.00 DA</Text>
            <Text>{quantity}</Text>
            <Text>{discount}.00 DA</Text>
            <Text>{t('FREE')}</Text>
            <Text>{total_discount}.00 DA</Text>
          </Box>
        </Flex>
      </Stack>
      <Stack my={"2"}>{coupon}</Stack>
    </Box>
  );
};

export default CheckOutPage;