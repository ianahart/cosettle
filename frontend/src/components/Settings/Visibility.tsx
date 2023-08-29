import Header from './Header';
import { Box } from '@chakra-ui/react';

const Visibility = () => {
  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="Visiblity"
          subText="Control what data is visible to other people and the public"
        />
      </Box>
    </Box>
  );
};

export default Visibility;
