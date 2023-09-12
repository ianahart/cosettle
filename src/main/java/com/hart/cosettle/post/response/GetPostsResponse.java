package com.hart.cosettle.post.response;

import com.hart.cosettle.post.dto.PaginationDto;
import com.hart.cosettle.post.dto.PostDto;

public class GetPostsResponse {
    private String message;
    private PaginationDto<PostDto> data;

    public GetPostsResponse() {

    }

    public GetPostsResponse(String message, PaginationDto<PostDto> data) {
        this.message = message;
        this.data = data;
    }

    public PaginationDto<PostDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }
}
