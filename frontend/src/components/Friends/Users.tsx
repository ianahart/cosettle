import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { ISearchUser } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Shared/Avatar';
import { AiOutlinePlus } from 'react-icons/ai';

interface IUsersProps {
  users: ISearchUser[];
}
const Users = ({ users }: IUsersProps) => {
  const navigate = useNavigate();
  const goToProfile = (profileId: number) => {
    navigate(`/profiles/${profileId}`);
  };

  return (
    <Box>
      {users.map((user) => {
        return (
          <Flex key={user.userId} my="1.5rem" justify="space-between" align="center">
            <Box p="0.5rem">
              <Flex
                cursor="pointer"
                onClick={() => goToProfile(user.profileId)}
                alignItems="center"
              >
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  height="45px"
                  width="45px"
                  url={user.avatarUrl}
                />
                <Box>
                  <Text ml="0.5rem">
                    {user.firstName} {user.lastName}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Button
              bg="transparent"
              border="1px solid"
              borderColor="text.primary"
              color="text.primary"
              _hover={{ bg: 'transparent' }}
            >
              <Box>
                <AiOutlinePlus />
              </Box>
              Add as friend
            </Button>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Users;
