package com.hart.cosettle.groupmember.response;

public class UpdateGroupMemberResponse {

    private String message;

    public UpdateGroupMemberResponse() {

    }

    public UpdateGroupMemberResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
