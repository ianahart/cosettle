package com.hart.cosettle.user.response;

import com.hart.cosettle.user.dto.ChatUserDto;

public class GetUserResponse {

    private String message;
    private ChatUserDto data;

    public GetUserResponse() {

    }

    public GetUserResponse(String message, ChatUserDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public ChatUserDto getData() {
        return data;
    }

    public void setData(ChatUserDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
