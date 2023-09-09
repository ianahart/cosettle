import { Box, Text } from '@chakra-ui/react';

interface INameProps {
  preview: boolean;
}

const Name = ({ preview }: INameProps) => {
  return (
    <Box my="1.5rem">
      <Text mb="0.5rem" color="text.primary" fontSize="1.3rem" fontWeight="bold">
        Group name
      </Text>
      <Box mb="1rem" borderBottom="1px solid" borderColor="text.secondary"></Box>
    </Box>
  );
};

export default Name;
