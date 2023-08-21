import { Box, Heading } from '@chakra-ui/react';

interface IHeaderProps {
  heading: string;
}

const HeadingStack = ({ heading }: IHeaderProps) => {
  return (
    <Box>
      <Heading fontSize="1rem">{heading}</Heading>
      <Box my="0.25rem" borderBottom="1px solid" borderColor="text.secondary"></Box>
    </Box>
  );
};

export default HeadingStack;
