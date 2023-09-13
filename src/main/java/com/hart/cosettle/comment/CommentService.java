package com.hart.cosettle.comment;

import com.hart.cosettle.comment.dto.CommentDto;
import com.hart.cosettle.comment.dto.CommentPaginationDto;
import com.hart.cosettle.comment.request.CreateCommentRequest;
import com.hart.cosettle.post.Post;
import com.hart.cosettle.post.PostService;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;
import com.hart.cosettle.advice.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final UserService userService;
    private final PostService postService;
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(
            UserService userService,
            PostService postService,
            CommentRepository commentRepository) {
        this.userService = userService;
        this.postService = postService;
        this.commentRepository = commentRepository;
    }

    public CommentPaginationDto<CommentDto> getComments(Long postId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<CommentDto> result = this.commentRepository.getComments(postId, paging);

        return new CommentPaginationDto<CommentDto>(
                result.getContent(),
                currentPage,
                pageSize,
                result.getTotalPages(),
                direction);

    }

    public void createComment(CreateCommentRequest request) {
        if (request.getPostId() == null || request.getUserId() == null) {
            throw new BadRequestException("Missing parameters for creating a comment");
        }

        User user = this.userService.getUserById(request.getUserId());
        Post post = this.postService.getPostById(request.getPostId());

        this.commentRepository.save(
                new Comment(user, post, request.getText()));
    }
}
