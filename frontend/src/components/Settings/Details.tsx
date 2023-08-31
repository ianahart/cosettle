import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IProfile, IUserContext } from '../../interfaces';
import { Client } from '../../util/client';
import { profileState } from '../../state/initialState';
import Profile from '../Profile/Profile';

const Details = () => {
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [profile, setProfile] = useState<IProfile>(profileState);

  const getProfile = () => {
    Client.getProfile(user.profileId)
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.profileId !== 0) {
      shouldRun.current = false;
      getProfile();
    }
  }, [getProfile]);

  return (
    <Box>
      <Profile profile={profile} />
    </Box>
  );
};

export default Details;
