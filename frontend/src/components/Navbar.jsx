import { Button, Container, Flex, HStack, Link, Text} from "@chakra-ui/react";
import { FaPlusSquare } from 'react-icons/fa';

export function Navbar() {
  return (
    <Container maxW="container.xl" bg="gray.100" p={4}>
      <Flex
        justifyContent="space-between"
        h={16}
        alignItems={"center"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link href="/">Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link href="/create">
            <Button colorScheme="blue">
                <FaPlusSquare size={20} />
            </Button>
          </Link>
          <Link href="/products">
            <Button colorScheme="blue">Products</Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
