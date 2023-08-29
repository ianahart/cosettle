import { Box, Heading, Text } from '@chakra-ui/react';

interface IHeaderProps {
  heading: string;
  subText: string;
}

const Header = ({ heading, subText }: IHeaderProps) => {
  return (
    <Box my="2rem">
      <Heading mb="0.5rem" fontSize="1.2rem" as="h3">
        {heading}
      </Heading>
      <Text fontSize="0.85rem">{subText}</Text>
    </Box>
  );
};

export default Header;
