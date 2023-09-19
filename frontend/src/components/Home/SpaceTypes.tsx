import { Box, Flex, Text } from '@chakra-ui/react';
import { spaces } from '../../state/initialState';
import SpaceType from './SpaceType';

const SpaceTypes = () => {
  return (
    <Box p="1rem" color="light.primary" my="2rem">
      <Box minH="500px" bg="primary.dark" borderRadius={4} p="1rem">
        <Text fontSize="1.2rem">Space Types</Text>
        <Flex my="1rem" justify="space-evenly" flexWrap="wrap" align="center">
          {spaces.map((space) => {
            return <SpaceType key={space.id} space={space} />;
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default SpaceTypes;
