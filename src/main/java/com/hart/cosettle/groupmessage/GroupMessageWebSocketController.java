package com.hart.cosettle.groupmessage;

import java.util.List;

import com.hart.cosettle.group.GroupService;
import com.hart.cosettle.groupmember.GroupMemberService;
import com.hart.cosettle.groupmessage.dto.GroupMessageDto;
import com.hart.cosettle.groupmessage.request.GroupMessageRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GroupMessageWebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final GroupMessageService groupMessageService;
    private final GroupMemberService groupMemberService;
    private final GroupService groupService;

    @Autowired
    public GroupMessageWebSocketController(
            SimpMessagingTemplate simpMessagingTemplate,
            GroupMessageService groupMessageService,
            GroupMemberService groupMemberService,
            GroupService groupService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.groupMessageService = groupMessageService;
        this.groupMemberService = groupMemberService;
        this.groupService = groupService;
    }

    @MessageMapping("chat-group")
    public void receiveFriendRequest(@Payload GroupMessageRequest request) {
        Long id = this.groupMessageService.createGroupMessage(request);
        GroupMessageDto groupMessage = this.groupMessageService.getGroupMessage(id);
        List<Long> groupMemberUserIds = this.groupMemberService.getGroupMemberUserIds(request.getGroupId());
        groupMemberUserIds.add(this.groupService.getAdminByGroupId(request.getGroupId()));

        for (Long groupMemberUserId : groupMemberUserIds) {
            if (groupMemberUserId != request.getUserId()) {
                this.simpMessagingTemplate.convertAndSendToUser(
                        String.valueOf(groupMemberUserId),
                        "group",
                        groupMessage);

            }
        }

        this.simpMessagingTemplate.convertAndSendToUser(
                String.valueOf(groupMessage.getUserId()),
                "group",
                groupMessage);
    }

}
