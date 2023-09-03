package com.hart.cosettle.friend.response;

public class DeleteFriendRequestResponse {
    private String message;

    public DeleteFriendRequestResponse() {

    }

    public DeleteFriendRequestResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
