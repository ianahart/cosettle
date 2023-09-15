package com.hart.cosettle.group.response;

import com.hart.cosettle.group.dto.GroupDto;
import com.hart.cosettle.group.dto.GroupWithMemberDto;

public class GetGroupResponse {

    private String message;
    private GroupWithMemberDto data;

    public GetGroupResponse() {

    }

    public GetGroupResponse(String message, GroupWithMemberDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public GroupWithMemberDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(GroupWithMemberDto data) {
        this.data = data;
    }
}
