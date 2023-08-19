import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import darkLogo from '../../assets/dark-logo.svg';
import lightLogo from '../../assets/light-logo.svg';

const Logo = () => {
  return (
    <Flex alignItems="center" justifyContent="center" flexDir="column">
      <Image height="32px" width="32px" src={darkLogo} alt="logo of wifi bars" />
      <Heading color="text.primary" as="h1" fontSize="1.1rem">
        CoSettle
      </Heading>
    </Flex>
  );
};

export default Logo;
