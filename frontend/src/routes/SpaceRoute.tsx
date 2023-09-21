import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISpace, IUserContext } from '../interfaces';
import { spaceState } from '../state/initialState';
import { Client } from '../util/client';
import Carousel from '../components/Space/Carousel';
import Description from '../components/Space/Description';
import { UserContext } from '../context/user';

const SpaceRoute = () => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const params = useParams();
  const [space, setSpace] = useState<ISpace>(spaceState);

  const fetchSpace = (id: string | undefined) => {
    Client.fetchSpace(id)
      .then((res) => {
        setSpace(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchSpace(params.id);
  }, [params.id]);
  return (
    <Box minH="100vh">
      <Flex
                bg={user.theme === 'dark'  || nonAuthTheme === 'dark'? '#1d1d1d' : 'transparent'}
        borderRadius={8}
        className="single-space-container"
        mt="5rem"
        mx="auto"
      >
        <Box p="1rem" my="1rem" w="100%">
          <Carousel photos={space.photos} />
        </Box>
        <Box p="1rem" my="1rem" w="100%">
          <Description space={space} />
        </Box>
      </Flex>
    </Box>
  );
};

export default SpaceRoute;
