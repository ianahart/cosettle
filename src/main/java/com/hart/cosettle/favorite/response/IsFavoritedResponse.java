package com.hart.cosettle.favorite.response;

public class IsFavoritedResponse {

    private String message;
    private Boolean data;

    public IsFavoritedResponse() {

    }

    public IsFavoritedResponse(String message, Boolean data) {
        this.message = message;
        this.data = data;
    }

    public Boolean getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setData(Boolean data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
