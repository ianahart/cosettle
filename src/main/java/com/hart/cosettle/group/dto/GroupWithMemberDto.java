package com.hart.cosettle.group.dto;

public class GroupWithMemberDto {

    private Boolean isGroupMemberOrAdmin;
    private GroupDto group;

    public GroupWithMemberDto() {

    }

    public GroupWithMemberDto(Boolean isGroupMemberOrAdmin, GroupDto group) {
        this.isGroupMemberOrAdmin = isGroupMemberOrAdmin;
        this.group = group;
    }

    public Boolean getIsGroupMemberOrAdmin() {
        return isGroupMemberOrAdmin;
    }

    public GroupDto getGroup() {
        return group;
    }

    public void setGroup(GroupDto group) {
        this.group = group;
    }

    public void setIsGroupMemberOrAdmin(Boolean isGroupMemberOrAdmin) {
        this.isGroupMemberOrAdmin = isGroupMemberOrAdmin;
    }

}
