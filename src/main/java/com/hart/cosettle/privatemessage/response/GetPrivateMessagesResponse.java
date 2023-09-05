package com.hart.cosettle.privatemessage.response;

import java.util.List;

import com.hart.cosettle.privatemessage.dto.FullPrivateMessageDto;

public class GetPrivateMessagesResponse {
    private String message;
    private List<FullPrivateMessageDto> data;

    public GetPrivateMessagesResponse() {

    }

    public GetPrivateMessagesResponse(String message, List<FullPrivateMessageDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public List<FullPrivateMessageDto> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(List<FullPrivateMessageDto> data) {
        this.data = data;
    }
}
