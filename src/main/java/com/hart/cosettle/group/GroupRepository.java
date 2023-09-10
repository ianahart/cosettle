package com.hart.cosettle.group;

import com.hart.cosettle.group.dto.GroupDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query(value = """
            SELECT DISTINCT new com.hart.cosettle.group.dto.GroupDto(
            g.id AS id, a.id AS adminId, g.createdAt AS createdAt,
            g.name AS name,
            g.url AS url, g.privacy AS privacy

            ) FROM Group g
            INNER JOIN g.admin a
            WHERE g.id = :groupId
            ORDER BY g.name

                """)

    GroupDto getGroup(@Param("groupId") Long groupId);

    @Query(value = """
            SELECT DISTINCT new com.hart.cosettle.group.dto.GroupDto(
            g.id AS id, a.id AS adminId, g.createdAt AS createdAt,
            g.name AS name,
            g.url AS url, g.privacy AS privacy

            ) FROM Group g
            INNER JOIN g.admin a
            WHERE a.id = :adminId
            ORDER BY g.name

                """)
    Page<GroupDto> getAdminGroups(@Param("adminId") Long adminId, Pageable paging);

    @Query(value = """
              SELECT EXISTS(SELECT 1
                FROM Group g
                INNER JOIN g.admin a
                WHERE a.id = :adminId
                AND g.name = :groupName
                )
            """)
    boolean checkIfUserInGroupAlready(@Param("adminId") Long adminId,
            @Param("groupName") String groupName);
}
