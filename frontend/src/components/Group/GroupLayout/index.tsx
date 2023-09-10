import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import Viewport from './Viewport';
import BackgroundImage from './BackgroundImage';
import Name from './Name';
import Links from './Links';
import { Outlet } from 'react-router-dom';
import ContentPreview from './ContentPreview';
import { groupState } from '../../../state/initialState';
import { IGroup, IUserContext } from '../../../interfaces';
import { UserContext } from '../../../context/user';
import { Client } from '../../../util/client';

interface IGroupLayoutProps {
  preview: boolean;
  paramId?: string;
}

const GroupLayout = ({ preview, paramId = undefined }: IGroupLayoutProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [viewport, setViewport] = useState('desktop'); // preview
  const [group, setGroup] = useState<IGroup>(groupState);

  const handleSetViewport = (curViewport: string) => {
    setViewport(curViewport);
  };

  const handleUpdateName = (name: string) => {
    if (name.length === 0) return;
    Client.updateGroupName(group.id, name)
      .then(() => {
        setGroup((prevState) => ({
          ...prevState,
          name,
        }));
        window.location.reload();
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const getGroup = () => {
    const groupId = paramId as string;
    Client.getGroup(parseInt(groupId))
      .then((res) => {
        const { data } = res.data;
        setGroup(data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (paramId !== undefined) {
      getGroup();
    }
  }, [paramId]);

  return (
    <Box
      width={viewport === 'desktop' ? '100%' : '50%'}
      p="1rem"
      bg="black.tertiary"
      minH="600px"
      borderRadius={8}
      mx="auto"
    >
      {preview && <Viewport viewport={viewport} handleSetViewport={handleSetViewport} />}

      <Box
        className="group-layout-container"
        cursor={preview ? 'not-allowed' : 'unset'}
        pointerEvents={preview ? 'none' : 'unset'}
      >
        {viewport === 'desktop' && <BackgroundImage preview={preview} />}
        <Name group={group} preview={preview} handleUpdateName={handleUpdateName} />
        <Links />
        <Box my="2rem">
          <Outlet />
        </Box>
        {preview && <ContentPreview viewport={viewport} />}
      </Box>
    </Box>
  );
};

export default GroupLayout;
