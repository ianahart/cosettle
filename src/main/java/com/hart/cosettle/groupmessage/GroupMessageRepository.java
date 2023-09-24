package com.hart.cosettle.groupmessage;

import java.util.List;

import com.hart.cosettle.groupmessage.dto.GroupMessageDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMessageRepository extends JpaRepository<GroupMessage, Long> {

    @Query(value = """
                    SELECT new com.hart.cosettle.groupmessage.dto.GroupMessageDto(
                     gm.id AS id, u.id AS userId, u.firstName AS firstName,
                     u.lastName AS lastName, p.avatarUrl AS avatarUrl, gm.message AS message,
                     g.id AS groupId

                    ) FROM GroupMessage gm
                    INNER JOIN gm.user u
                    INNER JOIN gm.group g
                    INNER JOIN gm.user.profile p
                    WHERE g.id = :groupId
                    ORDER BY gm.id DESC LIMIT 50
            """)
    List<GroupMessageDto> getGroupMessages(@Param("groupId") Long groupId);

    @Query(value = """
                SELECT new com.hart.cosettle.groupmessage.dto.GroupMessageDto(
                 gm.id AS id, u.id AS userId, u.firstName AS firstName,
                 u.lastName AS lastName, p.avatarUrl AS avatarUrl, gm.message AS message,
                 g.id AS groupId

                ) FROM GroupMessage gm
                INNER JOIN gm.user u
                INNER JOIN gm.group g
                INNER JOIN gm.user.profile p
                WHERE gm.id = :id
            """)
    GroupMessageDto getGroupMessage(@Param("id") Long id);
}
