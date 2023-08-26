package com.hart.cosettle.spacephoto.request;

import org.springframework.web.multipart.MultipartFile;

public class CreateSpacePhotoRequest {

    private Long spaceId;
    private MultipartFile[] photos;

    public CreateSpacePhotoRequest() {

    }

    public CreateSpacePhotoRequest(Long spaceId, MultipartFile[] photos) {
        this.spaceId = spaceId;
        this.photos = photos;
    }

    public Long getSpaceId() {
        return spaceId;
    }

    public MultipartFile[] getPhotos() {
        return photos;
    }

    public void setPhotos(MultipartFile[] photos) {
        this.photos = photos;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }

}
