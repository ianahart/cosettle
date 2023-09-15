import { useNavigate } from 'react-router-dom';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import groupBG from '../../assets/group.png';
import { IGroup } from '../../interfaces';

// @ts-ignore
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

interface IGroupPreviewProps {
  adminGroup: IGroup;
  joined: boolean;
}

const GroupPreview = ({ adminGroup, joined }: IGroupPreviewProps) => {
  const navigate = useNavigate();

  const goToGroup = (id: number) => {
    navigate(`/groups/${id}/about`);
  };

  return (
    <Box
      _hover={{ bg: '#161515' }}
      cursor="pointer"
      onClick={() => goToGroup(adminGroup.id)}
      my="1rem"
      p="0.5rem"
    >
      <Flex align="center">
        <Image
          height="45px"
          width="45px"
          borderRadius={8}
          src={adminGroup.url ? adminGroup.url : groupBG}
        />
        <Text ml="0.5rem" fontWeight="bold">
          {adminGroup.name}
        </Text>
      </Flex>
      {!joined && (
        <Text mt="0.25rem" fontSize="0.7rem">
          Created {dayjs(adminGroup.createdAt).format('L')}
        </Text>
      )}
    </Box>
  );
};

export default GroupPreview;
