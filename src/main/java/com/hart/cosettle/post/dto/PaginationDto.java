package com.hart.cosettle.post.dto;

import java.util.List;

public class PaginationDto<T> {
    private List<T> posts;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public PaginationDto() {

    }

    public PaginationDto(
            List<T> posts,
            int page,
            int pageSize,
            int totalPages,
            String direction) {

        this.posts = posts;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.direction = direction;
    }

    public int getPage() {
        return page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public List<T> getPosts() {
        return posts;
    }

    public String getDirection() {
        return direction;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setPosts(List<T> posts) {
        this.posts = posts;
    }

    public void setPage(int page) {
        this.page = page;
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
