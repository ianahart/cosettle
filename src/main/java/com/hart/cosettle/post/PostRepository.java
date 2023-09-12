package com.hart.cosettle.post;

import com.hart.cosettle.post.dto.PostDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = """
            SELECT new com.hart.cosettle.post.dto.PostDto(
            p.id AS id, p.url AS url, p.createdAt AS createdAt,
            u.firstName AS firstName, u.lastName AS lastName,
            u.id AS userId, pr.avatarUrl AS avatarUrl, p.content AS content
            ) FROM Post p
            INNER JOIN p.group g
            INNER JOIN p.user u
            INNER JOIN p.user.profile pr
            WHERE g.id = :groupId
            """)

    Page<PostDto> getPosts(@Param("groupId") Long groupId, Pageable paging);
}
