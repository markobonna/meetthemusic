import { Box } from "@chakra-ui/react"
import React from "react"

import AppLayout from "../components/AppLayout"

const WatchPage = () => {
  return (
    <AppLayout>
      <Box h="100%" w="100%" bg="page.background" color="page.text" p="12">
        <Box as="section" maxW="5xl" mx="auto" py="12" px={{ base: "6", md: "8" }}>
          <p>
            <strong>Watch on Mobile</strong>
          </p>
          <p>
            <strong>Watch on Desktop</strong>
          </p>
        </Box>
      </Box>
    </AppLayout>
  )
}
export default WatchPage
