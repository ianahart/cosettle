package com.hart.cosettle.group.dto;

import java.sql.Timestamp;

public class GroupDto {
    private Long id;
    private Long adminId;
    private Timestamp createdAt;
    private String name;
    private String url;
    private String privacy;

    public GroupDto() {

    }

    public GroupDto(
            Long id,
            Long adminId,
            Timestamp createdAt,
            String name,
            String url,
            String privacy) {
        this.id = id;
        this.adminId = adminId;
        this.createdAt = createdAt;
        this.name = name;
        this.url = url;
        this.privacy = privacy;
    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public Long getAdminId() {
        return adminId;
    }

    public String getPrivacy() {
        return privacy;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}
