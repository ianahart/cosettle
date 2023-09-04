package com.hart.cosettle.friend.request;

public class RemoveFriendRequest {
    private Long userId;
    private Long friendId;

    public RemoveFriendRequest() {

    }

    public RemoveFriendRequest(Long userId, Long friendId) {
        this.userId = userId;
        this.friendId = friendId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }
}
