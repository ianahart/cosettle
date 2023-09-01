package com.hart.cosettle.user.dto;

import java.util.List;

public class UserPaginationDto {
    private List<SearchUserDto> users;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public UserPaginationDto() {

    }

    public UserPaginationDto(List<SearchUserDto> users, int page, int pageSize, int totalPages, String direction) {
        this.users = users;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.direction = direction;
    }

    public int getPage() {
        return page;
    }

    public List<SearchUserDto> getUsers() {
        return users;
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

    public void setUsers(List<SearchUserDto> users) {
        this.users = users;
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
