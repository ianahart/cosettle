import { Box } from '@chakra-ui/react';
import Hero from '../components/Home/Hero';
import SpaceTypes from '../components/Home/SpaceTypes';

const HomeRoute = () => {
  return (
    <Box mx="auto" mt="2rem" maxWidth="968px">
      <Hero />
      <SpaceTypes />
    </Box>
  );
};

export default HomeRoute;
