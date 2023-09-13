package com.hart.cosettle.comment.dto;

public class CommentDto {
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private Long id;
    private String text;

    public CommentDto() {

    }

    public CommentDto(String firstName,
            String lastName,
            String avatarUrl,
            Long id,
            String text) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.id = id;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
