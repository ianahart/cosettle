package com.hart.cosettle.favorite.request;

public class ToggleFavoriteRequest {

    private Long userId;
    private Long spaceId;
    private String action;

    public ToggleFavoriteRequest() {

    }

    public ToggleFavoriteRequest(Long userId, Long spaceId, String action) {
        this.userId = userId;
        this.spaceId = spaceId;
        this.action = action;
    }

    public String getAction() {
        return action;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getSpaceId() {
        return spaceId;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }
}
