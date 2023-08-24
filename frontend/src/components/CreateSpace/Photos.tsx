import { Box, Input, Text, Flex } from '@chakra-ui/react';
import Header from './Header';
import { BsFillCameraFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { nanoid } from 'nanoid';

interface IPhotosProps {
  addPhotoToList: (file: File) => void;
  photos: File[];
  cancelPhotoToUpload: (fileName: string) => void;
  uploadError: string;
}

const Photos = ({
  addPhotoToList,
  photos,
  cancelPhotoToUpload,
  uploadError,
}: IPhotosProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addPhotoToList(e.target.files[0]);
  };

  const formatFileSize = (fileSize: number) => {
    const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let l = 0,
      n = parseInt(fileSize.toString(), 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  };

  return (
    <Box>
      <Header heading="Upload photos" />
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          borderRadius={4}
          margin="0 auto"
          bg="primary.dark"
          className="box-shadow"
          minH="200px"
          width="300px"
        >
          <Input
            zIndex={10}
            type="file"
            position="absolute"
            height="100%"
            width="100%"
            cursor="pointer"
            onChange={handleInputChange}
            opacity={0}
          />
          <Flex>
            <Box mr="0.25rem" color="light.primary">
              <BsFillCameraFill />
            </Box>
            <Box color="light.primary">
              <Text fontSize="0.9rem">Upload photos</Text>
              <Text fontSize="0.8rem">Click or drag a photo</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box width="300px" margin="2rem auto">
        {photos.length > 0 && <Text>Photos to upload:</Text>}
        {uploadError.length > 0 && (
          <Text fontSize="0.85rem" color="red.400">
            {uploadError}
          </Text>
        )}
        <Box>
          {photos.map((file: File) => {
            return (
              <Flex key={nanoid()} justify="space-between">
                <Text fontSize="0.85rem">{file.name}</Text>
                <Text fontSize="0.8rem">{formatFileSize(file.size)}</Text>
                <Box cursor="pointer" onClick={() => cancelPhotoToUpload(file.name)}>
                  <AiOutlineClose />
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Photos;
