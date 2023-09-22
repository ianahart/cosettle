package com.hart.cosettle.review.dto;

public class ReviewStatsDto {

    private int averageRating;
    private int totalReviews;

    public ReviewStatsDto() {

    }

    public ReviewStatsDto(int averageRating, int totalReviews) {
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
    }

    public int getTotalReviews() {
        return totalReviews;
    }

    public int getAverageRating() {
        return averageRating;
    }

    public void setTotalReviews(int totalReviews) {
        this.totalReviews = totalReviews;
    }

    public void setAverageRating(int averageRating) {
        this.averageRating = averageRating;
    }
}
