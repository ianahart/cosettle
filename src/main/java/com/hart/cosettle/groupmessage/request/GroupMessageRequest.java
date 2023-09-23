package com.hart.cosettle.groupmessage.request;

public class GroupMessageRequest {
    private Long userId;
    private Long groupId;
    private String message;

    public GroupMessageRequest() {

    }

    public GroupMessageRequest(Long userId, Long groupId, String message) {
        this.userId = userId;
        this.groupId = groupId;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
