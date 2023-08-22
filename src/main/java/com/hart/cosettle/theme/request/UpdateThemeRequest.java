package com.hart.cosettle.theme.request;

public class UpdateThemeRequest {
    private String theme;

    public UpdateThemeRequest() {

    }

    public UpdateThemeRequest(String theme) {
         this.theme = theme;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }
}
