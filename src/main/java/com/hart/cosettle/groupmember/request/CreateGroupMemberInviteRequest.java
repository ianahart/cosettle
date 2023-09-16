package com.hart.cosettle.groupmember.request;

public class CreateGroupMemberInviteRequest {

    private Long userId;
    private Long adminId;
    private Long groupId;

    public CreateGroupMemberInviteRequest() {

    }

    public CreateGroupMemberInviteRequest(Long userId, Long adminId, Long groupId) {
        this.userId = userId;
        this.adminId = adminId;
        this.groupId = groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getAdminId() {
        return adminId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }
}
