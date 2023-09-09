package com.hart.cosettle.user.response;

import com.hart.cosettle.user.dto.MinimalUserDto;
import com.hart.cosettle.user.dto.UserPaginationDto;

public class GetUsersResponse {

    private String message;
    private UserPaginationDto<MinimalUserDto> data;

    public GetUsersResponse() {

    }

    public GetUsersResponse(String message, UserPaginationDto<MinimalUserDto> data) {
        this.message = message;
        this.data = data;
    }

    public UserPaginationDto<MinimalUserDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(UserPaginationDto<MinimalUserDto> data) {
        this.data = data;
    }
}
