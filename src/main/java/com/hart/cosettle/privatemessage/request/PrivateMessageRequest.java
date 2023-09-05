package com.hart.cosettle.privatemessage.request;

public class PrivateMessageRequest {
    private Long userId;
    private Long friendId;
    private String message;

    public PrivateMessageRequest() {

    }

    public PrivateMessageRequest(
            Long userId,
            Long friendId,
            String message) {

        this.userId = userId;
        this.friendId = friendId;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getFriendId() {
        return friendId;
    }

    public String getMessage() {
        return message;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }
}
