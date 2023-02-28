import { Box } from "@chakra-ui/react"
import React from "react"

import AppLayout from "../components/AppLayout"

const RewardZone = () => {
  return (
    <AppLayout>
      <Box h="100%" w="100%" bg="page.background" color="page.text" p="12">
        <Box as="section" maxW="5xl" mx="auto" py="12" px={{ base: "6", md: "8" }}>
          <p>
            <strong>This is the Reward Zone</strong>
          </p>
        </Box>
      </Box>
    </AppLayout>
  )
}
export default RewardZone
