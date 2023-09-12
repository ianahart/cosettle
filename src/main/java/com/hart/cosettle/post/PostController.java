package com.hart.cosettle.post;

import com.hart.cosettle.amazon.AmazonService;
import com.hart.cosettle.post.request.CreatePostRequest;
import com.hart.cosettle.post.response.CreatePostResponse;
import com.hart.cosettle.post.response.GetPostsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("")
    public ResponseEntity<GetPostsResponse> getPosts(
            @RequestParam("groupId") Long groupId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetPostsResponse("success",
                        this.postService.getPosts(groupId, page, pageSize, direction)));
    }

    @PostMapping("")
    public ResponseEntity<CreatePostResponse> createPost(CreatePostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreatePostResponse("success", this.postService.createPost(request)));
    }

}
