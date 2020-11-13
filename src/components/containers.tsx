import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Stack,
  StackProps,
} from '@chakra-ui/react'

// --

export interface CommonContainerProps {
  wide?: boolean
}

// --

export interface ContainerProps extends BoxProps, CommonContainerProps {}

export const Container: React.FC<ContainerProps> = ({
  wide = false,
  ...props
}) => {
  return <Box maxW={wide ? '3xl' : 'xl'} mx="auto" px={2} {...props} />
}

// --

export interface FlexContainerProps extends FlexProps, CommonContainerProps {}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  wide = false,
  ...props
}) => {
  return (
    <Flex
      direction="column"
      maxW={wide ? '3xl' : 'xl'}
      mx="auto"
      px={2}
      {...props}
    />
  )
}

// --

export interface StackContainerProps extends StackProps, CommonContainerProps {}

export const StackContainer: React.FC<StackContainerProps> = ({
  wide = false,
  ...props
}) => {
  return <Stack maxW={wide ? '3xl' : 'xl'} mx="auto" px={2} {...props} />
}
