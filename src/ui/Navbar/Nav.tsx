import {
  Image,
  Link as ChakraLink,
  Button,
  useBreakpointValue,
  IconButton,
  Box,
  Hide,
  Show,
} from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"
import { Navbar as NiftoryNavbar } from "./Navbar"
import { FiMenu } from "react-icons/fi"

import { FaGoogle, FaRegUser as UserIcon } from "react-icons/fa"
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io"
import { useAuthContext } from "../../hooks/useAuthContext"
import { BsDiscord } from "react-icons/bs"
import posthog from "posthog-js"
import { useRouter } from "next/router"
export const Navbar = ({ onOpen }) => {
  const { session, signIn, isLoading } = useAuthContext()
  let onClick = () => {
    signIn("/app/collection")
    posthog.capture("HEADER_LOGIN", {
      posthogEventDetail: "Sign In with Google invoked from top banner",
    })
  }
  const isMobile = useBreakpointValue({ base: true, md: false })
  const router = useRouter()

  const menuItems = React.useMemo(() => {
    if (!session) {
      return [
        {
          href: "/musicgenerator",
          component: (
            <Link href="/musicgenerator" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.100"
                gap="0.3rem"
              >
                <Hide below="md">Generate New Music with AI</Hide>
              </ChakraLink>
            </Link>
          ),
        },
        {
          title: "Meet the Musician",
          component: (
            <Button
              rounded="3xl"
              isLoading={isLoading}
              cursor="pointer"
              onClick={onClick}
              colorScheme="red"
              minWidth={{ base: "100px", md: "180px" }}
              fontWeight={400}
              p={{ base: "1rem", md: "1.2rem 1rem" }}
              background="red"
              fontSize={{ base: "12px", md: "14px" }}
              ml="1rem"
              h={{ base: "8", md: "10" }}
              my="0.2rem"
              leftIcon={<FaGoogle />}
            >
              Sign in with Google to save your Music
            </Button>
          ),
        },
      ]
    } else {
      return [
        {
          href: "/musicgenerator",
          component: (
            <Link href="/musicgenerator" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.100"
                gap="0.3rem"
              >
                <Hide below="md">Generate New Music with AI</Hide>
              </ChakraLink>
            </Link>
          ),
        },
        {
          title: "New Item",
          href: "/app/new-item",
          component: (
            <Link href="/app/new-item" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.100"
                gap="0.3rem"
                onClick={() =>
                  posthog.capture("HEADER_NEW_ITEM", {
                    posthogEventDetail: "Create new item from button",
                  })
                }
              >
                <Hide below="md"> Create an NFT</Hide>
              </ChakraLink>
            </Link>
          ),
        },
        {
          title: "New Collection",
          href: "/",
          component: (
            <Link href="/app/collection" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.100"
                gap="0.3rem"
                onClick={() =>
                  posthog.capture("HEADER_VIEW_COLLECTION", {
                    posthogEventDetail: "Opened My Collection from top banner",
                  })
                }
              >
                <Hide below="md"> My NFTs</Hide>
              </ChakraLink>
            </Link>
          ),
        },

        {
          href: "/app/account",
          component: (
            <Link href="/app/account" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.100"
                gap="0.3rem"
              >
                <Hide below="md"> My Profile</Hide>
              </ChakraLink>
            </Link>
          ),
        },
      ]
    }
  }, [session])

  return (
    <>
      <NiftoryNavbar
        leftComponent={
          <>
            {isMobile && session && (
              <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
              />
            )}
            <Link href="/" passHref>
              <Image
                boxSize={{ md: "70" }}
                src="/logo.png"
                alt="logo"
                zIndex="2"
                w={{ base: "10rem", md: "7rem" }}
                py="4px"
              />
            </Link>
          </>
        }
        menu={menuItems}
      />
    </>
  )
}
