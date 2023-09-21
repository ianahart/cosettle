import { Box } from '@chakra-ui/react';
import HeadingStack from '../HeadingStack';
import MenuLink from './MenuLink';
import { AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';

const Spaces = () => {
  return (
    <Box>
      <HeadingStack heading="Spaces" />
      <MenuLink to="/spaces/create" text="Create" icon={<AiOutlinePlus />} />
      <MenuLink to="/spaces/favorites" text="Favorites" icon={<AiOutlineStar />} />
    </Box>
  );
};

export default Spaces;
