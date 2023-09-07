package com.hart.cosettle.user;

import java.util.Optional;

import com.hart.cosettle.user.dto.ChatUserDto;
import com.hart.cosettle.user.dto.MinimalUserDto;
import com.hart.cosettle.user.dto.SearchUserDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = """
              SELECT new com.hart.cosettle.user.dto.MinimalUserDto
              u.id AS id, u.firstName AS firstName, u.lastName AS lastName
              p.avatarUrl AS avatarUr
              ) FROM User 
             INNER JOIN u.profile 
              WHERE u.id <> :userI
                  """)
    Page<MinimalUserDto> getUsers(@Param("userId") Long userId, Pageable paging);

    @Query(value = """
            SELECT new com.hart.cosettle.user.dto.ChatUserDto(
             u.id AS id, u.firstName AS firstName, u.lastName AS lastName,
             u.email AS email, p.avatarUrl AS avatarUrl
            ) FROM User u
            INNER JOIN u.profile p
            WHERE u.id = :userId
            """)

    ChatUserDto getUser(@Param("userId") Long userId);

    Optional<User> findByEmail(String email);

    @Query(value = """
            SELECT new com.hart.cosettle.user.dto.SearchUserDto(
            u.id AS userId, p.id AS profileId, u.firstName AS firstName,
            u.lastName AS lastName, u.email AS email, p.avatarUrl AS avatarUrl
            ) FROM User u
            INNER JOIN u.profile p
            WHERE LOWER(u.firstName) LIKE %:term% OR LOWER(u.lastName) LIKE %:term%
            AND u.id NOT IN (:userId)
            ORDER BY u.id
                """)
    Page<SearchUserDto> searchUsers(@Param("userId") Long userId, @Param("term") String term, Pageable paging);
}
