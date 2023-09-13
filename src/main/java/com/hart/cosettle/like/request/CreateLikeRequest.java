package com.hart.cosettle.like.request;

public class CreateLikeRequest {

    private Long postId;
    private Long userId;

    public CreateLikeRequest() {

    }

    public CreateLikeRequest(Long postId, Long userId) {
        this.postId = postId;
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
