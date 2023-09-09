package com.hart.cosettle.groupmember.response;

import com.hart.cosettle.groupmember.dto.JoinedGroupDto;
import com.hart.cosettle.groupmember.dto.PaginationDto;

public class GetJoinedGroupsResponse {

    private String message;
    private PaginationDto<JoinedGroupDto> data;

    public GetJoinedGroupsResponse() {

    }

    public GetJoinedGroupsResponse(String message, PaginationDto<JoinedGroupDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<JoinedGroupDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<JoinedGroupDto> data) {
        this.data = data;
    }
}
