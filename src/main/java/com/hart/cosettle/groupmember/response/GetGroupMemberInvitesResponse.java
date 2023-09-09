package com.hart.cosettle.groupmember.response;

import com.hart.cosettle.groupmember.dto.InviteDto;
import com.hart.cosettle.groupmember.dto.PaginationDto;

public class GetGroupMemberInvitesResponse {

    private String message;
    private PaginationDto<InviteDto> data;

    public GetGroupMemberInvitesResponse() {

    }

    public GetGroupMemberInvitesResponse(String message,
            PaginationDto<InviteDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<InviteDto> getData() {
        return data;
    }

    public void setData(PaginationDto<InviteDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
