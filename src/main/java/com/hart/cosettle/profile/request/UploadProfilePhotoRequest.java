package com.hart.cosettle.profile.request;

import org.springframework.web.multipart.MultipartFile;

public class UploadProfilePhotoRequest {
    private MultipartFile file;
    private String action;

    public UploadProfilePhotoRequest() {

    }

    public UploadProfilePhotoRequest(MultipartFile file, String action) {
        this.file = file;
        this.action = action;
    }

    public MultipartFile getFile() {
        return file;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
