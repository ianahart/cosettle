package com.hart.cosettle.group.response;

public class CreateGroupResponse {

    private String message;

    public CreateGroupResponse() {

    }

    public CreateGroupResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
