package com.hart.cosettle.friend;

import com.hart.cosettle.friend.request.AcceptFriendRequestRequest;
import com.hart.cosettle.friend.request.RemoveFriendRequest;
import com.hart.cosettle.friend.response.AcceptFriendRequestResponse;
import com.hart.cosettle.friend.response.DeleteFriendRequestResponse;
import com.hart.cosettle.friend.response.GetFriendRequestsResponse;
import com.hart.cosettle.friend.response.GetFriendsResponse;
import com.hart.cosettle.friend.response.RemoveFriendResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/remove-friend")
    public ResponseEntity<RemoveFriendResponse> removeFriend(@RequestBody RemoveFriendRequest request) {
        this.friendService.removeFriend(request.getUserId(), request.getFriendId());
        return ResponseEntity.status(HttpStatus.OK).body(new RemoveFriendResponse("success"));
    }

    @PostMapping("/requests")
    public ResponseEntity<AcceptFriendRequestResponse> acceptFriendRequest(
            @RequestBody AcceptFriendRequestRequest request) {
        this.friendService.acceptFriendRequest(request.getId(), request.getUserId(), request.getFriendId());
        return ResponseEntity.status(HttpStatus.OK).body(new AcceptFriendRequestResponse("success"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteFriendRequestResponse> deleteFriendRequest(@PathVariable("id") Long id) {
        this.friendService.deleteFriendRequest(id);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteFriendRequestResponse("success"));
    }

    @GetMapping("")
    public ResponseEntity<GetFriendsResponse> getFriends(
            @RequestParam("userId") Long userId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new GetFriendsResponse("success", this.friendService.getFriends(userId, page, pageSize, direction)));
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
