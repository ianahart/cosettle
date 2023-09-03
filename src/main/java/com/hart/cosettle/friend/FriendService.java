package com.hart.cosettle.friend;

import com.hart.cosettle.friend.dto.FriendRequestDto;
import com.hart.cosettle.friend.request.FriendRequestRequest;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendService {

    private final UserService userService;
    private final FriendRepository friendRepository;

    @Autowired
    public FriendService(UserService userService, FriendRepository friendRepository) {
        this.userService = userService;
        this.friendRepository = friendRepository;
    }

    public FriendRequestDto getFriendRequest(FriendRequestRequest friendRequest) {
        return this.friendRepository.getFriendRequest(friendRequest.getUserId(), friendRequest.getFriendId());
    }

    private Boolean negateDuplicateFriendRequest(Long userId, Long friendId) {
        return this.friendRepository.duplicateFriendRequest(userId, friendId);
    }

    public void createFriendRequest(FriendRequestRequest friendRequest) {
        User user = this.userService.getUserById(friendRequest.getUserId());
        User friend = this.userService.getUserById(friendRequest.getFriendId());

        if (!negateDuplicateFriendRequest(user.getId(), friend.getId())) {
            this.friendRepository.save(new Friend(user, friend, true, false));
        }
    }
}
