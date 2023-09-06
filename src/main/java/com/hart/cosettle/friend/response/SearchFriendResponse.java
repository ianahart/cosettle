package com.hart.cosettle.friend.response;

public class SearchFriendResponse {

    private String message;
    private Long id;

    public SearchFriendResponse() {

    }

    public SearchFriendResponse(String message, Long id) {
        this.message = message;
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
