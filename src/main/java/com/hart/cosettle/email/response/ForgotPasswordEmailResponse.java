package com.hart.cosettle.email.response;

public class ForgotPasswordEmailResponse {
    private String message;

    public ForgotPasswordEmailResponse() {

    }

    public ForgotPasswordEmailResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
