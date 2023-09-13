package com.hart.cosettle.post;

import com.hart.cosettle.group.Group;
import com.hart.cosettle.group.GroupService;
import com.hart.cosettle.like.LikeService;
import com.hart.cosettle.post.dto.PaginationDto;
import com.hart.cosettle.post.dto.PostDto;
import com.hart.cosettle.post.request.CreatePostRequest;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import java.util.Map;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.advice.ForbiddenException;
import com.hart.cosettle.amazon.AmazonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PostService {

    private int MAX_MEGA_BYTES = 2 * 1024 * 1024;
    private final PostRepository postRepository;
    private final GroupService groupService;
    private final UserService userService;
    private final AmazonService amazonService;
    private final LikeService likeService;
    private final String BUCKET_NAME = "/arrow-date/cosettle/posts";

    @Autowired
    public PostService(
            PostRepository postRepository,
            GroupService groupService,
            UserService userService,
            AmazonService amazonService,
            @Lazy LikeService likeService) {
        this.postRepository = postRepository;
        this.groupService = groupService;
        this.userService = userService;
        this.amazonService = amazonService;
        this.likeService = likeService;
    }

    private boolean validatePostLength(String content) {
        return content.length() > 300 || content.length() == 0;
    }

    private Map<String, String> uploadPostPhoto(MultipartFile photo) {
        if (photo.getSize() > MAX_MEGA_BYTES) {
            throw new BadRequestException("Photo cannot exceed 2 MB");
        }
        String filename = this.amazonService.upload(BUCKET_NAME, photo.getOriginalFilename(), photo);
        return this.amazonService.getPublicUrl(BUCKET_NAME, filename);
    }

    public PostDto createPost(CreatePostRequest request) {
        if (validatePostLength(request.getContent())) {
            throw new BadRequestException("Post must be between 1 and 300 characters");
        }
        Group group = this.groupService.getGroupById(request.getGroupId());
        User user = this.userService.getUserById(request.getUserId());
        Post newPost = new Post();

        if (request.getFile() != null) {
            Map<String, String> content = uploadPostPhoto(request.getFile());
            newPost.setFilename(content.get("filename"));
            newPost.setUrl(content.get("url"));
        }
        newPost.setUser(user);
        newPost.setGroup(group);
        newPost.setContent(request.getContent());

        this.postRepository.save(newPost);

        return new PostDto(
                newPost.getId(),
                newPost.getUrl(),
                newPost.getCreatedAt(),
                user.getFirstName(),
                user.getLastName(),
                user.getId(),
                user.getProfile().getAvatarUrl(),
                newPost.getContent());
    }

    public PaginationDto<PostDto> getPosts(Long groupId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<PostDto> result = this.postRepository.getPosts(groupId, paging);
        User currentUser = this.userService.getCurrentlyLoggedInUser();

        for (PostDto post : result.getContent()) {
            post.setUserLiked(this.likeService.checkIfAlreadyLiked(post.getId(),
                    currentUser.getId()));
            post.setTotalLikes(this.likeService.getTotalLikesByPost(post.getId()));
        }

        return new PaginationDto<PostDto>(result.getContent(), currentPage, pageSize, result.getTotalPages(),
                direction);

    }

    public Post getPostById(Long id) {
        return this.postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post not found"));
    }

    public void deletePost(Long id) {
        User user = this.userService.getCurrentlyLoggedInUser();
        Post post = getPostById(id);
        if (user.getId() != post.getUser().getId()) {
            throw new ForbiddenException("Cannot delete another user's post");
        }

        this.postRepository.delete(post);
    }
}
