package com.hart.cosettle.user.request;

public class ChangePasswordUserRequest {
    private Long userId;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;

    public ChangePasswordUserRequest() {

    }

    public ChangePasswordUserRequest(Long userId, String oldPassword, String newPassword, String confirmPassword) {
          this.userId = userId;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    public Long getUserId() {
        return userId;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
