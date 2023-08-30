import { Box, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { slugify } from '../../util';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

interface ISettingsLinkProps {
  to: string;
  text: string;
  icon: React.ReactNode;
}

const SettingsLink = ({ to, text, icon }: ISettingsLinkProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box
      my="1.5rem"
      _hover={{ bg: user.theme === 'dark' ? 'cover.primary' : '' }}
      py="0.25rem"
      px="0.25rem"
      borderRadius={8}
    >
      <RouterLink to={`/${slugify(user.firstName, user.lastName)}/settings/${to}`}>
        <Flex align="center">
          <Box fontSize="1.2rem" mr="0.5rem">
            {icon}
          </Box>
          <Text>{text}</Text>
        </Flex>
      </RouterLink>
    </Box>
  );
};

export default SettingsLink;
