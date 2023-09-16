package com.hart.cosettle.user.response;

import com.hart.cosettle.user.dto.MinimalUserDto;
import com.hart.cosettle.user.dto.UserPaginationDto;

public class SearchUsersByNameResponse {

    private String message;
    private UserPaginationDto<MinimalUserDto> data;

    public SearchUsersByNameResponse() {

    }

    public SearchUsersByNameResponse(String message, UserPaginationDto<MinimalUserDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserPaginationDto<MinimalUserDto> getData() {
        return data;
    }

    public void setData(UserPaginationDto<MinimalUserDto> data) {
        this.data = data;
    }
}
