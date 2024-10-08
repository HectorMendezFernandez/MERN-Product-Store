import { Button, Container, Flex, HStack, Link, Text, useColorMode} from "@chakra-ui/react";
import { FaPlusSquare, FaSun, FaMoon } from 'react-icons/fa';

export function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="container.xl" px={4}>
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
            <Button>
                <FaPlusSquare size={20} />
            </Button>
          </Link>
          <Link href="/products">
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FaSun></FaSun> : <FaMoon></FaMoon>}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
