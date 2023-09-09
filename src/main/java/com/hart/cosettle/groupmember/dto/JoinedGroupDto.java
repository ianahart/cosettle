package com.hart.cosettle.groupmember.dto;

public class JoinedGroupDto {
    private Long id;
    private Long groupId;
    private String url;
    private String groupName;
    private String groupPrivacy;
    private Long adminId;

    public JoinedGroupDto() {

    }

    public JoinedGroupDto(
            Long id,
            Long groupId,
            String url,
            String groupName,
            String groupPrivacy,
            Long adminId) {

        this.id = id;
        this.groupId = groupId;
        this.url = url;
        this.groupName = groupName;
        this.groupPrivacy = groupPrivacy;
        this.adminId = adminId;
    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public Long getAdminId() {
        return adminId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public String getGroupPrivacy() {
        return groupPrivacy;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void setGroupPrivacy(String groupPrivacy) {
        this.groupPrivacy = groupPrivacy;
    }

}
