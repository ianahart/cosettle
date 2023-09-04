package com.hart.cosettle.friend.response;

import com.hart.cosettle.friend.dto.FriendPaginationDto;

public class GetFriendsResponse {

    private String message;
    private FriendPaginationDto data;

    public GetFriendsResponse() {

    }

    public GetFriendsResponse(String message, FriendPaginationDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public FriendPaginationDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(FriendPaginationDto data) {
        this.data = data;
    }
}
