package com.hart.cosettle.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    @Query(value = """
              SELECT EXISTS(SELECT 1
                FROM Group g
                INNER JOIN g.admin a
                INNER JOIN g.user u
                WHERE a.id = :adminId
                AND u.id = :userId
                AND g.name = :groupName
                )
            """)
    boolean checkIfUserInGroupAlready(@Param("adminId") Long adminId, @Param("userId") Long userId,
            @Param("groupName") String groupName);
}
