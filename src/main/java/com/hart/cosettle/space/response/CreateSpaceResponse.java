package com.hart.cosettle.space.response;

public class CreateSpaceResponse {
    private String message;
    private Long spaceId;

    public CreateSpaceResponse() {

    }

    public CreateSpaceResponse(String message, Long spaceId) {
        this.message = message;
        this.spaceId = spaceId;
    }

    public String getMessage() {
        return message;
    }

    public Long getSpaceId() {
        return spaceId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }
}
