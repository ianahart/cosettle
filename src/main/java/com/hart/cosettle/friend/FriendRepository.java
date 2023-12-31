package com.hart.cosettle.friend;

import com.hart.cosettle.friend.dto.FriendDto;
import com.hart.cosettle.friend.dto.FriendRequestDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query(value = """
            SELECT fu.id FROM Friend f
            INNER JOIN f.friend fu
            INNER JOIN f.user u
            WHERE u.id = :userId
            AND (LOWER(fu.firstName) = :firstName AND LOWER(fu.lastName) = :lastName)
                """)
    Long searchFriend(@Param("userId") Long userId, @Param("firstName") String firstName,
            @Param("lastName") String lastName);

    @Query(value = """
            SELECT f FROM Friend f
            INNER JOIN f.user u
            INNER JOIN f.friend fu
            WHERE u.id = :userId
            AND fu.id = :friendId
            """)
    Friend getFriendShip(@Param("userId") Long userId, @Param("friendId") Long friendId);

    @Query(value = """
            SELECT new com.hart.cosettle.friend.dto.FriendDto(
             f.id AS id, fu.id AS userId, fu.firstName as firstName,
             fu.lastName AS lastName, p.avatarUrl AS avatarUrl, p.id as profileId
            ) FROM Friend f
             INNER JOIN f.friend fu
             INNER JOIN f.friend.profile p
             INNER JOIN f.user u
             WHERE f.accepted = true
             AND (LOWER(fu.firstName) LIKE %:searchTerm% AND fu.id <> :userId AND u.id = :userId)
             OR (LOWER(fu.lastName) LIKE %:searchTerm% AND fu.id <> :userId AND u.id = :userId)
            """)
    Page<FriendDto> searchFriends(@Param("userId") Long userId, @Param("searchTerm") String searchTerm,
            Pageable paging);

    @Query(value = """
            SELECT new com.hart.cosettle.friend.dto.FriendDto(
             f.id AS id, fu.id AS userId, fu.firstName as firstName,
             fu.lastName AS lastName, p.avatarUrl AS avatarUrl, p.id as profileId
            ) FROM Friend f
             INNER JOIN f.friend fu
             INNER JOIN f.friend.profile p
             INNER JOIN f.user u
             WHERE u.id = :userId
             AND f.accepted = true
            """)
    Page<FriendDto> getFriends(@Param("userId") Long userId, Pageable paging);

    @Query(value = """
                        SELECT new com.hart.cosettle.friend.dto.FriendRequestDto(
                 f.id AS id, u.id AS senderId, u.firstName AS firstName,
                 u.lastName AS lastName, p.avatarUrl AS avatarUrl
                ) FROM Friend f
                INNER JOIN f.user u
                INNER JOIN f.friend fu
                INNER JOIN f.user.profile p
                WHERE fu.id = :userId
                AND f.requested = true
                AND f.accepted = false
            """)
    Page<FriendRequestDto> getFriendRequests(@Param("userId") Long userId, Pageable paging);

    @Query(value = """
            SELECT new com.hart.cosettle.friend.dto.FriendRequestDto(
             f.id AS id, u.id AS senderId, u.firstName AS firstName,
             u.lastName AS lastName, p.avatarUrl AS avatarUrl
            ) FROM Friend f
            INNER JOIN f.user u
            INNER JOIN f.friend fu
            INNER JOIN f.user.profile p
            WHERE u.id = :userId
            AND fu.id = :friendId
            """)
    FriendRequestDto getFriendRequest(@Param("userId") Long userId, @Param("friendId") Long friendId);

    @Query(value = """
            SELECT EXISTS(SELECT 1
                FROM Friend f
                INNER JOIN f.user u
                INNER JOIN f.friend fu
                WHERE u.id = :userId
                AND fu.id = :friendId
                )

                    """)
    boolean duplicateFriendRequest(@Param("userId") Long userId, @Param("friendId") Long friendId);
}
