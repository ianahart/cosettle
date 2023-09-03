package com.hart.cosettle.friend.response;

public class AcceptFriendRequestResponse {
    private String message;

    public AcceptFriendRequestResponse() {

    }

    public AcceptFriendRequestResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
