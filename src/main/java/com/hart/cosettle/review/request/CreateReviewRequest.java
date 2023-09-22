package com.hart.cosettle.review.request;

public class CreateReviewRequest {
    private Long userId;
    private Long spaceId;
    private Integer rating;
    private String review;

    public CreateReviewRequest() {

    }

    public CreateReviewRequest(
            Long userId,
            Long spaceId,
            Integer rating,
            String review) {

        this.userId = userId;
        this.spaceId = spaceId;
        this.rating = rating;
        this.review = review;
    }

    public Integer getRating() {
        return rating;
    }

    public String getReview() {
        return review;
    }

    public Long getSpaceId() {
        return spaceId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }
}
