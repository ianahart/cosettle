package com.hart.cosettle.groupmessage.response;

import java.util.List;

import com.hart.cosettle.groupmessage.dto.GroupMessageDto;

public class GetGroupMessageResponse {

    private String message;
    private List<GroupMessageDto> data;

    public GetGroupMessageResponse() {

    }

    public GetGroupMessageResponse(String message, List<GroupMessageDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<GroupMessageDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<GroupMessageDto> data) {
        this.data = data;
    }
}
