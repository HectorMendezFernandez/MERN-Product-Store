import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"

export function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
      });

    const handleAddProduct = async () => {
        console.log(newProduct)
    }

  return (
    <Container maxW="container.sm">  
    <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box
            w="full"
            b={useColorModeValue("white", "gray.800")}
            p={6}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
        >
            <VStack spacing={4}>
             <Input
                placeholder="Name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
                placeholder="Description"
                name="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            />
            <Input
                placeholder="Price"
                name="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>Create Product</Button>
            </VStack>
        </Box>
    </VStack>
    </Container>

  )
}   

export default CreatePage