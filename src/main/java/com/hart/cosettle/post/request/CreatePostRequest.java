package com.hart.cosettle.post.request;

import org.springframework.web.multipart.MultipartFile;

public class CreatePostRequest {
    private Long groupId;
    private Long userId;
    private String content;
    private MultipartFile file;

    public CreatePostRequest() {

    }

    public CreatePostRequest(Long groupId, Long userId, String content, MultipartFile file) {
        this.groupId = groupId;
        this.userId = userId;
        this.content = content;
        this.file = file;
    }

    public CreatePostRequest(Long groupId, Long userId, String content) {
        this.groupId = groupId;
        this.userId = userId;
        this.content = content;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getContent() {
        return content;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
