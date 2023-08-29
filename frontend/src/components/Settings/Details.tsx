import { Box } from '@chakra-ui/react';
import Header from './Header';

const Details = () => {
  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="My Details"
          subText="These details are public by default. Go into the Visibility section to change."
        />
      </Box>
    </Box>
  );
};

export default Details;
