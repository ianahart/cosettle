package com.hart.cosettle.groupmember;

import com.hart.cosettle.groupmember.dto.InviteDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

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
