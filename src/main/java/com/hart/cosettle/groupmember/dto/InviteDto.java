package com.hart.cosettle.groupmember.dto;

public class InviteDto {
    private Long id;
    private String url;
    private String name;
    private String adminFirstName;
    private String adminLastName;

    public InviteDto() {

    }

    public InviteDto(
            Long id,
            String url,
            String name,
            String adminFirstName,
            String adminLastName) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.adminFirstName = adminFirstName;
        this.adminLastName = adminLastName;
    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getAdminLastName() {
        return adminLastName;
    }

    public String getAdminFirstName() {
        return adminFirstName;
    }

    public String getName() {
        return name;
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

    public void setAdminLastName(String adminLastName) {
        this.adminLastName = adminLastName;
    }

    public void setAdminFirstName(String adminFirstName) {
        this.adminFirstName = adminFirstName;
    }
}
