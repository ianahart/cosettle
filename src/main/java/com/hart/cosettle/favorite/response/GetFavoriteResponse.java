package com.hart.cosettle.favorite.response;

import com.hart.cosettle.favorite.dto.FavoriteDto;
import com.hart.cosettle.favorite.dto.PaginationDto;

public class GetFavoriteResponse {
    private String message;
    private PaginationDto<FavoriteDto> data;

    public GetFavoriteResponse() {

    }

    public GetFavoriteResponse(String message, PaginationDto<FavoriteDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PaginationDto<FavoriteDto> getData() {
        return data;
    }

    public void setData(PaginationDto<FavoriteDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
