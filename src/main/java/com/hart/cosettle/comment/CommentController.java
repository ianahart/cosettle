package com.hart.cosettle.comment;

import com.hart.cosettle.comment.request.CreateCommentRequest;
import com.hart.cosettle.comment.response.CreateCommentResponse;
import com.hart.cosettle.comment.response.GetCommentsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("")
    public ResponseEntity<GetCommentsResponse> getComments(
            @RequestParam("postId") Long postId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new GetCommentsResponse("success", this.commentService.getComments(postId, page, pageSize, direction)));
    }

    @PostMapping("")
    public ResponseEntity<CreateCommentResponse> createComment(@RequestBody CreateCommentRequest request) {
        this.commentService.createComment(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateCommentResponse("success"));
    }
}
