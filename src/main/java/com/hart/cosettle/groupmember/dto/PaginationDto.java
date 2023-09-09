package com.hart.cosettle.groupmember.dto;

import java.util.List;

public class PaginationDto<T> {

    private List<T> groupMembers;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public PaginationDto() {

    }

    public PaginationDto(
            List<T> groupMembers,
            int page,
            int pageSize,
            int totalPages,
            String direction) {

        this.groupMembers = groupMembers;
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

    public int getTotalPages() {
        return totalPages;
    }

    public String getDirection() {
        return direction;
    }

    public List<T> getGroupMembers() {
        return groupMembers;
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

    public void setGroupMembers(List<T> groupMembers) {
        this.groupMembers = groupMembers;
    }

}
