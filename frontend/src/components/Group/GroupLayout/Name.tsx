import { Box, Button, ButtonGroup, Flex, Input, Text } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IGroup, IUserContext } from '../../../interfaces';

interface INameProps {
  preview: boolean;
  group: IGroup;
  handleUpdateName: (groupName: string) => void;
}

const Name = ({ preview, group, handleUpdateName }: INameProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const inputRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [isInputShowing, setisInputShowing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const resetInput = () => {
    setInputValue('');
    setisInputShowing(false);
  };

  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (inputRef.current !== null && nameRef.current !== null) {
        if (!inputRef.current.contains(target) && !nameRef.current.contains(target)) {
          resetInput();
        }
      }
    },
    [resetInput]
  );

  useEffect(() => {
    document.addEventListener('click', clickAway);
    return () => document.removeEventListener('click', clickAway);
  }, [clickAway]);

  const cancel = () => {
    resetInput();
  };

  const updateName = () => {
    handleUpdateName(inputValue);
    resetInput();
  };

  return (
    <Box my="1.5rem">
      <Text
        ref={nameRef}
        onClick={() => setisInputShowing(true)}
        cursor="pointer"
        mb="0.5rem"
        color="text.primary"
        fontSize="1.3rem"
        fontWeight="bold"
      >
        {group.name}
      </Text>
      {isInputShowing && !preview && group.adminId === user.id && (
        <Flex ref={inputRef} align="center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            color="text.primary"
            bg="#161515"
            border="none"
            mr="0.25rem"
          />
          <ButtonGroup>
            <Button onClick={updateName} size="sm" colorScheme="purple">
              Update
            </Button>
            <Button onClick={cancel} size="sm">
              Cancel
            </Button>
          </ButtonGroup>
        </Flex>
      )}
      <Box
        mb="1rem"
        mt="1rem"
        borderBottom="1px solid"
        borderColor="text.secondary"
      ></Box>
    </Box>
  );
};

export default Name;
