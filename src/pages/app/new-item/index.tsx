import { Box, Center, Flex, Heading, VStack } from "@chakra-ui/react"
import { HowItWorks, SupportingResources, Showcase, LoginText } from "ui/Home"

import AppLayout from "../../../components/AppLayout"
import { CollectibleCreateForm } from "../../../components/form/CollectibleCreateForm"

const NewItemPage = () => {
  return (
    <>
      <AppLayout title="Create New File | Meet the Music">
        <VStack w="full" p="1rem" my="3rem" gap="3rem">
          <Center px={{ base: "0", md: "1rem" }} w="full" flexDirection="column">
            <Center mb={{ base: "1rem", md: "4rem" }} px={{ base: "0", md: "1.4rem" }}>
              <Heading
                as="h3"
                fontWeight="700"
                textAlign="center"
                maxW="600"
                color="content.100"
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                Manage your Music as an NFT on Flow Blockchain
              </Heading>
              <br></br>
            </Center>
            <Heading as="h1" color="content.100" textAlign="center">
              {" "}
              Copyrights, Contracts, Streaming Royalty Payouts, and NFT sales
            </Heading>
            <Flex
              minW={{ base: "100%", md: "800px" }}
              rounded="xl"
              alignItems="center"
              justifyContent="center"
              minH={{ base: "250px" }}
            >
              <CollectibleCreateForm />
            </Flex>
          </Center>
        </VStack>
      </AppLayout>
    </>
  )
}

NewItemPage.requireAuth = true
export default NewItemPage
