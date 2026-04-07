import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

export const CheckoutForm = ({
  isLargerThan,
  FormSubmit,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Box width={["95%", "90%", "50%", "50%"]}  m="auto" min-h="100vh">
        <form p="3rem" onSubmit={FormSubmit}>
          <Heading align={"left"} my={"5"}>
            {t('Address')}<span style={{ color: "red" }}>*</span>
          </Heading>
          <HStack spacing={"10"} my={"5"}>
            <Input
              onChange={onChange}
              type="text"
              name="firstName"
              placeholder={t('First Name*')}
            />
            <Input
              onChange={onChange}
              type="text"
              name="lastName"
              placeholder={t('Last Name*')}
            />
          </HStack>
          <VStack spacing={"10"} my={"10"}>
            <Input
              onChange={onChange}
              type="text"
              name="addressLine1"
              placeholder={t('Address Line 1*')}
            />
            <Input
              onChange={onChange}
              type="text"
              name="addressLine2"
              placeholder={t('Address Line 2')}
            />
          </VStack>
          <HStack spacing={"10"} my={"8"}>
            <Input
              onChange={onChange}
              type="text"
              name="locality"
              placeholder={t('Town/City*')}
            />
            <Input
              onChange={onChange}
              type="number"
              name="pinCode"
              placeholder={t('Pin Code*')}
            />
          </HStack>
          <HStack spacing={"10"} my={"5"}>
            <Input
              onChange={onChange}
              type="text"
              name="state"
              placeholder={t('State/Territory*')}
            />
            <Input
              onChange={onChange}
              type="text"
              name="country"
              placeholder={t('Country*')}
            />
          </HStack>
          <Divider />
          <Heading align={"left"} my={"5"}>
            {t('Contact')}<span style={{ color: "red" }}>*</span>
          </Heading>
          <VStack spacing={"8"}>
            <Input
              onChange={onChange}
              type="email"
              name="email"
              placeholder={t('Email*')}
            />
            <Input
              onChange={onChange}
              type="number"
              name="mobile"
              placeholder={t('Mobile*')}
            />
          </VStack>
          <Button
            mt="2rem"
            width={["95%", "90%", "80%", "80%"]}
            my={"4"}
            bg={isLargerThan ? "black" : "grey"}
            color="whitesmoke"
            p="1.5rem 2rem"
            border={"3px solid beige"}
            _hover={{
              background: "none",
              color: "teal",
              border: "1px solid black",
            }}
            type="submit"
          >
            {t('PLACE ORDER')}
          </Button>
        </form>
      </Box>
    </>
  );
};