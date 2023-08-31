import { Box, Image, Flex, Text, Tooltip } from '@chakra-ui/react';
import { IProfile, IUserContext } from '../../interfaces';
import { abbreviate, slugify } from '../../util';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { UserContext } from '../../context/user';
import { useContext } from 'react';

interface IProfileProps {
  profile: IProfile;
}

const Profile = ({ profile }: IProfileProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  let { avatarUrl, firstName, lastName, bio, userId } = profile;

  const goToEditProfile = () => {
    if (user.id !== userId) return;
    navigate(`/${slugify(firstName, lastName)}/settings/edit-profile`);
  };

  return (
    <Box>
      <Flex
        flexDir="column"
        alignItems="center"
        justify="center"
        width="95%"
        maxW="600px"
        mt="5rem"
      >
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
          borderRadius="50%"
          border="2px solid"
          borderColor="primary.dark"
        >
          {avatarUrl !== null ? (
            <Image
              width="200px"
              height="200px"
              borderRadius="50%"
              src={avatarUrl}
              alt="profile picture"
            />
          ) : (
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              width="200px"
              height="200px"
              borderRadius="50%"
              bg="primary.dark"
            >
              <Text color="light.primary" fontSize="2rem">
                {abbreviate(firstName, lastName)}
              </Text>
            </Flex>
          )}
        </Box>
        {user.id === userId && (
          <Flex ml="auto">
            <Tooltip label="Edit profile">
              <Box
                onClick={goToEditProfile}
                fontSize="2rem"
                cursor="pointer"
                color="text.primary"
              >
                <AiOutlineEdit />
              </Box>
            </Tooltip>
          </Flex>
        )}
        <Box mb="1rem">
          <Text color="text.primary">
            {firstName} {lastName}
          </Text>
        </Box>
        <Box>
          <Text textAlign="center" color="text.primary" lineHeight="1.6">
            {bio}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
export default Profile;
