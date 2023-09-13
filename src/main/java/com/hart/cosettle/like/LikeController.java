package com.hart.cosettle.like;

import com.hart.cosettle.like.request.CreateLikeRequest;
import com.hart.cosettle.like.request.DeleteLikeRequest;
import com.hart.cosettle.like.response.CreateLikeResponse;
import com.hart.cosettle.like.response.DeleteLikeResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/likes")
public class LikeController {

    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/unlike")
    public ResponseEntity<DeleteLikeResponse> unlikePost(@RequestBody DeleteLikeRequest request) {
        this.likeService.unlikePost(request.getPostId(), request.getUserId());
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteLikeResponse("success"));
    }


    @PostMapping("")
    public ResponseEntity<CreateLikeResponse> likePost(@RequestBody CreateLikeRequest request) {
        this.likeService.likePost(request.getPostId(), request.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateLikeResponse("success"));
    }
}
