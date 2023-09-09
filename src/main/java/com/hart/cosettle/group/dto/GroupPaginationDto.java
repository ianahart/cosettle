package com.hart.cosettle.group.dto;

import java.util.List;

public class GroupPaginationDto<T> {
    private List<T> groups;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public GroupPaginationDto() {

    }

    public GroupPaginationDto(
            List<T> groups,
            int page,
            int pageSize,
            int totalPages,
            String direction) {

        this.groups = groups;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.direction = direction;
    }

    public int getPage() {
        return page;
    }

    public List<T> getGroups() {
        return groups;
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

    public void setGroups(List<T> groups) {
        this.groups = groups;
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
