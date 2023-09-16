import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AdminGroups from './AdminGroups';
import InviteRequests from './InviteRequests';
import JoinedGroups from './JoinedGroups';
import groupBG from '../../assets/group.png';
import { useContext, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Client } from '../../util/client';
import { IGroup, IPagination, IUserContext } from '../../interfaces';
import { UserContext } from '../../context/user';

interface IMainViewProps {
  switchView: (view: string) => void;
}

const MainView = ({ switchView }: IMainViewProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [searchGroups, setSearchGroups] = useState<IGroup[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 1,
    direction: 'next',
    totalPages: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const goToGroup = (groupId: number) => {
    setSearchGroups([]);
    setSearchTerm('');
    navigate(`/groups/${groupId}/about`);
  };

  const applySearch = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.searchGroups(searchTerm, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { page, pageSize, direction, groups, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
        }));
        if (paginate) {
          setSearchGroups((prevState) => [...prevState, ...groups]);
        } else {
          setSearchGroups(groups);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleOnInputChange, 300);
  }, []);

  useEffect(() => {
    return () => debouncedResults.cancel();
  }, []);

  useEffect(() => {
    applySearch(false);
  }, [searchTerm]);

  const handleRefresh = (r: boolean) => {
    setRefresh(r);
  };
  return (
    <Box p="1rem" color="text.primary">
      <Box as="header" display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h2" fontSize="1.5rem">
          Groups
        </Heading>
        <Box fontSize="1.5rem" cursor="pointer">
          <FiSettings />
        </Box>
      </Box>
      <FormControl position="relative" mt="1rem" mb="2rem">
        <Input
          onChange={debouncedResults}
          pl="2.0rem"
          color="text.primary"
          placeholder="Search groups"
          border="none"
          bg={user.theme === 'dark' ? '#323432' : 'border.primary'}
          borderRadius="20px"
        />
        <Box fontSize="1.2rem" position="absolute" top="10px" left="5px">
          <AiOutlineSearch />
        </Box>
        {searchGroups.length > 0 && searchTerm.length > 0 && (
          <Box
            className="overflow-scroll"
            zIndex={3}
            position="absolute"
            bg="#323432"
            p="1rem"
            top="45px"
            overflowY="auto"
            height="150px"
            width="100%"
            borderRadius={8}
            left="0"
          >
            {searchGroups.map((sg) => {
              return (
                <Flex
                  cursor="pointer"
                  onClick={() => goToGroup(sg.id)}
                  align="center"
                  key={sg.id}
                  my="1rem"
                >
                  <Image
                    src={sg.url ? sg.url : groupBG}
                    width="45px"
                    height="45px"
                    borderRadius={8}
                    alt="search group"
                  />
                  <Text
                    color="light.primary"
                    ml="0.25rem"
                    fontSize="0.9rem"
                    fontWeight="bold"
                  >
                    {sg.name}
                  </Text>
                </Flex>
              );
            })}
            {pagination.page < pagination.totalPages - 1 && (
              <Flex my="1rem" justify="center">
                <Button onClick={() => applySearch(true)} size="sm" colorScheme="purple">
                  See more...
                </Button>
              </Flex>
            )}
          </Box>
        )}
      </FormControl>
      <RouterLink to="/groups/your-groups">
        <Flex p="0.25rem" _hover={{ bg: '#323432' }} alignItems="center" borderRadius={4}>
          <Flex
            flexDir="column"
            justify="center"
            align="center"
            bg="primary.dark"
            borderRadius="50%"
            color="light.primary"
            height="40px"
            width="40px"
            mr="0.5rem"
            fontSize="1.3rem"
          >
            <FaUsers />
          </Flex>
          <Text>Your groups</Text>
        </Flex>
      </RouterLink>
      <RouterLink to="/groups/create">
        <Flex
          onClick={() => switchView('create')}
          bg="rgba(128,90,213, 0.2)"
          borderRadius={4}
          height="35px"
          color="primary.dark"
          fontWeight="bold"
          mt="2rem"
          align="center"
          justifyContent="center"
        >
          <Box mr="0.25rem">
            <AiOutlinePlus />
          </Box>
          <Box>
            <Text fontSize="0.9rem">Create new group</Text>
          </Box>
        </Flex>
      </RouterLink>
      <Box
        borderBottom="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
        my="1rem"
      ></Box>
      <Box my="2rem">
        <InviteRequests handleRefresh={handleRefresh} />
      </Box>
      <Box
        borderBottom="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
        my="1rem"
      ></Box>
      <Box my="2rem">
        <AdminGroups />
      </Box>
      <Box
        borderBottom="1px solid"
        borderColor={user.theme === 'dark' ? 'text.secondary' : 'border.primary'}
        my="1rem"
      ></Box>
      <Box my="2rem">
        <JoinedGroups handleRefresh={handleRefresh} refresh={refresh} />
      </Box>
    </Box>
  );
};

export default MainView;
