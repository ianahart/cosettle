package com.hart.cosettle.user.dto;

public class SearchUserDto {
    private Long userId;
    private Long profileId;
    private String firstName;
    private String lastName;
    private String email;
    private String avatarUrl;
    private String status;

    public SearchUserDto() {

    }

    public SearchUserDto(
            Long userId,
            Long profileId,
            String firstName,
            String lastName,
            String email,
            String avatarUrl) {
        this.userId = userId;
        this.profileId = profileId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatarUrl = avatarUrl;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
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

    public String getFirstName() {
        return firstName;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
