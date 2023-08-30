package com.hart.cosettle.profile.dto;

public class UpdateProfileDto {
    private String firstName;
    private String lastName;
    private String email;
    private String avatarUrl;
    private String abbreviation;

    public UpdateProfileDto() {

    }

    public UpdateProfileDto(
            String firstName,
            String lastName,
            String email,
            String avatarUrl,
            String abbreviation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.abbreviation = abbreviation;
    }

    public String getEmail() {
        return email;
    }

    public String getAbbreviation() {
        return abbreviation;
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

    public void setEmail(String email) {
        this.email = email;
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

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

}
