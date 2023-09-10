package com.hart.cosettle.group.request;

import org.springframework.web.multipart.MultipartFile;

public class UploadGroupImageRequest {

    private MultipartFile file;

    public UploadGroupImageRequest() {

    }

    public UploadGroupImageRequest(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
