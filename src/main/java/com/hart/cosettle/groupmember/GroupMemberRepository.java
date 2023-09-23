package com.hart.cosettle.groupmember;

import java.util.List;

import com.hart.cosettle.groupmember.dto.GroupMemberDto;
import com.hart.cosettle.groupmember.dto.InviteDto;
import com.hart.cosettle.groupmember.dto.JoinedGroupDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    @Query(value = """
              SELECT m.id FROM GroupMember gm
              INNER JOIN gm.member m
              INNER JOIN gm.group g
              WHERE g.id = :groupId
            """)
    List<Long> getGroupMemberUserIds(@Param("groupId") Long groupId);

    @Query(value = """
            SELECT EXISTS(SELECT 1 FROM GroupMember gm
             INNER JOIN gm.member m
             INNER JOIN gm.group g
             WHERE m.id = :userId
             AND g.id = :groupId
            )
                """)
    boolean checkIfGroupMember(@Param("userId") Long userId, @Param("groupId") Long groupId);

    @Query(value = """
            SELECT new com.hart.cosettle.groupmember.dto.GroupMemberDto(
             gm.id AS id, m.id AS userId, p.id AS profileId, m.firstName as firstName,
             m.lastName AS lastName, p.avatarUrl as url
            ) FROM GroupMember gm
            INNER JOIN gm.group g
            INNER JOIN gm.member m
            INNER JOIN gm.member.profile p
            WHERE g.id = :groupId
            AND gm.accepted = true
             """)
    Page<GroupMemberDto> getGroupMembers(@Param("groupId") Long groupId, Pageable paging);

    @Query(value = """
            SELECT new com.hart.cosettle.groupmember.dto.JoinedGroupDto(
              gm.id AS id, g.id AS groupId, g.url AS url, g.name AS groupName,
              g.privacy AS groupPrivacy, a.id AS adminId
            ) FROM GroupMember gm
              INNER JOIN gm.member m
              INNER JOIN gm.group g
              INNER JOIN gm.group.admin a
              WHERE m.id = :userId
              AND  gm.accepted = true
            """)
    Page<JoinedGroupDto> getJoinedGroups(@Param("userId") Long userId, Pageable paging);

    @Query(value = """
            SELECT new com.hart.cosettle.groupmember.dto.InviteDto(
            gm.id AS id, g.url AS url, g.name AS name, i.firstName as adminFirstName,
            i.lastName AS adminLastName
            ) FROM GroupMember gm
            INNER JOIN gm.group g
            INNER JOIN gm.inviter i
            INNER JOIN gm.member m
            WHERE m.id = :userId
            AND gm.accepted = false
            AND gm.requested = true
                """)
    Page<InviteDto> getInvites(@Param("userId") Long userId, Pageable paging);

}
