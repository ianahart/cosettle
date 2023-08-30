import { Box } from '@chakra-ui/react';
import forgotPasswordBG from '../assets/forgot-password.png';
import Form from '../components/ForgotPassword/Form';

const ForgotPasswordRoute = () => {
  return (
    <Box
      minH="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundImage={`url(${forgotPasswordBG})`}
    >
      <Form />
    </Box>
  );
};

export default ForgotPasswordRoute;
