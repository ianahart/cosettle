package com.hart.cosettle.review;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.review.dto.ReviewDto;
import com.hart.cosettle.review.dto.ReviewPaginationDto;
import com.hart.cosettle.review.dto.ReviewStatsDto;
import com.hart.cosettle.review.request.CreateReviewRequest;
import com.hart.cosettle.space.Space;
import com.hart.cosettle.space.SpaceService;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final UserService userService;
    private final SpaceService spaceService;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(
            UserService userService,
            SpaceService spaceService,
            ReviewRepository reviewRepository) {
        this.userService = userService;
        this.spaceService = spaceService;
        this.reviewRepository = reviewRepository;
    }

    public ReviewStatsDto getReviewStats(Long spaceId) {
        int averageRating = this.reviewRepository.getAverageRating(spaceId);
        int totalReviews = this.reviewRepository.getTotalReviews(spaceId);

        return new ReviewStatsDto(averageRating, totalReviews);
    }

    private Boolean validateFields(Integer rating, String text) {
        if (rating == 0 || text.trim().length() == 0 || text.length() > 250) {
            return false;
        }
        return true;
    }

    private Boolean checkForExistingReview(Long userId, Long spaceId) {
        return this.reviewRepository.checkForExistingReview(userId, spaceId);
    }

    public void createReview(CreateReviewRequest request) {
        if (!validateFields(request.getRating(), request.getReview())) {
            throw new BadRequestException("Please fill in both fields");
        }

        if (checkForExistingReview(request.getUserId(), request.getSpaceId())) {
            throw new BadRequestException("You have already reviewed this space");
        }

        User user = this.userService.getUserById(request.getUserId());
        Space space = this.spaceService.getSpaceById(request.getSpaceId());

        this.reviewRepository.save(new Review(user, space, request.getRating(), request.getReview()));
    }

    public ReviewPaginationDto<ReviewDto> getReviews(Long spaceId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<ReviewDto> result = this.reviewRepository.getReviews(spaceId, paging);

        return new ReviewPaginationDto<>(result.getContent(), currentPage, result.getTotalPages(), direction, pageSize);
    }
}
