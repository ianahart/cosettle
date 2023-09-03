package com.hart.cosettle.friend.request;

public class AcceptFriendRequestRequest {
    private Long id;
    private Long userId;
    private Long friendId;

    public AcceptFriendRequestRequest() {

    }

    public AcceptFriendRequestRequest(Long id, Long userId, Long friendId) {
        this.id = id;
        this.userId = userId;
        this.friendId = friendId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }
}
