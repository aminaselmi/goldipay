import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex minH="60vh" align="center" justify="center">
      <Spinner size="xl" thickness="4px" />
    </Flex>
  );
};

export default Loading;
