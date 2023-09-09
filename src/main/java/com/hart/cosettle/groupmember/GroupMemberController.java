package com.hart.cosettle.groupmember;

import com.hart.cosettle.groupmember.request.UpdateGroupMemberRequest;
import com.hart.cosettle.groupmember.response.DeleteGroupMemberResponse;
import com.hart.cosettle.groupmember.response.GetGroupMemberInvitesResponse;
import com.hart.cosettle.groupmember.response.UpdateGroupMemberResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/group-members")
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    @Autowired
    public GroupMemberController(GroupMemberService groupMemberService) {
        this.groupMemberService = groupMemberService;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UpdateGroupMemberResponse> updateGroupMember(@PathVariable("id") Long id,
            @RequestBody UpdateGroupMemberRequest request) {
        this.groupMemberService.updateGroupMember(id, request.getAccepted());
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateGroupMemberResponse("success"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteGroupMemberResponse> deleteGroupMember(@PathVariable("id") Long id) {
        this.groupMemberService.deleteGroupMember(id);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteGroupMemberResponse("success"));
    }

    @GetMapping("/invites")
    public ResponseEntity<GetGroupMemberInvitesResponse> getInvites(
            @RequestParam("userId") Long userId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetGroupMemberInvitesResponse("success",
                        this.groupMemberService.getInvites(userId, page, pageSize, direction)));
    }
}
