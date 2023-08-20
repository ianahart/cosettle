import { Box, Flex } from '@chakra-ui/react';
import registerBG from '../assets/register.jpg';
import Form from '../components/Register/Form';

const RegisterRoute = () => {
  return (
    <Box
      backgroundImage={`url(${registerBG})`}
      backgroundSize="cover"
      backgroundPosition="center"
      minH="100vh"
    >
      <Flex justifyContent="center" pt="10rem">
        <Form />
      </Flex>
    </Box>
  );
};

export default RegisterRoute;
