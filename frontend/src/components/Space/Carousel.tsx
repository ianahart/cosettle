import { Box, Image, Flex } from '@chakra-ui/react';
import { IPhoto } from '../../interfaces';
import { useEffect, useState } from 'react';
import { photoState } from '../../state/initialState';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ICarouselProps {
  photos: IPhoto[];
}

const Carousel = ({ photos }: ICarouselProps) => {
  const [selected, setSelected] = useState<IPhoto>(photoState);

  useEffect(() => {
    if (photos.length) {
      setSelected(photos[0]);
    }
  }, [setSelected, photos.length]);

  return (
    <Box>
      <Box>
        <Zoom>
          <Image
            borderRadius={4}
            mx="auto"
            width="80%"
            src={selected.url}
            alt={selected.filename}
          />
        </Zoom>
      </Box>
      <Box my="2rem">
        <Flex width="80%" mx="auto">
          {photos.map((photo) => {
            return (
              <Box
                key={photo.id}
                onClick={() => setSelected(photo)}
                mx="1rem"
                position="relative"
                cursor="pointer"
              >
                <Image
                  width="120px"
                  height="120px"
                  borderRadius={4}
                  src={photo.url}
                  alt={photo.filename}
                />
                <Box
                  width="100%"
                  height="100%"
                  borderRadius={4}
                  top="0"
                  left="0"
                  bg={selected.id !== photo.id ? 'rgba(0,0,0,0.6)' : 'transparent'}
                  position="absolute"
                ></Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default Carousel;
