package com.hart.cosettle.space.response;

import com.hart.cosettle.space.dto.SpaceDto;
import com.hart.cosettle.space.dto.SpacePaginationDto;

public class GetSpacesResponse {

    private String message;
    private SpacePaginationDto<SpaceDto> data;

    public GetSpacesResponse() {

    }

    public GetSpacesResponse(String message, SpacePaginationDto<SpaceDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public SpacePaginationDto<SpaceDto> getData() {
        return data;
    }

    public void setData(SpacePaginationDto<SpaceDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
