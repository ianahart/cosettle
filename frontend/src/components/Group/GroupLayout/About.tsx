import { Box, Flex, Text } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { RiEarthFill } from 'react-icons/ri';
import { AiFillLock } from 'react-icons/ai';
import { IGroup, IUserContext } from '../../../interfaces';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';

const About = () => {
  const [group] = useOutletContext<IGroup[]>();

  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Box color="text.primary">
      <Flex
        borderRadius={8}
        p="0.5rem"
        my="0.5rem"
        bg={
          group.privacy === 'public' && user.theme === 'dark'
            ? '#161515'
            : group.privacy == 'public' && user.theme !== 'dark'
            ? 'border.primary'
            : 'transparent'
        }
      >
        <Flex
          width="35px"
          height="35px"
          flexDir="column"
          justify="center"
          borderRadius="50%"
          align="center"
          mx="0.25rem"
          bg={user.theme === 'dark' ? 'black.tertiary' : 'border.primary'}
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
        bg={
          group.privacy === 'private' && user.theme === 'dark'
            ? '#161515'
            : group.privacy == 'private' && user.theme !== 'dark'
            ? 'border.primary'
            : 'transparent'
        }
      >
        <Flex
          width="35px"
          height="35px"
          flexDir="column"
          justify="center"
          borderRadius="50%"
          align="center"
          mx="0.25rem"
          bg={user.theme === 'dark' ? 'black.tertiary' : 'border.primary'}
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
