package com.hart.cosettle.group.request;

import java.util.List;

public class CreateGroupRequest {

    private Long adminId;
    private List<Long> userIds;
    private String privacy;
    private String groupName;

    public CreateGroupRequest() {

    }

    public CreateGroupRequest(
            Long adminId,
            List<Long> userIds,
            String privacy,
            String groupName) {
        this.adminId = adminId;
        this.userIds = userIds;
        this.privacy = privacy;
        this.groupName = groupName;
    }

    public Long getAdminId() {
        return adminId;
    }

    public String getPrivacy() {
        return privacy;
    }

    public List<Long> getUserIds() {
        return userIds;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }

    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
