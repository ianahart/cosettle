package com.hart.cosettle.group.response;

import com.hart.cosettle.group.dto.GroupDto;

public class GetGroupResponse {

    private String message;
    private GroupDto data;

    public GetGroupResponse() {

    }

    public GetGroupResponse(String message, GroupDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public GroupDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(GroupDto data) {
        this.data = data;
    }
}
