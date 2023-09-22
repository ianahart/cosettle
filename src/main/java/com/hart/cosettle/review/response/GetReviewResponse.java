package com.hart.cosettle.review.response;

import com.hart.cosettle.review.dto.ReviewDto;
import com.hart.cosettle.review.dto.ReviewPaginationDto;

public class GetReviewResponse {

    private String message;
    private ReviewPaginationDto<ReviewDto> data;

    public GetReviewResponse() {

    }

    public GetReviewResponse(String message, ReviewPaginationDto<ReviewDto> data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public ReviewPaginationDto<ReviewDto> getData() {
        return data;
    }

    public void setData(ReviewPaginationDto<ReviewDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
