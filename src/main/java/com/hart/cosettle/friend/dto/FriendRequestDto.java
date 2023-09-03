package com.hart.cosettle.friend.dto;

public class FriendRequestDto {
    private Long id;
    private Long senderId;
    private String firstName;
    private String lastName;
    private String avatarUrl;

    public FriendRequestDto() {

    }

    public FriendRequestDto(
            Long id,
            Long senderId,
            String firstName,
            String lastName,
            String avatarUrl) {

        this.id = id;
        this.senderId = senderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() {
        return id;
    }

    public String getLastName() {
        return lastName;
    }

    public Long getSenderId() {
        return senderId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
