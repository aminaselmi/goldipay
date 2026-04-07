import {
  Box,
  Flex,
  useMediaQuery,
  useToast,
  Image,
  Text,
  Button,
  Input,
  Stack,
  Divider,
} from "@chakra-ui/react";
import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { clearItem } from "../redux/CartReducer/action";
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  //
  const { user } = useContext(AuthContext);
  console.log("USER:", user);
  // ✅ cart from redux
  const cart = useSelector((store) => store.cart || []);

  // ✅ Edahabia form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // ✅ total
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
  });

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cart);
    // 🔥 validation
    if (!cardNumber || !expiry || !cvv) {
      toast({
        title: t("Fill all card fields"),
        status: "warning",
        duration: 2000,
      });
      return;
    }
    if (!cardNumber || cardNumber.length < 16) {
      return toast({
        title: t("Invalid card number"),
        status: "error"
      });
    }

    if (!expiry || !expiry.includes("/")) {
      return toast({
        title: t("Invalid expiry date"),
        status: "error"
      });
    }

    if (!cvv || cvv.length !== 3) {
      return toast({
        title: t("Invalid CVV"),
        status: "error"
      });
    }

    try {
      const orderData = {
        user: user?._id || user?.id, // 🔥 logged user
        items: cart.map((item) => ({
          product: item.id,
          title: item.title,
          price: item.price,
          quantity: item.qty,
          image: item.image,
        })),
        totalPrice: total,
        paymentMethod: "edahabia",
        paymentDetails: {
          cardLast4: cardNumber.slice(-4),
          expiry
        },
        isPaid: true
      };
      
      const res = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) throw new Error("Order failed");

      toast({
        title: t("Payment successful 🎉"),
        status: "success",
        duration: 2000,
      });
      dispatch(clearItem());
      navigate("/order-success");

    } catch (err) {
      toast({
        title: t(err.message),
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Flex
      direction={isLargerThan ? "row" : "column"}
      p="2rem"
      gap="2rem"
      mt="4rem"
    >

      {/* LEFT → EDAHABIA FORM */}
      <Box flex="1" border="1px solid #eee" p="2rem" borderRadius="md">
        <Text fontSize="xl" fontWeight="bold" mb="1rem">
          {t("Edahabia Payment")}
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing="1rem">

            <Input
              placeholder={t("💳 Card Number")}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <Input
              placeholder={t("📅 MM/YY")}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <Input
              placeholder={t("🔐 CVV")}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />

            <Button colorScheme="blue" type="submit">
              {t("Pay Now")}
            </Button>

          </Stack>
        </form>
      </Box>

      {/* RIGHT → SUMMARY */}
      <Box flex="1" border="1px solid #eee" p="2rem" borderRadius="md">
        <Text fontSize="xl" fontWeight="bold" mb="1rem">
          {t("Order Summary")}
        </Text>

        {cart.map((item) => (
          <Box key={item.id} mb="1rem">
            <Flex gap="1rem" align="center">
              <Image
                src={`http://localhost:5000/uploads/${item.image}`}
                boxSize="80px"
                alt={t("Product image")}
              />
              <Box>
                <Text fontWeight="bold">{item.title}</Text>
                <Text>{t("Qty")}: {item.qty}</Text>
                <Text>{item.price} DA</Text>
              </Box>
            </Flex>
            <Divider mt="1rem" />
          </Box>
        ))}

        <Text fontSize="lg" fontWeight="bold" mt="1rem">
          {t("Total")}: {total} DA
        </Text>
      </Box>

    </Flex>
  );
};

export default Checkout;