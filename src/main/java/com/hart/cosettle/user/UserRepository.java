package com.hart.cosettle.user;

import java.util.Optional;

import com.hart.cosettle.user.dto.SearchUserDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query(value = """
            SELECT new com.hart.cosettle.user.dto.SearchUserDto(
            u.id AS userId, p.id AS profileId, u.firstName AS firstName,
            u.lastName AS lastName, u.email AS email, p.avatarUrl AS avatarUrl
            ) FROM User u
            INNER JOIN u.profile p
            WHERE u.id <> :userId
            AND LOWER(u.firstName) LIKE %:term% OR LOWER(u.lastName) LIKE %:term%
            ORDER BY u.id
                """)
    Page<SearchUserDto> searchUsers(@Param("userId") Long userId, @Param("term") String term, Pageable paging);
}
