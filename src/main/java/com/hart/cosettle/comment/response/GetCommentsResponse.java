package com.hart.cosettle.comment.response;

import com.hart.cosettle.comment.dto.CommentDto;
import com.hart.cosettle.comment.dto.CommentPaginationDto;

public class GetCommentsResponse {

    private String message;
    private CommentPaginationDto<CommentDto> data;

    public GetCommentsResponse() {

    }

    public GetCommentsResponse(String message, CommentPaginationDto<CommentDto> data) {
        this.message = message;
        this.data = data;
    }

    public CommentPaginationDto<CommentDto> getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setData(CommentPaginationDto<CommentDto> data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
