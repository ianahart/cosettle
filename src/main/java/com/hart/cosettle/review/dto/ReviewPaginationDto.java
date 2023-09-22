package com.hart.cosettle.review.dto;

import java.util.List;

public class ReviewPaginationDto<T> {

    private List<T> reviews;
    private int page;
    private int totalPages;
    private String direction;
    private int pageSize;

    public ReviewPaginationDto() {

    }

    public ReviewPaginationDto(
            List<T> reviews,
            int page,
            int totalPages,
            String direction,
            int pageSize) {

        this.reviews = reviews;
        this.page = page;
        this.totalPages = totalPages;
        this.direction = direction;
        this.pageSize = pageSize;
    }

    public int getPage() {
        return page;
    }

    public List<T> getReviews() {
        return reviews;
    }

    public int getPageSize() {
        return pageSize;
    }

    public String getDirection() {
        return direction;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public void setReviews(List<T> reviews) {
        this.reviews = reviews;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
