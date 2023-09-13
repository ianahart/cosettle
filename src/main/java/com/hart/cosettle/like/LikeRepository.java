package com.hart.cosettle.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query(value = """
            SELECT l
                 FROM Like l
                INNER JOIN l.post p
                INNER JOIN l.user u
                WHERE p.id = :postId
                AND u.id = :userId
            """)
    Like getLike(@Param("postId") Long postId, @Param("userId") Long userId);

    @Query(value = """
             SELECT COUNT(l.id)
             FROM Like l
             INNER JOIN l.post p
             WHERE p.id = :postId
            """)
    int getTotalLikesByPost(@Param("postId") Long postId);

    @Query(value = """
            SELECT EXISTS(SELECT 1
            FROM Like l
            INNER JOIN l.post p
            INNER JOIN l.user u
            WHERE p.id = :postId
            AND u.id = :userId
            )
            """)
    boolean getLikeByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);
}
