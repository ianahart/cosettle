package com.hart.cosettle.groupmember.request;

public class UpdateGroupMemberRequest {

    private Boolean accepted;

    public UpdateGroupMemberRequest() {
    }

    public UpdateGroupMemberRequest(Boolean accepted) {
        this.accepted = accepted;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }
}
