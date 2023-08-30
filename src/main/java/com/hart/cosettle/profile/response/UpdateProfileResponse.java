package com.hart.cosettle.profile.response;

import com.hart.cosettle.profile.dto.UpdateProfileDto;

public class UpdateProfileResponse {
    private String message;
    private UpdateProfileDto data;

    public UpdateProfileResponse() {

    }

    public UpdateProfileResponse(String message, UpdateProfileDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public UpdateProfileDto getData() {
        return data;
    }

    public void setData(UpdateProfileDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
