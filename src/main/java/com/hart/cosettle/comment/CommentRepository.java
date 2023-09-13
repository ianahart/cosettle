package com.hart.cosettle.comment;

import com.hart.cosettle.comment.dto.CommentDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = """
            SELECT new com.hart.cosettle.comment.dto.CommentDto(
              u.firstName AS firstName, u.lastName AS lastName,
              p.avatarUrl AS avatarUrl, c.id AS id, c.text AS text
            ) FROM Comment c
            INNER JOIN c.user u
            INNER JOIN c.user.profile p
            INNER JOIN c.post po
            WHERE po.id = :postId
                """)
    Page<CommentDto> getComments(@Param("postId") Long postId, Pageable paging);

}
