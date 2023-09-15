package com.hart.cosettle.group.response;

import com.hart.cosettle.group.dto.GroupDto;
import com.hart.cosettle.group.dto.GroupPaginationDto;

public class SearchGroupResponse {
    private String message;
    private GroupPaginationDto<GroupDto> data;

    public SearchGroupResponse() {

    }

    public SearchGroupResponse(String message, GroupPaginationDto<GroupDto> data) {
        this.message = message;
        this.data = data;
    }

    public GroupPaginationDto<GroupDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(GroupPaginationDto<GroupDto> data) {
        this.data = data;
    }
}
