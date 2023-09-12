package com.hart.cosettle.post.dto;

import java.sql.Timestamp;

public class PostDto {
    private Long id;
    private String url;
    private Timestamp createdAt;
    private String firstName;
    private String lastName;
    private Long userId;
    private String avatarUrl;
    private String content;

    public PostDto() {
    }

    public PostDto(
            Long id,
            String url,
            Timestamp createdAt,
            String firstName,
            String lastName,
            Long userId,
            String avatarUrl,
            String content) {
        this.id = id;
        this.url = url;
        this.createdAt = createdAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.avatarUrl = avatarUrl;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getUrl() {
        return url;
    }

    public Long getUserId() {
        return userId;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
