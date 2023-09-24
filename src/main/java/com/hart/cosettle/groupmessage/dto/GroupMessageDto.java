package com.hart.cosettle.groupmessage.dto;

public class GroupMessageDto {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private String message;
    private Long groupId;

    public GroupMessageDto() {

    }

    public GroupMessageDto(
            Long id,
            Long userId,
            String firstName,
            String lastName,
            String avatarUrl,
            String message,
           Long groupId) {

        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.message = message;
        this.groupId = groupId;
    }

    public Long getId() {
        return id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }
}
