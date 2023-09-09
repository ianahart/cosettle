import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Viewport from './Viewport';
import BackgroundImage from './BackgroundImage';
import Name from './Name';
import Links from './Links';
import { Outlet } from 'react-router-dom';
import ContentPreview from './ContentPreview';

interface IGroupLayoutProps {
  preview: boolean;
}

const GroupLayout = ({ preview }: IGroupLayoutProps) => {
  const [viewport, setViewport] = useState('desktop'); // preview

  const handleSetViewport = (curViewport: string) => {
    setViewport(curViewport);
  };
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
        <Name preview={preview} />
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
