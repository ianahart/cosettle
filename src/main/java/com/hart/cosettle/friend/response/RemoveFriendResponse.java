package com.hart.cosettle.friend.response;

public class RemoveFriendResponse {
    private String message;

    public RemoveFriendResponse() {

    }

    public RemoveFriendResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
