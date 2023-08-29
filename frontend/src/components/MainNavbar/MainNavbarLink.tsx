import { ListItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

interface IMainNavbarLinkProps {
  path: string;
  text: string;
  isMobile: boolean;
}

const MainNavbarLink = ({ path, text, isMobile }: IMainNavbarLinkProps) => {
  const { nonAuthTheme } = useContext(UserContext) as IUserContext;
  return (
    <ListItem
      _hover={{ opacity: 0.8 }}
      color={nonAuthTheme === 'dark' ? 'text.primary' : 'light.primary'}
      fontSize="1rem"
      mx={isMobile ? '0' : '1rem'}
      my={isMobile ? '0.5rem' : '0'}
      p={isMobile ? '0.25rem' : 0}
      listStyleType="none"
    >
      <RouterLink to={path}>{text}</RouterLink>
    </ListItem>
  );
};

export default MainNavbarLink;
