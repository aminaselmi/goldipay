import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import CheckOutPage from "../components/CheckOutPage";
import Empty from "../components/EmptyFunction";
import Trending from "../components/Trending";
import { decQty, incQty, removeItem } from "../redux/CartReducer/action";
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { t } = useTranslation();
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const cart = useSelector((store) => store.cart || []);
  const dispatch = useDispatch();
  console.log(cart);
  

  const handleIncrement = (id, size) => {
    dispatch(incQty({ id, size }));
    
  };
  const handleDecrement = (id, size, qty) => {
    if (qty > 1) {
      dispatch(decQty({ id, size }));
    } else {
      dispatch(removeItem({ id, size }));
    }
  };

  //   ---------------Up have a decreament and increament quantity logic----------------Total Price Logic--------------------------------------------
  const parsePrice = (str) => {
  if (!str) return 0;
  return Number(str.toString().replace(/,/g, ""));
  };
  let show_price = 0;
  let discount_price = 0;
  let quantity = 0;
  cart.forEach((item) => {
  show_price += parsePrice(item.price) * item.qty;
  discount_price += Number(item.final_price) * item.qty;
  quantity += item.qty;
});

  // =================================Upper have logic of discount=======================================================================

  return (
    <>
      {cart.length === 0 ? (
        <Empty />
      ) : (
        <div>
          <Box align="left" width={["95%", "90%", "80%", "85%"]} m="auto">
        
            <Heading my={"2"}>{t("YOUR BAG")}</Heading>
            <Text my={"2"}>{t("TOTAL")} [{cart.length} {t("items")}]</Text>
            <Text my={"2"}>
              {t("Items in your bag are not reserved — check out now to make them yours.")}
            </Text>
          </Box>
          {/* -------------------------------UP HeadLines-------------------------------------------------------- */}
          <Flex
            width={["100%", "100%", "90%", "90%"]}
            m="auto"
            justifyContent={"space-between"}
            flexDirection={isLargerThan ? "row" : "column"}
          >
            <Box width={["95%", "90%", "50%", "60%"]} m="auto">
              {cart?.length > 0 &&
                cart.map((item) => (
                  <Flex
                    border="3px solid beige"
                    m="auto"
                    my={"4"}
                    flexDirection={isLargerThan ? "row" : "column"}
                    key={`{item.id}-{item.size}`}
                  >
                    <Box height={"50%"} width={["100%", "100%", "40%", "30%"]}>
                      <Image w="100%" src={`https://goldipay.onrender.com/uploads/${item.image}`} alt={t("Product image")} />
                    </Box>
                    {/* -----------------------------------UP Image---------- Down description--------------------------------------------------------------------- */}
                    <Box
                      width={["95%", "90%", "60%", "60%"]}
                      align={"left"}
                      mx={"4"}
                      my={"6"}
                    >
                      <Flex justifyContent={"space-between"}>
                        <Text>{item.title} </Text>
                        <Box>
                          <Text as="s" color="red" fontWeight={"bold"}>
                            {item.price}DA
                          </Text>
                          <Text>{item.price}DA</Text>
                        </Box>
                      </Flex>
                      <Text my={"2"}>{item.color} </Text>
                      <Text> {t("SIZE")} : {item.size} </Text>
                      <Flex my={"4"} alignItems={"center"} gap="1rem">
                        <Button
                          bg="black"
                          colorScheme={"teal"}
                          p="0"
                          borderRadius={"50%"}
                          border={"1px solid black"}
                          disabled={item.qty === 0}
                          onClick={() =>
                            handleDecrement(item.id, item.size, item.qty)
                          }
                        >
                          <MinusIcon fontSize={"10"} />
                        </Button>
                        <Text>{item.qty}</Text>
                        <Button
                          colorScheme={"teal"}
                          p="0"
                          bg="black"
                          borderRadius={"50%"}
                          border={"1px solid black"}
                          onClick={() => handleIncrement(item.id, item.size)}
                        >
                          <AddIcon fontSize={"10"} />
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                ))}
            </Box>
            {/* ------------------------------up fetching cart and down checkout---------------------------------------- */}
            <Box width={["95%", "90%", "40%", "35%"]}>
              <CheckOutPage
                title={t("CHECKOUT")}
                cart={cart}
                show_price={show_price}
                discount_price={discount_price}
                link={"/checkout"}
                quantity={quantity}
              />
            </Box>
          </Flex>
        
        </div>
      )}
      <Box my={"5rem"}>
        <Box display={"none"}>
          <Carousel />
        </Box>
        <Box>
          
        </Box>
      </Box>
    </>
  );
};

export default Cart;