package com.hart.cosettle.email.request;

public class ForgotPasswordEmailRequest {
    private String email;

    public ForgotPasswordEmailRequest() {

    }

    public ForgotPasswordEmailRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
