package com.hart.cosettle.profile.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {
    @Size(min = 1, max = 250, message = "First name must be between 1 and 250 characters")
    private String firstName;
    @Size(min = 1, max = 250, message = "Last name must be between 1 and 250 characters")
    private String lastName;
    @Email
    private String email;
    private String bio;
    private Long userId;

    public UpdateProfileRequest() {

    }

    public UpdateProfileRequest(
            String firstName,
            String lastName,
            String email,
            String bio,
            Long userId) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bio = bio;
        this.userId = userId;
    }

    public String getBio() {
        return bio;
    }

    public String getEmail() {
        return email;
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

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
