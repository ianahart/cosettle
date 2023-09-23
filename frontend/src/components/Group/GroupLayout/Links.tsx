import { Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';

interface ILinksProps {
  adminId: number;
}

const Links = ({ adminId }: ILinksProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Flex>
      <RouterLink
        style={({ isActive }) => ({
          borderBottom: isActive ? '1px solid #805AD5' : 'none',
        })}
        className="group-links"
        to="about"
      >
        <Text color="text.primary">About</Text>
      </RouterLink>
      <RouterLink
        style={({ isActive }) => ({
          borderBottom: isActive ? '1px solid #805AD5' : 'none',
        })}
        className="group-links"
        to="posts"
      >
        <Text color="text.primary">Posts</Text>
      </RouterLink>
      <RouterLink
        style={({ isActive }) => ({
          borderBottom: isActive ? '1px solid #805AD5' : 'none',
        })}
        className="group-links"
        to="members"
      >
        <Text color="text.primary">Members</Text>
      </RouterLink>
      {user.id === adminId && (
        <RouterLink
          style={({ isActive }) => ({
            borderBottom: isActive ? '1px solid #805AD5' : 'none',
          })}
          className="group-links"
          to="invites"
        >
          <Text color="text.primary">Invite</Text>
        </RouterLink>
      )}
      <RouterLink
        style={({ isActive }) => ({
          borderBottom: isActive ? '1px solid #805AD5' : 'none',
        })}
        className="group-links"
        to="chat"
      >
        <Text color="text.primary">Group Chat</Text>
      </RouterLink>
    </Flex>
  );
};

export default Links;
