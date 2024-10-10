import { Container, Text, VStack } from "@chakra-ui/react"

export function HomePage() {
  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text 
        fontSize={30} 
        textAlign="center" 
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip="text"
        >Welcome to the Home Page

        </Text>
      </VStack>
    </Container>


  )
}   

export default HomePage