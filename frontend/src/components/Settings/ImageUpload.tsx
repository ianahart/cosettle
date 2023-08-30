import { Box, Button, Text, Flex, Input } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Client } from '../../util/client';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import BasicSpinner from '../Shared/BasicSpinner';

const ImageUpload = () => {
  const { user, updateUser } = useContext(UserContext) as IUserContext;
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadProfilePhoto = (file: File) => {
    setLoading(true);
    Client.uploadProfilePhoto(file, user.profileId, 'add')
      .then((res) => {
        updateUser({ ...user, avatarUrl: res.data.avatarUrl });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const removeProfilePhoto = () => {
    setLoading(true);
    Client.uploadProfilePhoto(file, user.profileId, 'remove')
      .then((res) => {
        updateUser({ ...user, avatarUrl: res.data.avatarUrl });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      setError('Please keep profile picture under 2 MB');
      return;
    }
    setFile(file);
    uploadProfilePhoto(file);
  };

  return (
    <Box ml="auto" mb="2rem">
      <Flex as="header" my="2rem" flexDir="column" align="end">
        <Text>Change your profile picture</Text>
        <Text fontSize="0.8rem">It'll be updated updated across your account.</Text>
      </Flex>
      <Box>
        <Flex>
          <Box>
            <Flex
              justifyContent="center"
              align="center"
              flexDir="column"
              backgroundImage={user.avatarUrl ? `url(${user.avatarUrl})` : 'unset'}
              backgroundPosition="center"
              backgroundSize="cover"
              my="1rem"
              borderRadius="50%"
              border="2px solid"
              borderColor="primary.dark"
              height="150px"
              width="150px"
            >
              {user.avatarUrl === null && (
                <Box fontSize="7rem">
                  <AiOutlineUser />
                </Box>
              )}
            </Flex>
            {error.length > 0 && (
              <Box m="0.5rem">
                <Text fontSize="0.8rem" color="red.400">
                  {error}
                </Text>
              </Box>
            )}

            {loading && (
              <Flex justify="center" my="2rem">
                <BasicSpinner color="" message="Uploading photo..." />
              </Flex>
            )}
            <Box position="relative">
              <Button mx="0.25rem" my={['0.5rem', '0', '0']} colorScheme="purple">
                Upload picture
              </Button>
              <Input
                onChange={handleOnFileChange}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                type="file"
                opacity={0}
              />
              <Button
                onClick={removeProfilePhoto}
                mx="0.25rem"
                my={['0.5rem', '0', '0']}
                colorScheme="purple"
              >
                Remove picture
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default ImageUpload;
