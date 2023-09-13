package com.hart.cosettle.like.response;

public class DeleteLikeResponse {

    private String message;

    public DeleteLikeResponse() {

    }

    public DeleteLikeResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
