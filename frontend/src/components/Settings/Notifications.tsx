import { Box } from '@chakra-ui/react';
import Header from './Header';

const Notifications = () => {
  return (
    <Box color="text.primary">
      <Box as="header">
        <Header
          heading="Notification Settings"
          subText="Control what type of notifications are sent to you"
        />
      </Box>
    </Box>
  );
};

export default Notifications;
