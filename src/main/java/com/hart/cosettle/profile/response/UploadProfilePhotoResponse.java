package com.hart.cosettle.profile.response;

public class UploadProfilePhotoResponse {
    private String message;
    private String avatarUrl;

    public UploadProfilePhotoResponse() {

    }

    public UploadProfilePhotoResponse(String message, String avatarUrl) {
        this.message = message;
        this.avatarUrl = avatarUrl;
    }

    public String getMessage() {
        return message;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
