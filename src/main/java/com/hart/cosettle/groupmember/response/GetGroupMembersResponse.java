package com.hart.cosettle.groupmember.response;

import com.hart.cosettle.groupmember.dto.GroupMemberDto;
import com.hart.cosettle.groupmember.dto.PaginationDto;

public class GetGroupMembersResponse {

    private String message;
    private PaginationDto<GroupMemberDto> data;

    public GetGroupMembersResponse() {

    }

    public GetGroupMembersResponse(String message, PaginationDto<GroupMemberDto> data) {
        this.message = message;
        this.data = data;
    }

    public PaginationDto<GroupMemberDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PaginationDto<GroupMemberDto> data) {
        this.data = data;
    }
}
