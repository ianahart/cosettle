package com.hart.cosettle.groupmessage;

import com.hart.cosettle.groupmessage.response.GetGroupMessageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/group-messages")
public class GroupMessageController {

    private final GroupMessageService groupMessageService;

    @Autowired
    public GroupMessageController(GroupMessageService groupMessageService) {
        this.groupMessageService = groupMessageService;
    }

    @GetMapping("")
    public ResponseEntity<GetGroupMessageResponse> getGroupMessages(@RequestParam("groupId") Long groupId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetGroupMessageResponse("success", this.groupMessageService.getGroupMessages(groupId)));
    }

}
