package com.hart.cosettle.review;

import com.hart.cosettle.review.request.CreateReviewRequest;
import com.hart.cosettle.review.response.CreateReviewResponse;
import com.hart.cosettle.review.response.GetReviewResponse;
import com.hart.cosettle.review.response.ReviewStatsResponse;

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
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("")
    public ResponseEntity<GetReviewResponse> getReviews(
            @RequestParam("spaceId") Long spaceId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetReviewResponse("success",
                        this.reviewService.getReviews(spaceId, page, pageSize, direction)));
    }

    @GetMapping("/stats")
    public ResponseEntity<ReviewStatsResponse> getReviewStats(@RequestParam("spaceId") Long spaceId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReviewStatsResponse("success", this.reviewService.getReviewStats(spaceId)));
    }

    @PostMapping("")
    public ResponseEntity<CreateReviewResponse> createReview(@RequestBody CreateReviewRequest request) {
        this.reviewService.createReview(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateReviewResponse("success"));
    }
}
