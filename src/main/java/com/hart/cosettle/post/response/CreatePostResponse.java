package com.hart.cosettle.post.response;

import com.hart.cosettle.post.dto.PostDto;

public class CreatePostResponse {

    private String message;
    private PostDto data;

    public CreatePostResponse() {

    }

    public CreatePostResponse(String message, PostDto data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public PostDto getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(PostDto data) {
        this.data = data;
    }
}
