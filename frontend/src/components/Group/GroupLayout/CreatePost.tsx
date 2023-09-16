import {
  Box,
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  Input,
  Tooltip,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import Avatar from '../../Shared/Avatar';
import { BsImage } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

interface ICreatePostProps {
  handleCreatePost: (content: string, file: File | null) => void;
  createPostError: string;
}

const CreatePost = ({ handleCreatePost, createPostError }: ICreatePostProps) => {
  const MAX_MEGA_BYTES = 2 * 1024 * 1024;
  const { user } = useContext(UserContext) as IUserContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dataURL, setDataURL] = useState('');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const readFile = (newFile: File) => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        const url = reader.result as string;
        setDataURL(url);
      },
      false
    );
    reader.readAsDataURL(newFile);
    setFile(newFile);
  };

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0].size > MAX_MEGA_BYTES) {
      setError('A post photo cannot exceed 2MB');
      return;
    }
    readFile(e.target.files[0]);
  };

  const cancelPost = () => {
    resetFile();
    setContent('');
    onClose();
  };

  const createPost = () => {
    setError('');
    if (content.trim().length === 0 || content.length > 300) {
      setError('Post must be between 1 and 300 characters');
      return;
    }
    handleCreatePost(content, file);
    resetFile();
    setContent('');
    onClose();
  };

  const resetFile = () => {
    setFile(null);
    setDataURL('');
  };

  return (
    <Box
      onClick={onOpen}
      bg={user.theme === 'dark' ? 'black.tertiary' : 'gray'}
      cursor="pointer"
      borderRadius={8}
      p="0.5rem"
    >
      {createPostError.length > 0 && (
        <Flex my="1rem" justify="center">
          <Text color="red.400" fontSize="0.85rem">
            {createPostError}
          </Text>
        </Flex>
      )}
      <Flex align="center">
        <Avatar
          width="45px"
          height="45px"
          firstName={user.firstName}
          lastName={user.lastName}
          url={user.avatarUrl}
        />
        <Box ml="0.5rem" width="90%">
          <Flex
            pl="0.5rem"
            align="center"
            minH="40px"
            bg={user.theme === 'dark' ? '#161515' : 'border.primary'}
            border="none"
            borderRadius={20}
            width="100%"
          >
            <Text fontSize="0.9rem">What's on your mind, {user.firstName}?</Text>
          </Flex>
        </Box>
      </Flex>
      <Box
        borderBottom="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
        mt="1rem"
        mb="0.5rem"
      ></Box>
      <Flex align="center" justify="center">
        <Box>
          <BsImage />
        </Box>
        <Box ml="0.5rem">
          <Text fontSize="0.9rem">Photo</Text>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={user.theme === 'dark' ? 'black.tertiary' : 'border.primary'}
          color="text.primary"
        >
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex my="1.2rem" align="center">
              <Avatar
                width="45px"
                height="45px"
                firstName={user.firstName}
                lastName={user.lastName}
                url={user.avatarUrl}
              />
              <Text ml="0.5rem" fontSize="0.9rem">
                {user.firstName} {user.lastName}
              </Text>
            </Flex>
            {error.length > 0 && (
              <Flex my="1rem" justify="center">
                <Text fontSize="0.85rem" color="red.400">
                  {error}
                </Text>
              </Flex>
            )}

            <Box>
              <Textarea
                fontSize="0.9rem"
                value={content}
                onChange={handleTextareaChange}
                _placeholder={{ fontSize: '0.9rem' }}
                border="none"
                resize="none"
                placeholder="Write a post..."
              />
              {dataURL.length > 0 && (
                <Flex justify="center">
                  <Box position="relative">
                    <Image
                      height="80px"
                      borderRadius={8}
                      width="120px"
                      src={dataURL}
                      alt={file?.name}
                    />
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      borderRadius={8}
                      width="120px"
                      height="80px"
                      bg="rgba(0, 0, 0, 0.6)"
                    >
                      <Flex justify="flex-end" color="light.primary">
                        <Tooltip label="Remove">
                          <Flex
                            onClick={resetFile}
                            cursor="pointer"
                            bg="primary.dark"
                            height="30px"
                            width="30px"
                            borderRadius="50%"
                            flexDir="column"
                            align="center"
                            justify="center"
                          >
                            <AiOutlineClose />
                          </Flex>
                        </Tooltip>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              )}
            </Box>
            <Box
              my="1rem"
              borderBottom="1px solid"
              borderColor={user.theme === 'dark' ? 'text.secondary' : 'transparent'}
            ></Box>

            <Flex position="relative" align="center" justify="center">
              <Box>
                <BsImage />
              </Box>
              <Box ml="0.5rem">
                <Text fontSize="0.9rem">Photo</Text>
              </Box>
              <Input
                onChange={handleOnFileChange}
                cursor="pointer"
                type="file"
                position="absolute"
                zIndex={10}
                opacity="0"
                top="0"
                left="0"
              />
            </Flex>
          </ModalBody>
          <ModalFooter display="flex" flexDir="column" justifyContent="center">
            <Button
              my="0.25rem"
              width="100%"
              onClick={createPost}
              size="sm"
              colorScheme="purple"
            >
              Create
            </Button>
            <Button my="0.25rem" width="100%" size="sm" onClick={cancelPost}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreatePost;
