package com.hart.cosettle.user.dto;

import com.hart.cosettle.user.Role;

public class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private String abbreviation;
    private Boolean loggedIn;
    private Long profileId;
    private String avatarUrl;
    private String theme;
    private Long themeId;

    public UserDto(Long id, String email, String firstName, String lastName, Role role, String abbreviation,
            Boolean loggedIn, Long profileId, String avatarUrl, String theme,
            Long themeId) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.abbreviation = abbreviation;
        this.loggedIn = loggedIn;
        this.profileId = profileId;
        this.avatarUrl = avatarUrl;
        this.theme = theme;
        this.themeId = themeId;
    }

    public Long getId() {
        return id;
    }

    public Long getThemeId() {
        return themeId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getTheme() {
        return theme;
    }

    public Long getProfileId() {
        return profileId;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public Boolean getLoggedIn() {
        return loggedIn;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLoggedIn(Boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setThemeId(Long themeId) {
        this.themeId = themeId;
    }

}
