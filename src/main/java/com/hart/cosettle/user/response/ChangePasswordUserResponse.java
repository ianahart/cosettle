package com.hart.cosettle.user.response;

public class ChangePasswordUserResponse {
    private String message;

    public ChangePasswordUserResponse() {

    }

    public ChangePasswordUserResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
