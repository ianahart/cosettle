import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { IProfile } from '../interfaces';
import { useEffect, useRef, useState } from 'react';
import { profileState } from '../state/initialState';
import { Client } from '../util/client';
import Profile from '../components/Profile/Profile';

const ProfileRoute = () => {
  const shouldRun = useRef(true);
  let { profileId } = useParams();
  const [profile, setProfile] = useState<IProfile>(profileState);

  const getProfile = () => {
    Client.getProfile(profileId as unknown as number)
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getProfile();
    }
  }, [getProfile]);

  return (
    <Flex justify="center">
      <Profile profile={profile} />
    </Flex>
  );
};

export default ProfileRoute;
