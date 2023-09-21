package com.hart.cosettle.favorite.dto;

import java.util.List;

public class PaginationDto<T> {
    private List<T> favorites;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public PaginationDto() {

    }

    public PaginationDto(List<T> favorites,
            int page,
            int pageSize,
            int totalPages,
            String direction) {
        this.favorites = favorites;
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

    public String getDirection() {
        return direction;
    }

    public List<T> getFavorites() {
        return favorites;
    }

    public int getTotalPages() {
        return totalPages;
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

    public void setFavorites(List<T> favorites) {
        this.favorites = favorites;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

}
