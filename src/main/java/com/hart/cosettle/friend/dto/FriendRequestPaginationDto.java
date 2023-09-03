package com.hart.cosettle.friend.dto;

import java.util.List;

public class FriendRequestPaginationDto {
    private List<FriendRequestDto> friendRequests;
    private int page;
    private int pageSize;
    private int totalPages;
    private String direction;

    public FriendRequestPaginationDto() {

    }

    public FriendRequestPaginationDto(
            List<FriendRequestDto> friendRequests,
            int page,
            int pageSize,
            int totalPages,
            String direction) {

        this.friendRequests = friendRequests;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.direction = direction;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getPage() {
        return page;
    }

    public List<FriendRequestDto> getFriendRequests() {
        return friendRequests;
    }

    public String getDirection() {
        return direction;
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

    public void setPage(int page) {
        this.page = page;
    }

    public void setFriendRequests(List<FriendRequestDto> friendRequests) {
        this.friendRequests = friendRequests;
    }
}
