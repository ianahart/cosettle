package com.hart.cosettle.favorite;

import com.hart.cosettle.favorite.dto.FavoriteDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query(value = """
            SELECT new com.hart.cosettle.favorite.dto.FavoriteDto(
             f.id AS id, s.id AS spaceId, s.street AS street,
            s.city AS city, s.country AS country
            ) FROM Favorite f
            INNER JOIN f.space s
            INNER JOIN f.user u
            WHERE u.id = :userId
            """)
    Page<FavoriteDto> getFavorites(@Param("userId") Long userId, Pageable pageable);

    @Query(value = """
            SELECT f FROM Favorite f
            INNER JOIN f.user u
            INNER JOIN f.space s
            WHERE u.id = :userId
            AND s.id =:spaceId
              """)
    Page<Favorite> getFavorite(@Param("userId") Long userId, @Param("spaceId") Long spaceId, Pageable pageable);
}
