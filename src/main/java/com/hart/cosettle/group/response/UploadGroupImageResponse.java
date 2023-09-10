package com.hart.cosettle.group.response;

public class UploadGroupImageResponse {

    private String message;
    private String url;

    public UploadGroupImageResponse() {

    }

    public UploadGroupImageResponse(String message, String url) {
        this.message = message;
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public String getMessage() {
        return message;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
