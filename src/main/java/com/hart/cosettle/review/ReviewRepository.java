package com.hart.cosettle.review;

import com.hart.cosettle.review.dto.ReviewDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = """
            SELECT new com.hart.cosettle.review.dto.ReviewDto(
            r.id AS id, u.id AS userId, u.firstName AS firstName,
            u.lastName AS lastName, p.avatarUrl AS avatarUrl,
            r.rating AS rating, r.text AS text
            ) FROM Review r
            INNER JOIN r.user u
            INNER JOIN r.user.profile p
            INNER JOIN r.space s
            WHERE s.id = :spaceId

                """)
    Page<ReviewDto> getReviews(@Param("spaceId") Long spaceId, Pageable pageable);

    @Query(value = """
             SELECT COUNT(r.id)
            FROM Review r
            INNER JOIN r.space s
            WHERE s.id = :spaceId
            """)
    int getTotalReviews(@Param("spaceId") Long spaceId);

    @Query(value = """
               SELECT AVG(r.rating)
               FROM Review r
               INNER JOIN r.space s
               WHERE s.id = :spaceId
            """)
    int getAverageRating(@Param("spaceId") Long spaceId);

    @Query(value = """
            SELECT EXISTS(SELECT 1
            FROM Review r
            INNER JOIN r.user u
            INNER JOIN r.space s
            WHERE u.id = :userId
            AND s.id = :spaceId
            )
            """)
    Boolean checkForExistingReview(@Param("userId") Long userId, @Param("spaceId") Long spaceId);
}
