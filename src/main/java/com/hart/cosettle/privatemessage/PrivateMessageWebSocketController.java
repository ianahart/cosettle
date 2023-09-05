package com.hart.cosettle.privatemessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import com.hart.cosettle.friend.request.FriendRequestRequest;
import com.hart.cosettle.privatemessage.dto.FullPrivateMessageDto;
import com.hart.cosettle.privatemessage.dto.PrivateMessageDto;
import com.hart.cosettle.privatemessage.request.PrivateMessageRequest;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class PrivateMessageWebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PrivateMessageService privateMessageService;

    @Autowired
    public PrivateMessageWebSocketController(SimpMessagingTemplate simpMessagingTemplate,
            PrivateMessageService privateMessageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.privateMessageService = privateMessageService;
    }

    @MessageMapping("private-message")
    public void receiveFriendRequest(@Payload PrivateMessageRequest privateMessage) {
        Long id = this.privateMessageService.createPrivateMessage(privateMessage);
        FullPrivateMessageDto privateMessageEntity = this.privateMessageService.getPrivateMessage(privateMessage, id);

        this.simpMessagingTemplate.convertAndSendToUser(String.valueOf(privateMessage.getUserId()), "private",
                privateMessageEntity);
        this.simpMessagingTemplate.convertAndSendToUser(String.valueOf(privateMessage.getFriendId()), "private",
                privateMessageEntity);
    }
}
