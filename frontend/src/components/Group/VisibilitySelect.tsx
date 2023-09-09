import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { BsChevronDown } from 'react-icons/bs';
import { RiEarthFill } from 'react-icons/ri';
import { AiFillLock } from 'react-icons/ai';

interface IVisibilitySelectProps {
  handleVisibility: (curPrivacy: string) => void;
  privacy: string;
}

const VisibilitySelect = ({ handleVisibility, privacy }: IVisibilitySelectProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;

      if (menuRef.current !== null && triggerRef.current !== null) {
        if (!menuRef.current.contains(target) && !triggerRef.current.contains(target)) {
          setDropdownOpen(false);
        }
      }
    },
    [setDropdownOpen]
  );

  useEffect(() => {
    document.addEventListener('click', clickAway);

    return () => document.removeEventListener('click', clickAway);
  }, [clickAway]);

  return (
    <Box>
      <Flex
        ref={triggerRef}
        position="relative"
        onClick={() => setDropdownOpen(true)}
        justify="space-between"
        align="center"
        cursor="pointer"
        p="0.25rem"
        height="40px"
        borderRadius={4}
        border="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
      >
        <Text>{privacy.length > 0 ? privacy : 'Choose privacy'}</Text>
        <Box>
          <BsChevronDown />
        </Box>
        {dropdownOpen && (
          <Box
            ref={menuRef}
            zIndex={10}
            width="100%"
            position="absolute"
            bg="#323432"
            minH="120px"
            p="0.25rem"
            fontSize="0.75rem"
            borderRadius={4}
            top="40px"
            left="0"
          >
            <Box>
              <Flex
                onClick={() => handleVisibility('public')}
                my="0.25rem"
                _hover={{ bg: 'black.tertiary' }}
              >
                <Flex
                  height={['35px', '35px', '35px']}
                  width={['35px', '35px', '60px']}
                  flexDir="column"
                  justify="center"
                  borderRadius="50%"
                  align="center"
                  mx="0.25rem"
                  bg="black.tertiary"
                  fontSize="1.3rem"
                >
                  <RiEarthFill />
                </Flex>
                <Box>
                  <Text>Public</Text>
                  <Text>Anyone can see who's in the group and what they post.</Text>
                </Box>
              </Flex>
              <Flex
                onClick={() => handleVisibility('private')}
                my="0.25rem"
                _hover={{ bg: 'black.tertiary' }}
              >
                <Flex
                  height={['35px', '35px', '35px']}
                  width={['35px', '35px', '60px']}
                  flexDir="column"
                  justify="center"
                  borderRadius="50%"
                  align="center"
                  mx="0.25rem"
                  bg="black.tertiary"
                  fontSize="1.3rem"
                >
                  <AiFillLock />
                </Flex>
                <Box>
                  <Text>Private</Text>
                  <Text>Only members can see who's in the group and what they post.</Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default VisibilitySelect;
