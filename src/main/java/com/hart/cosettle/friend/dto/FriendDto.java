package com.hart.cosettle.friend.dto;

public class FriendDto {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private Long profileId;

    public FriendDto() {

    }

    public FriendDto(
            Long id,
            Long userId,
            String firstName,
            String lastName,
            String avatarUrl,
            Long profileId) {

        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.profileId = profileId;
    }

    public Long getId() {
        return id;
    }

    public Long getProfileId() {
        return profileId;
    }

    public String getLastName() {
        return lastName;
    }

    public Long getUserId() {
        return userId;
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

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }
}
