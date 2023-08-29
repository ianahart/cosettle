import { Box } from '@chakra-ui/react';
import Header from './Header';

const Password = () => {
  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="Change Password"
          subText="Keeping a strong password is critical for good security"
        />
      </Box>
    </Box>
  );
};

export default Password;
