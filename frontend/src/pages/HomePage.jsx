import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product";
import { useEffect } from "react"
import { ProductCard } from "../components/ProductCard"

export function HomePage() {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);

  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text 
        fontSize={30} 
        textAlign="center" 
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip="text"
        >Current Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        </SimpleGrid>

        {/* if there are no products */
        products.length === 0 && (
          <Text 
          fontSize="x1" textAlign="center" fontWeight='bold' color='gray.500'>
            No products found😢 {" "}
            <Link to="/create">
            <Text as='span' color='blue.500' _hover={{ textDecoration : 'underline' }}>
               Create a product
            </Text>
            </Link>
          </Text>
        )
        }
      </VStack>
    </Container>


  )
}   

export default HomePage