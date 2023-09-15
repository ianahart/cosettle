import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Viewport from './Viewport';
import BackgroundImage from './BackgroundImage';
import Name from './Name';
import Links from './Links';
import { Outlet } from 'react-router-dom';
import ContentPreview from './ContentPreview';
import { groupState } from '../../../state/initialState';
import { IGroup } from '../../../interfaces';
import { Client } from '../../../util/client';

interface IGroupLayoutProps {
  preview: boolean;
  paramId?: string;
}

const GroupLayout = ({ preview, paramId = undefined }: IGroupLayoutProps) => {
  const [viewport, setViewport] = useState('desktop'); // preview
  const [group, setGroup] = useState<IGroup>(groupState);
  const [isGroupMemberOrAdmin, setIsGroupMemberOrAdmin] = useState(false);

  const handleSetViewport = (curViewport: string) => {
    setViewport(curViewport);
  };

  const uploadGroupBackgroundImage = (newFile: File) => {
    Client.uploadGroupBackgroundImage(group.id, newFile)
      .then((res) => {
        setGroup((prevState) => ({
          ...prevState,
          url: res.data.url,
        }));
        window.location.reload();
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
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
        setGroup(data.group);
        setIsGroupMemberOrAdmin(data.isGroupMemberOrAdmin);
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
        cursor={
          preview || (!isGroupMemberOrAdmin && group.privacy === 'private')
            ? 'not-allowed'
            : 'unset'
        }
        pointerEvents={
          preview || (!isGroupMemberOrAdmin && group.privacy === 'private')
            ? 'none'
            : 'unset'
        }
      >
        {viewport === 'desktop' && (
          <BackgroundImage
            uploadGroupBackgroundImage={uploadGroupBackgroundImage}
            adminId={group.adminId}
            url={group.url}
          />
        )}
        <Name group={group} preview={preview} handleUpdateName={handleUpdateName} />
        <Links />
        <Box my="2rem">
          <Outlet context={[group]} />
        </Box>
        {preview && <ContentPreview viewport={viewport} />}
      </Box>
    </Box>
  );
};

export default GroupLayout;
