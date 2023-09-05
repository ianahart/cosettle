package com.hart.cosettle.privatemessage;

import com.hart.cosettle.privatemessage.response.GetPrivateMessagesResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private-messages")
public class PrivateMessageController {

    private final PrivateMessageService privateMessageService;

    @Autowired
    public PrivateMessageController(PrivateMessageService privateMessageService) {
        this.privateMessageService = privateMessageService;
    }

    @GetMapping("")
    public ResponseEntity<GetPrivateMessagesResponse> getPrivateMessages(@RequestParam("userId") Long userId,
            @RequestParam("friendId") Long friendId) {
        return ResponseEntity.status(HttpStatus.OK).body(new GetPrivateMessagesResponse("success",
                this.privateMessageService.getPrivateMessages(userId, friendId)));
    }
}
