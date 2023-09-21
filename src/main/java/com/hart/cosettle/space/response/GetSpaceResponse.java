package com.hart.cosettle.space.response;

import com.hart.cosettle.space.dto.SpaceDto;

public class GetSpaceResponse {

    private String message;
    private SpaceDto data;

    public GetSpaceResponse() {

    }

    public GetSpaceResponse(String message, SpaceDto data) {
        this.message = message;
        this.data = data;

    }

    public String getMessage() {
        return message;
    }

    public SpaceDto getData() {
        return data;
    }

    public void setData(SpaceDto data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
