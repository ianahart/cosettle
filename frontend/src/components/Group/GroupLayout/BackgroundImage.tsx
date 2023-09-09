import { Image, Box } from '@chakra-ui/react';
import groupBG from '../../../assets/group.png';

interface IBackgroundImageProps {
  preview: boolean;
}

const BackgroundImage = ({ preview }: IBackgroundImageProps) => {
  return (
    <Box>
      <Image src={groupBG} alt="group background" />
    </Box>
  );
};

export default BackgroundImage;
