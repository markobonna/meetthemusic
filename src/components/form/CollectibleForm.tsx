import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Stack,
  StackProps,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { Field, FieldArray, useFormikContext } from "formik"
import React, { useCallback, useEffect } from "react"
import { FileUploadField } from "./FileUploadField"
import { MetadataForm } from "./MetadataForm"
import { Router, useRouter } from "next/router"
import { NftContent } from "../../../generated/graphql"
import { InfoPopOver } from "../../ui/PopOver/InfoPopOver"
import { useAuthContext } from "../../hooks/useAuthContext"
import toast from "react-hot-toast"
import posthog from "posthog-js"
import { Session } from "inspector"
import { useRouteChangePrompt } from "hooks/useRouteChangePrompt"

interface FormProps extends StackProps {
  isSetLoading?: boolean
  isFileLoading?: boolean
  setIsFileLoading?: React.Dispatch<React.SetStateAction<boolean>>
  onRedirect?: (data) => void
}

interface CollectibleData {
  title: string
  description: string
  numEntities: number
  metadata: Record<string, any>
  content: NftContent
  contentId: string
}

export const CollectibleForm = (props: FormProps) => {
  const { setIsFileLoading, isSetLoading, onRedirect } = props
  const { session, isLoading } = useAuthContext()

  const { setValues, values, touched, errors, submitForm, dirty, isSubmitting } =
    useFormikContext<CollectibleData>()

  const router = useRouter()

  useEffect(() => {
    if (dirty && !session && !isLoading) {
      posthog.capture("FORM_FILLED_BEFORE_LOGIN", {
        posthogEventDetail: "User fills out creation form (before sign-in)",
      })
    }
  }, [dirty, session, isLoading])

  const handleRedirect = useCallback(async () => {
    if (router.query?.fromRedirect === "true" && !isSetLoading && !isLoading) {
      const collectibleData = localStorage.getItem("COLLECTIBLE_CREATE_DATA")
      if (collectibleData) {
        let data
        try {
          data = JSON.parse(collectibleData)
          setValues({
            contentId: data?.contentId,
            title: data?.title,
            description: data?.description,
            metadata: data?.metadata,
            numEntities: data?.numEntities,
            content: data?.content,
          })
          onRedirect?.(data)
        } catch (e) {
          toast.error(
            "Uh-oh there was an error creating your template. Please try creating again. If the issue persists please contact us via discord."
          )
          console.error(e)
        }
      }
      localStorage.removeItem("COLLECTIBLE_CREATE_DATA")
      router.push(router.pathname, undefined, { shallow: true })
    }
  }, [setValues, submitForm, router, isSetLoading, isLoading])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect, isSetLoading])

  useRouteChangePrompt(dirty)

  const getBaseUrl = (url) => {
    if (!url?.trim()) return
    const baseUrl = new URL(url)
    baseUrl.hash = ""
    baseUrl.search = ""
    return baseUrl.toString()
  }

  return (
    <Stack spacing="1rem">
      <Stack spacing="0rem" borderRadius="xl" p={{ base: "1rem" }}>
        <Field name="content">
          {({ form }) => {
            const formFile = form?.values?.content?.files?.[0]
            return (
              <FormControl isInvalid={errors.content && !!touched.content} id="content">
                <FileUploadField
                  initialFilePreview={
                    formFile
                      ? {
                          type: formFile?.contentType,
                          url: getBaseUrl(formFile?.url),
                        }
                      : null
                  }
                  setLoading={setIsFileLoading}
                  onUpload={(content) => {
                    form.setFieldValue("contentId", content.id)
                    form.setFieldValue("content", content)
                    if (!session && !isLoading) {
                      posthog.capture("FORM_FILE_UPLOADED", {
                        posthogEventDetail: "React-dropzone used for file upload (before sign-in)",
                        content,
                      })
                    }
                  }}
                  accept={{
                    "image/png": [],
                    "image/jpg": [],
                    "image/jpeg": [],
                    "image/heif": [],
                    "image/webp": [],
                    "video/*": [],
                    "audio/mp3": [],
                    "audio/*": [],
                  }}
                />

                <FormErrorMessage fontWeight="semibold">
                  {errors.content?.toString()}
                </FormErrorMessage>
              </FormControl>
            )
          }}
        </Field>

        {values?.contentId && (
          <>
            <Field name="type">
              {({ field, form }) => (
                <FormControl isInvalid={errors.title && touched.title} id="type">
                  <VStack
                    alignItems="flex-start"
                    py="1rem"
                    spacing="0.25rem"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="xl"
                      my="auto"
                      htmlFor="title"
                    >
                      Nature of Work
                    </FormLabel>
                    <Spacer />
                    <Input
                      variant="outline"
                      rounded="2xl"
                      size="lg"
                      w={{ base: "100%" }}
                      {...field}
                      id="title"
                      placeholder="Song Recording Copyright , Music Composition Copyright, Licensing Contract, Other Contract"
                      maxLength={50}
                      ondirty
                    />
                  </VStack>

                  <FormErrorMessage fontWeight="semibold">{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="title">
              {({ field, form }) => (
                <FormControl isInvalid={errors.title && touched.title} id="title">
                  <VStack
                    alignItems="flex-start"
                    py="1rem"
                    spacing="0.25rem"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="xl"
                      my="auto"
                      htmlFor="title"
                    >
                      Title of Work
                    </FormLabel>
                    <Spacer />
                    <Input
                      variant="outline"
                      rounded="2xl"
                      size="lg"
                      w={{ base: "100%" }}
                      {...field}
                      id="title"
                      placeholder="My Title"
                      maxLength={50}
                      ondirty
                    />
                  </VStack>

                  <FormErrorMessage fontWeight="semibold">{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }) => (
                <FormControl isInvalid={errors.description && touched.description} id="description">
                  <VStack
                    alignItems="flex-start"
                    justifyContent="space-between"
                    py="1rem"
                    spacing="0.25rem"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="xl"
                      my="auto"
                      htmlFor="description"
                    >
                      Description
                    </FormLabel>

                    <Textarea
                      variant="outline"
                      size="lg"
                      rounded="2xl"
                      w={{ base: "100%" }}
                      {...field}
                      id="description"
                      placeholder="Description"
                      maxLength={300}
                    />
                  </VStack>
                  <FormErrorMessage fontWeight="semibold">
                    {form.errors.description}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="number">
              {({ field, form }) => (
                <FormControl isInvalid={errors.title && touched.title} id="type">
                  <VStack
                    alignItems="flex-start"
                    py="1rem"
                    spacing="0.25rem"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="xl"
                      my="auto"
                      htmlFor="title"
                    >
                      Copyright Registration or Contract Number
                    </FormLabel>
                    <Spacer />
                    <Input
                      variant="outline"
                      rounded="2xl"
                      size="lg"
                      w={{ base: "100%" }}
                      {...field}
                      id="title"
                      placeholder="PAu 7-654-321"
                      maxLength={50}
                      ondirty
                    />
                  </VStack>

                  <FormErrorMessage fontWeight="semibold">{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <VStack
              alignItems="flex-start"
              py="1rem"
              spacing="0.25rem"
              direction={{ base: "column", md: "row" }}
            >
              <FormLabel
                fontWeight="semibold"
                my="auto"
                color="gray.600"
                fontSize="xl"
                display="flex"
                alignItems="center"
              >
                Royalty Split
                <InfoPopOver message="Enter the parties and the Royalty percentage of each party." />
              </FormLabel>
              <FieldArray name="metadata">
                {(arrayHelpers) => <MetadataForm arrayHelpers={arrayHelpers} values={values} />}
              </FieldArray>
            </VStack>
            <Field name="numEntities">
              {({ field, form }) => (
                <FormControl id="numEntities" isInvalid={errors.numEntities && touched.numEntities}>
                  <VStack
                    alignItems="flex-start"
                    py="1rem"
                    spacing="0.25rem"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      fontWeight="semibold"
                      my="auto"
                      color="gray.600"
                      fontSize="xl"
                      htmlFor="numEntities"
                      display="flex"
                      alignItems="center"
                    >
                      # of Music Licenses to be Sold
                      <InfoPopOver message="Number of Music Licenses that can be minted from this Contract" />
                    </FormLabel>
                    <Spacer />
                    <NumberInput
                      variant="outline"
                      size="lg"
                      w={{ base: "100%" }}
                      {...field}
                      id="numEntities"
                    >
                      <NumberInputField {...field} id="numEntities" rounded="2xl" />
                    </NumberInput>
                  </VStack>

                  <FormErrorMessage fontWeight="semibold">
                    {form.errors.numEntities}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </>
        )}
      </Stack>
    </Stack>
  )
}
