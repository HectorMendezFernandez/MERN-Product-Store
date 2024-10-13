/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useState } from "react";

export function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.700", "gray.100");
  const bg = useColorModeValue("white", "gray.700");
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct } = useProductStore();
  //use the toast hook from chakra ui
  const toast = useToast();
  //method to delete a product
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
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
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColor}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<FaEdit />}
            colorScheme="blue"
            aria-label={"Edit"}
            onClick={onOpen}
          />
          <IconButton
            icon={<FaTrash />}
            colorScheme="red"
            aria-label={"Delete"}
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Product Name" name="name" value={updatedProduct.name}/>
              <Input placeholder="Product Description" name="description" value={updatedProduct.description}/>
              <Input placeholder="Product Price" name="price" value={updatedProduct.price}/>
              <Input placeholder="Product Image" name="image" value={updatedProduct.image}/>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Update
            </Button>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
// value={updateProduct.name} onChange={(e)=> setUpdateProduct({...updateProduct, name: e.target})}

export default ProductCard;
