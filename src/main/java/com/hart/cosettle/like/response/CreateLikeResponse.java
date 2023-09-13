package com.hart.cosettle.like.response;

public class CreateLikeResponse {

    private String message;

    public CreateLikeResponse() {

    }

    public CreateLikeResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
