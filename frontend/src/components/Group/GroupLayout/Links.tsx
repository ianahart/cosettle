import { Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';

interface ILinksProps {
  adminId: number;
}

const Links = ({ adminId }: ILinksProps) => {
  const { user } = useContext(UserContext) as IUserContext;
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
      {user.id === adminId && (
        <RouterLink className="group-links" to="invites">
          <Text color="text.primary">Invite</Text>
        </RouterLink>
      )}
    </Flex>
  );
};

export default Links;
