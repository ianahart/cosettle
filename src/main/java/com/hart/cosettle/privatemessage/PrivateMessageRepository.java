package com.hart.cosettle.privatemessage;

import com.hart.cosettle.privatemessage.dto.FullPrivateMessageDto;
import com.hart.cosettle.privatemessage.dto.PrivateMessageDto;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Long> {

    @Query(value = """
             SELECT new com.hart.cosettle.privatemessage.dto.FullPrivateMessageDto(
             pm.id, pm.message, sp.avatarUrl AS senderAvatarUrl,
             rp.avatarUrl AS receiverAvatarUrl, r.firstName AS receiverFirstName,
             r.lastName AS receiverLastName, s.id AS senderUserId, r.id AS receiverUserId,
             pm.createdAt
                ) FROM PrivateMessage pm
              INNER JOIN pm.sender s
              INNER JOIN pm.receiver r
              INNER JOIN pm.sender.profile sp
              INNER JOIN pm.receiver.profile rp
                WHERE s.id = :userId
                AND r.id = :friendId
                AND pm.id = :id
            """)
    FullPrivateMessageDto getPrivateMessage(@Param("userId") Long userId, @Param("friendId") Long friendId,
            @Param("id") Long id);

    @Query("""
            SELECT new com.hart.cosettle.privatemessage.dto.FullPrivateMessageDto(
             pm.id, pm.message, sp.avatarUrl AS senderAvatarUrl,
             rp.avatarUrl AS receiverAvatarUrl, r.firstName AS receiverFirstName,
             r.lastName AS receiverLastName, s.id AS senderUserId, r.id AS receiverUserId,
             pm.createdAt

            ) FROM PrivateMessage pm
              INNER JOIN pm.sender s
              INNER JOIN pm.receiver r
              INNER JOIN pm.sender.profile sp
              INNER JOIN pm.receiver.profile rp
              WHERE (r.id = :friendId AND s.id = :userId)
              OR (r.id = :userId AND s.id = :friendId)
              ORDER BY pm.id DESC LIMIT 50
                    """)

    List<FullPrivateMessageDto> getPrivateMessages(@Param("friendId") Long friendId,
            @Param("userId") Long userId);

}
