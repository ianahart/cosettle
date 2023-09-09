package com.hart.cosettle.user.response;

import com.hart.cosettle.user.dto.SearchUserDto;
import com.hart.cosettle.user.dto.UserPaginationDto;

public class SearchUserResponse {
    private String message;
    private UserPaginationDto<SearchUserDto> data;

    public SearchUserResponse() {

    }

    public SearchUserResponse(String message, UserPaginationDto<SearchUserDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public UserPaginationDto<SearchUserDto> getData() {
        return data;
    }

    public void setData(UserPaginationDto<SearchUserDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
