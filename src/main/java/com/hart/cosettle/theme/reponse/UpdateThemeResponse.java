package com.hart.cosettle.theme.reponse;

public class UpdateThemeResponse {
    private String message;

    public UpdateThemeResponse() {

    }

    public UpdateThemeResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
