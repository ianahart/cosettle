import { Box } from '@chakra-ui/react';
import Header from './Header';
const EditProfile = () => {
  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="Edit Profile"
          subText="Control what information you want to share with the community"
        />
      </Box>
    </Box>
  );
};

export default EditProfile;
