import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { ICustomSelectData, IUserContext } from '../../interfaces';
import { BsChevronDown } from 'react-icons/bs';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { UserContext } from '../../context/user';

interface ICustomSelectProps {
  data: ICustomSelectData[];
  type: string;
  saveValue: (value: string, type: string) => void;
  filterOutCities?: (value: string) => void;
  value: string;
}

const CustomSelect = ({
  value,
  data,
  type,
  saveValue,
  filterOutCities,
}: ICustomSelectProps) => {
  const { user, nonAuthTheme } = useContext(UserContext) as IUserContext;
  const [selected, setSelected] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.includes('_')) {
      const [w1, w2] = value.split('_');
      setSelected(
        w1.slice(0, 1).toUpperCase() +
          w1.slice(1) +
          ' ' +
          w2.slice(0, 1).toUpperCase() +
          w2.slice(1)
      );
      return;
    }
    setSelected(value);
  }, [value]);

  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (menuRef.current !== null && triggerRef.current !== null) {
        if (!triggerRef.current.contains(target)) {
          setDropdownOpen(false);
        }
      }
    },
    [setDropdownOpen]
  );

  useEffect(() => {
    window.addEventListener('click', clickAway);
    return () => window.removeEventListener('click', clickAway);
  }, [clickAway]);

  const selectValue = (
    e: React.MouseEvent<HTMLDivElement>,
    value: string,
    name: string
  ) => {
    e.stopPropagation();
    setSelected(name);
    setDropdownOpen(false);
    saveValue(value, type);
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    if (filterOutCities !== undefined) {
      filterOutCities(e.target.value);
    }
  };

  return (
    <Box
      p="1rem"
      ref={triggerRef}
      onClick={() => setDropdownOpen(true)}
      color={
        user.theme === 'dark' || nonAuthTheme === 'dark'
          ? 'light.primary'
          : 'text.primary'
      }
      cursor="pointer"
      width="250px"
      border="1px solid"
      borderRadius={8}
      borderColor={
        user.theme === 'dark' || nonAuthTheme === 'dark'
          ? 'text.secondary'
          : 'border.primary'
      }
      minH="40px"
      position="relative"
    >
      <Flex align="center" justify="space-between">
        {type === 'cities' ? (
          <Input
            _focus={{ boxShadow: 'none !important' }}
            onChange={handleOnInputChange}
            height="25px"
            border="none"
            value={selected}
          />
        ) : (
          <Text>{selected}</Text>
        )}
        <Box>
          <BsChevronDown />
        </Box>
      </Flex>
      {dropdownOpen && (
        <Box
          position="absolute"
          className="overflow-scroll"
          height="400px"
          zIndex={3}
          overflowY="auto"
          ref={menuRef}
          top="60px"
          boxShadow="rgba(0, 0, 0, 0.5) 0px 1px 4px"
          borderRadius={8}
          left="0"
          bg={
            user.theme === 'dark' || nonAuthTheme === 'dark'
              ? '#161515'
              : 'border.primary'
          }
        >
          {data.map((item) => {
            return (
              <Flex
                onClick={(e) => selectValue(e, item.value, item.name)}
                _hover={{ bg: 'primary.dark' }}
                width="250px"
                key={item.id}
                cursor="pointer"
                p="0.25rem"
                my="0.5rem"
                align="center"
              >
                {selected === item.name && (
                  <Box
                    mr="0.25rem"
                    color={
                      item.name === selected
                        ? 'primary.dark'
                        : user.theme === 'dark' || nonAuthTheme === 'dark'
                        ? 'light.primary'
                        : 'text.primary'
                    }
                  >
                    <AiOutlineCheck />
                  </Box>
                )}
                <Text
                  color={
                    item.name === selected
                      ? 'primary.dark'
                      : user.theme === 'dark' || nonAuthTheme === 'dark'
                      ? 'light.primary'
                      : 'text.primary'
                  }
                  fontSize="0.9rem"
                >
                  {item.name}
                </Text>
              </Flex>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CustomSelect;
