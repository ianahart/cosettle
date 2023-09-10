import { Image, Box, Flex, Input, Tooltip, useToast } from '@chakra-ui/react';
import groupBG from '../../../assets/group.png';
import { MdModeEdit } from 'react-icons/md';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';

interface IBackgroundImageProps {
  adminId: number;
  uploadGroupBackgroundImage: (file: File) => void;
  url: string;
}

const BackgroundImage = ({
  adminId,
  uploadGroupBackgroundImage,
  url,
}: IBackgroundImageProps) => {
  const toast = useToast();
  const { user } = useContext(UserContext) as IUserContext;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'An error occurred.',
        description: 'Please keep background image under 2MB',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });

      return;
    }
    uploadGroupBackgroundImage(file);
  };

  return (
    <Box position="relative">
      <Image width="100%" src={url ? url : groupBG} alt="group background" />
      {user.id === adminId && (
        <Box cursor="pointer" position="absolute" top="0" right="0">
          <Tooltip label="Change background">
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              fontSize="2rem"
              color="light.primary"
              width="45px"
              height="45px"
              borderRadius="50%"
              bg="primary.dark"
            >
              <MdModeEdit />
              <Input
                onChange={handleOnChange}
                cursor="pointer"
                type="file"
                position="absolute"
                opacity={0}
              />
            </Flex>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default BackgroundImage;
