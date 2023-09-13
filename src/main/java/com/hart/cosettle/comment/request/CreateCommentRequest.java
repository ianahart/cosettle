package com.hart.cosettle.comment.request;

public class CreateCommentRequest {

    private Long postId;
    private Long userId;
    private String text;

    public CreateCommentRequest() {

    }

    public CreateCommentRequest(Long postId, Long userId, String text) {
        this.postId = postId;
        this.userId = userId;
        this.text = text;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getText() {
        return text;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setText(String text) {
        this.text = text;
    }
}
