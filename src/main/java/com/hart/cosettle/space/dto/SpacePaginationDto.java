package com.hart.cosettle.space.dto;

import java.util.List;

public class SpacePaginationDto<T> {
    private List<T> spaces;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public SpacePaginationDto() {

    }

    public SpacePaginationDto(
            List<T> spaces,
            int page,
            int pageSize,
            int totalPages,
            String direction) {

        this.spaces = spaces;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.direction = direction;
    }

    public int getPage() {
        return page;
    }

    public List<T> getSpaces() {
        return spaces;
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

    public void setSpaces(List<T> spaces) {
        this.spaces = spaces;
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
