import { Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Links = () => {
  return (
    <Flex>
      <RouterLink className="group-links" to="about">
        <Text color="text.primary">About</Text>
      </RouterLink>
      <RouterLink className="group-links" to="posts">
        <Text color="text.primary">Posts</Text>
      </RouterLink>
      <RouterLink className="group-links" to="members">
        <Text color="text.primary">Members</Text>
      </RouterLink>
    </Flex>
  );
};

export default Links;
