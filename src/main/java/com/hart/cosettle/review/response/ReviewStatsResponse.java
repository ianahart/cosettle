package com.hart.cosettle.review.response;

import com.hart.cosettle.review.dto.ReviewStatsDto;

public class ReviewStatsResponse {

    private String message;
    private ReviewStatsDto data;

    public ReviewStatsResponse() {

    }

    public ReviewStatsResponse(String message, ReviewStatsDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public ReviewStatsDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(ReviewStatsDto data) {
        this.data = data;
    }
}
