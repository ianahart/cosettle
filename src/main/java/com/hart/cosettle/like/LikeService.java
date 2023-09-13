package com.hart.cosettle.like;

import com.hart.cosettle.post.Post;
import com.hart.cosettle.post.PostService;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final PostService postService;
    private final UserService userService;
    private final LikeRepository likeRepository;

    @Autowired
    public LikeService(PostService postService, UserService userService, LikeRepository likeRepository) {
        this.postService = postService;
        this.userService = userService;
        this.likeRepository = likeRepository;
    }

    public void unlikePost(Long postId, Long userId) {
        Like like = this.likeRepository.getLike(postId, userId);
        this.likeRepository.delete(like);
    }

    public boolean checkIfAlreadyLiked(Long postId, Long userId) {
        return likeRepository.getLikeByPostIdAndUserId(postId, userId);
    }

    public int getTotalLikesByPost(Long postId) {
        return this.likeRepository.getTotalLikesByPost(postId);
    }

    public void likePost(Long postId, Long userId) {
        User user = this.userService.getUserById(userId);
        Post post = this.postService.getPostById(postId);

        if (!checkIfAlreadyLiked(postId, userId)) {
            this.likeRepository.save(new Like(user, post));
        }
    }
}
