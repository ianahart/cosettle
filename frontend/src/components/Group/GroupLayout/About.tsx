import { Box, Flex, Text } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { RiEarthFill } from 'react-icons/ri';
import { AiFillLock } from 'react-icons/ai';
import { IGroup } from '../../../interfaces';

const About = () => {
  const [group] = useOutletContext<IGroup[]>();
  return (
    <Box color="text.primary">
      <Flex
        borderRadius={8}
        p="0.5rem"
        my="0.5rem"
        bg={group.privacy === 'public' ? '#161515' : 'transparent'}
      >
        <Flex
          width="35px"
          height="35px"
          flexDir="column"
          justify="center"
          borderRadius="50%"
          align="center"
          mx="0.25rem"
          bg="black.tertiary"
          fontSize="1.3rem"
        >
          <RiEarthFill />
        </Flex>
        <Box>
          <Text>Public</Text>
          <Text>Anyone can see who's in the group and what they post.</Text>
        </Box>
      </Flex>
      <Flex
        borderRadius={8}
        p="0.5rem"
        my="0.5rem"
        bg={group.privacy === 'private' ? '#161515' : 'transparent'}
      >
        <Flex
          width="35px"
          height="35px"
          flexDir="column"
          justify="center"
          borderRadius="50%"
          align="center"
          mx="0.25rem"
          bg="black.tertiary"
          fontSize="1.3rem"
        >
          <AiFillLock />
        </Flex>
        <Box>
          <Text>Private</Text>
          <Text>Only members can see who's in the group and what they post.</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default About;
