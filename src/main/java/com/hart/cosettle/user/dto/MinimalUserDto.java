package com.hart.cosettle.user.dto;

public class MinimalUserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String avatarUrl;

    public MinimalUserDto() {

    }

    public MinimalUserDto(Long id, String firstName, String lastName, String avatarUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() {
        return id;
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
