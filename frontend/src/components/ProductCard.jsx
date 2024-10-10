/* eslint-disable react/prop-types */
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useProductStore } from "../store/product";

export function ProductCard({product}) {
    const textColor = useColorModeValue("gray.700", "gray.100");
    const bg = useColorModeValue("white", "gray.700");

    const {deleteProduct} = useProductStore();
    //use the toast hook from chakra ui
    const toast = useToast();
    //method to delete a product
    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid);
        if(success) {
            toast({
                title: "Product Deleted",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

  return (
    <Box shadow={"lg"} rounded={"lg"} overflow={'hidden'} transition={'all 0.3s'} _hover={{transform: "translateY(-5px)", shadow: "x1"}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
        <Box p={4}>
            <Heading as={"h3"} size={"md"}>{product.name}</Heading>
            <Text fontWeight={"bold"} fontSize={"xl"}  mb={4} color={textColor}>${product.price}</Text>
            <HStack spacing={2}>
                <IconButton icon={<FaEdit />} colorScheme="blue" aria-label={"Edit"} />
                <IconButton icon={<FaTrash />} colorScheme="red" aria-label={"Delete"}  onClick={() => handleDeleteProduct(product._id)}/>
            </HStack>
        </Box>
    </Box>
  )
}


export default ProductCard;