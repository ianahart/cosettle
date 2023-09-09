import { Box } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import MainView from './MainView';
import CreateView from './CreateView';

const Sidebar = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [view, setView] = useState('main'); // create

  const switchView = (curView: string) => {
    setView(curView);
  };

  const renderView = () => {
    switch (view) {
      case 'main':
        return <MainView switchView={switchView} />;
      case 'create':
        return <CreateView switchView={switchView} />;
      default:
        return <MainView switchView={switchView} />;
    }
  };

  return (
    <Box
      border="1px solid"
      bg={user.theme === 'dark' ? 'black.tertiary' : '#fff'}
      borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
      borderRight="none"
      minH="100vh"
      className="overflow-scroll group-sidebar-container"
      overflowY="auto"
    >
      {renderView()}
    </Box>
  );
};

export default Sidebar;
