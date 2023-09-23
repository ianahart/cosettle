import { Box, Heading } from '@chakra-ui/react';
import SettingsLink from './SettingsLink';
import { BiUserCircle } from 'react-icons/bi';
import { PiUserListBold } from 'react-icons/pi';
import { RiLockPasswordLine } from 'react-icons/ri';

const SidebarContent = () => {
  return (
    <Box p="1rem" color="text.primary">
      <Box mt="1.5rem" mb="2rem">
        <Heading fontSize="1.2rem" as="h2">
          Settings
        </Heading>
      </Box>
      <Box>
        <SettingsLink icon={<BiUserCircle />} to="details" text="My details" />
        <SettingsLink icon={<PiUserListBold />} to="edit-profile" text="Edit profile" />
        <SettingsLink icon={<RiLockPasswordLine />} to="password" text="Password" />
      </Box>
    </Box>
  );
};

export default SidebarContent;
