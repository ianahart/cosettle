package com.hart.cosettle.hearbeat.response;

public class GetHeartBeatResponse {
    private String message;

    public GetHeartBeatResponse() {

    }

    public GetHeartBeatResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
