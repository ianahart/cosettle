import { Heading, Flex } from '@chakra-ui/react';

interface IHeaderProps {
  heading: string;
}

const Header = ({ heading }: IHeaderProps) => {
  return (
    <Flex justify="center" my="1rem">
      <Heading fontSize="1.3rem">{heading}</Heading>
    </Flex>
  );
};

export default Header;
