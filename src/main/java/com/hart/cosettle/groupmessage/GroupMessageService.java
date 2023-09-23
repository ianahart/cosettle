package com.hart.cosettle.groupmessage;

import java.util.List;

import com.hart.cosettle.group.Group;
import com.hart.cosettle.group.GroupService;
import com.hart.cosettle.groupmessage.dto.GroupMessageDto;
import com.hart.cosettle.groupmessage.request.GroupMessageRequest;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupMessageService {

    private final UserService userService;
    private final GroupService groupService;
    private final GroupMessageRepository groupMessageRepository;

    @Autowired
    public GroupMessageService(
            UserService userService,
            GroupService groupService,
            GroupMessageRepository groupMessageRepository) {
        this.userService = userService;
        this.groupService = groupService;
        this.groupMessageRepository = groupMessageRepository;
    }

    public GroupMessageDto getGroupMessage(Long id) {
        return this.groupMessageRepository.getGroupMessage(id);
    }

    public List<GroupMessageDto> getGroupMessages(Long groupId) {
        return this.groupMessageRepository.getGroupMessages(groupId);
    }

    public Long createGroupMessage(GroupMessageRequest request) {
        User user = this.userService.getUserById(request.getUserId());
        Group group = this.groupService.getGroupById(request.getGroupId());

        GroupMessage groupMessage = new GroupMessage(user, group, request.getMessage());

        this.groupMessageRepository.save(groupMessage);

        return groupMessage.getId();
    }
}
