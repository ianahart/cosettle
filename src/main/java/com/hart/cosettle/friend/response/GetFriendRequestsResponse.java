package com.hart.cosettle.friend.response;

import java.util.List;

import com.hart.cosettle.friend.dto.FriendRequestDto;
import com.hart.cosettle.friend.dto.FriendRequestPaginationDto;

public class GetFriendRequestsResponse {
    private String message;
    private FriendRequestPaginationDto data;

    public GetFriendRequestsResponse() {

    }

    public GetFriendRequestsResponse(String message, FriendRequestPaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public FriendRequestPaginationDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(FriendRequestPaginationDto data) {
        this.data = data;
    }
}
