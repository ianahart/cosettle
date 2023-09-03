package com.hart.cosettle.friend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import com.hart.cosettle.friend.request.FriendRequestRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class FriendRequestWebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final FriendService friendService;

    @Autowired
    public FriendRequestWebSocketController(SimpMessagingTemplate simpMessagingTemplate, FriendService friendService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.friendService = friendService;
    }

    @MessageMapping("friend-request")
    public void receiveFriendRequest(@Payload FriendRequestRequest friendRequest) {
        this.friendService.createFriendRequest(friendRequest);
        this.simpMessagingTemplate.convertAndSendToUser(
                String.valueOf(friendRequest.getFriendId()), "friend-request",
                        this.friendService.getFriendRequest(friendRequest));
    }
}
