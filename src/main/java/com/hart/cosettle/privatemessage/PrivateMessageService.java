package com.hart.cosettle.privatemessage;

import com.hart.cosettle.privatemessage.request.PrivateMessageRequest;
import com.hart.cosettle.privatemessage.dto.FullPrivateMessageDto;
import com.hart.cosettle.privatemessage.dto.PrivateMessageDto;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;

import java.util.List;

import com.hart.cosettle.advice.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrivateMessageService {

    private final PrivateMessageRepository privateMessageRepository;
    private final UserService userService;

    @Autowired
    public PrivateMessageService(PrivateMessageRepository privateMessageRepository, UserService userService) {
        this.privateMessageRepository = privateMessageRepository;
        this.userService = userService;
    }

    public List<FullPrivateMessageDto> getPrivateMessages(Long userId, Long friendId) {
        if (userId == null || friendId == null) {
            throw new BadRequestException("Missing user ids");
        }

        return this.privateMessageRepository.getPrivateMessages(friendId, userId);
    }

    public FullPrivateMessageDto getPrivateMessage(PrivateMessageRequest privateMessage, Long id) {
        return this.privateMessageRepository.getPrivateMessage(privateMessage.getUserId(),
                privateMessage.getFriendId(), id);
    }

    public Long createPrivateMessage(PrivateMessageRequest privateMessage) {
        if (privateMessage.getUserId() == null || privateMessage.getFriendId() == null) {
            throw new BadRequestException("Missing user ids");
        }
        User sender = this.userService.getUserById(privateMessage.getUserId());
        User receiver = this.userService.getUserById(privateMessage.getFriendId());

        PrivateMessage pm = this.privateMessageRepository
                .save(new PrivateMessage(privateMessage.getMessage(), sender, receiver));
        return pm.getId();

    }
}
