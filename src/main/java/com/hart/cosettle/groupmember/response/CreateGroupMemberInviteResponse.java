package com.hart.cosettle.groupmember.response;

public class CreateGroupMemberInviteResponse {

    private String message;

    public CreateGroupMemberInviteResponse() {

    }

    public CreateGroupMemberInviteResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
