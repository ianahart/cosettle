import { Box, Flex } from '@chakra-ui/react';
import loginBG from '../assets/login.jpg';
import Form from '../components/Login/Form';

const LoginRoute = () => {
  return (
    <Box
      backgroundPosition="cover"
      backgroundSize="cover"
      backgroundImage={`url(${loginBG})`}
      minH="100vh"
    >
      <Flex justifyContent="center" pt="10rem">
        <Form />
      </Flex>
    </Box>
  );
};

export default LoginRoute;
