import { Box, Button } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Client } from '../util/client';

const HomeRoute = () => {
  const shouldRun = useRef(true);

  const makeHeartBeat = () => {
    Client.heartbeat()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      makeHeartBeat();
    }
  }, [shouldRun.current, makeHeartBeat]);

  return (
    <Box>
      Home
      <Button>Heartbeat</Button>
    </Box>
  );
};

export default HomeRoute;
