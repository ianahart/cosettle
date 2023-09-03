package com.hart.cosettle.friend;

import com.hart.cosettle.friend.response.DeleteFriendRequestResponse;
import com.hart.cosettle.friend.response.GetFriendRequestsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/friends")
public class FriendController {

    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteFriendRequestResponse> deleteFriendRequest(@PathVariable("id") Long id) {
        this.friendService.deleteFriendRequest(id);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteFriendRequestResponse("success"));
    }

    @GetMapping("/requests")
    public ResponseEntity<GetFriendRequestsResponse> getFriendRequests(
            @RequestParam("userId") Long userId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetFriendRequestsResponse("success",
                this.friendService.getFriendRequests(userId, page, pageSize, direction)));
    }
}
