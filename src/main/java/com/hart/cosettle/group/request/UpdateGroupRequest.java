package com.hart.cosettle.group.request;

public class UpdateGroupRequest {

    private String name;

    public UpdateGroupRequest() {

    }

    public UpdateGroupRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
