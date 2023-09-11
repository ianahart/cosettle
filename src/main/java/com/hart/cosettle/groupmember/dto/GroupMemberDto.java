package com.hart.cosettle.groupmember.dto;

import org.hibernate.mapping.Set;

public class GroupMemberDto {

    private Long id;
    private Long userId;
    private Long profileId;
    private String firstName;
    private String lastName;
    private String url;

    public GroupMemberDto() {

    }

    public GroupMemberDto(
            Long id,
            Long userId,
            Long profileId,
            String firstName,
            String lastName,
            String url) {

        this.id = id;
        this.userId = userId;
        this.profileId = profileId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.url = url;
    }

    public Long getId() {
        return id;
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

    public String getFirstName() {
        return firstName;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
