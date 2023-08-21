import { Box, Flex } from '@chakra-ui/react';
import Logo from '../Shared/Logo';
import AccountMenu from '../Account';

const AuthNavbar = () => {
  return (
    <Box bg="cover.primary" minH="40px" p="0.25rem">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Logo />
        </Box>
        <Flex justifyContent="space-between">
          <AccountMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthNavbar;
