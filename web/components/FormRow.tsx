import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";

const FormRow = ({field, data} : {field: string, data: string}) => (
  <HStack w="3xl">
    <Box w="2xl">
      <Text align="left" fontSize="2xl" color="lc.white">{field}</Text>
    </Box>
    <Box w="xl">
      <Text align="right" fontSize="2xl" color="lc.white">{data}</Text>
    </Box>
  </HStack>
);

export default FormRow;