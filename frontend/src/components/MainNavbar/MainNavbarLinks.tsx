import { UnorderedList } from '@chakra-ui/react';
import MainNavbarLink from './MainNavbarLink';
import ThemeToggler from '../Shared/ThemeToggler';

interface IMainNavbarLinksProps {
  flexDir: string;
  alignItems: string;
  display: string[];
  isMobile: boolean;
}

const MainNavbarLinks = ({
  flexDir,
  alignItems,
  display,
  isMobile,
}: IMainNavbarLinksProps) => {
  return (
    <>
      <UnorderedList
        margin="0"
        display={display}
        alignItems={alignItems}
        flexDirection={flexDir === 'row' ? 'row' : 'column'}
      >
        <MainNavbarLink isMobile={isMobile} path="/explorer" text="Explorer" />
        <MainNavbarLink isMobile={isMobile} path="/login" text="Login" />
        <MainNavbarLink isMobile={isMobile} path="/register" text="Sign Up" />
        <ThemeToggler />
      </UnorderedList>
    </>
  );
};

export default MainNavbarLinks;
