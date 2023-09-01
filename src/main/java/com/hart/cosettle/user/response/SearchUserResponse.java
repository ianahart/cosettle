package com.hart.cosettle.user.response;

import com.hart.cosettle.user.dto.UserPaginationDto;

public class SearchUserResponse {
    private String message;
    private UserPaginationDto data;

    public SearchUserResponse() {

    }

    public SearchUserResponse(String message, UserPaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public UserPaginationDto getData() {
        return data;
    }

    public void setData(UserPaginationDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
