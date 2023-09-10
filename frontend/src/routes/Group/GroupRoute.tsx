import { Box } from '@chakra-ui/react';
import GroupLayout from '../../components/Group/GroupLayout';
import { useParams } from 'react-router-dom';

const GroupRoute = () => {
  const { id } = useParams();

  return (
    <Box>
      <GroupLayout paramId={id} preview={false} />
    </Box>
  );
};

export default GroupRoute;
