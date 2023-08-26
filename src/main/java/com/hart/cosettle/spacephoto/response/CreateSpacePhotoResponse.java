package com.hart.cosettle.spacephoto.response;

public class CreateSpacePhotoResponse {
    private String message;

    public CreateSpacePhotoResponse() {

    }

    public CreateSpacePhotoResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
