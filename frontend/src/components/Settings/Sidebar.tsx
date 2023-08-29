import { Box } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
  return (
    <Box
      width={['95%', '95%', '250px']}
      maxW={['95%', '95%', '250px']}
      minW="250px"
      borderTopLeftRadius={4}
      borderBottomLeftRadius={4}
      margin="0 auto"
      flexGrow="1"
      border="1px solid"
      borderColor={['transparent', 'transparent', 'text.secondary']}
      borderRight="none"
      minH="100vh"
      className="sidebar"
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;
