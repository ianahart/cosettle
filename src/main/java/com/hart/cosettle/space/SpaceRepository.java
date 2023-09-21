package com.hart.cosettle.space;

import com.hart.cosettle.space.dto.SpaceDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {

    @Query(value = """
            SELECT new com.hart.cosettle.space.dto.SpaceDto(
            s.id AS id, s.createdAt AS createdAt, s.updatedAt AS updatedAt, s.size AS size, s.capacity AS capacity,
            s.street AS street, s.city AS city, s.country AS country,
            s.type AS type, s.description AS description, s.flooring AS flooring,
            s.wifi AS wifi, s.price AS price, s.days AS days, s.openTime AS openTime,
            s.closeTime AS closeTime, s.bathrooms AS bathrooms, s.utilities AS utilities,
            s.food AS food, s.firstName AS firstName, s.lastName AS lastName, s.email AS email,
            s.phoneNumber AS phoneNumber
            ) FROM Space s
            WHERE LOWER(s.country) = :country
                    """)

    Page<SpaceDto> getAllBySpaces(@Param("country") String country, Pageable pageable);

    @Query(value = """
            SELECT new com.hart.cosettle.space.dto.SpaceDto(
            s.id AS id, s.createdAt AS createdAt, s.updatedAt AS updatedAt, s.size AS size, s.capacity AS capacity,
            s.street AS street, s.city AS city, s.country AS country,
            s.type AS type, s.description AS description, s.flooring AS flooring,
            s.wifi AS wifi, s.price AS price, s.days AS days, s.openTime AS openTime,
            s.closeTime AS closeTime, s.bathrooms AS bathrooms, s.utilities AS utilities,
            s.food AS food, s.firstName AS firstName, s.lastName AS lastName, s.email AS email,
            s.phoneNumber AS phoneNumber
            ) FROM Space s
            WHERE s.type = :spaceType
                    """)

    Page<SpaceDto> getAllByCountries(@Param("spaceType") String spaceType, Pageable pageable);

    @Query(value = """
            SELECT new com.hart.cosettle.space.dto.SpaceDto(
            s.id AS id, s.createdAt AS createdAt, s.updatedAt AS updatedAt, s.size AS size, s.capacity AS capacity,
            s.street AS street, s.city AS city, s.country AS country,
            s.type AS type, s.description AS description, s.flooring AS flooring,
            s.wifi AS wifi, s.price AS price, s.days AS days, s.openTime AS openTime,
            s.closeTime AS closeTime, s.bathrooms AS bathrooms, s.utilities AS utilities,
            s.food AS food, s.firstName AS firstName, s.lastName AS lastName, s.email AS email,
            s.phoneNumber AS phoneNumber
            ) FROM Space s
                    """)

    Page<SpaceDto> getAllSpaces(Pageable pageable);

    @Query(value = """
            SELECT new com.hart.cosettle.space.dto.SpaceDto(
            s.id AS id, s.createdAt AS createdAt, s.updatedAt AS updatedAt, s.size AS size, s.capacity AS capacity,
            s.street AS street, s.city AS city, s.country AS country,
            s.type AS type, s.description AS description, s.flooring AS flooring,
            s.wifi AS wifi, s.price AS price, s.days AS days, s.openTime AS openTime,
            s.closeTime AS closeTime, s.bathrooms AS bathrooms, s.utilities AS utilities,
            s.food AS food, s.firstName AS firstName, s.lastName AS lastName, s.email AS email,
            s.phoneNumber AS phoneNumber
            ) FROM Space s
                WHERE LOWER(s.country) = :country
                AND s.type = :spaceType
                AND LOWER(s.city) = :city
                    """)

    Page<SpaceDto> getSpaces(@Param("country") String country,
            @Param("spaceType") String spaceType, @Param("city") String city, Pageable paging);

    @Query(value = """
            SELECT new com.hart.cosettle.space.dto.SpaceDto(
            s.id AS id, s.createdAt AS createdAt, s.updatedAt AS updatedAt, s.size AS size, s.capacity AS capacity,
            s.street AS street, s.city AS city, s.country AS country,
            s.type AS type, s.description AS description, s.flooring AS flooring,
            s.wifi AS wifi, s.price AS price, s.days AS days, s.openTime AS openTime,
            s.closeTime AS closeTime, s.bathrooms AS bathrooms, s.utilities AS utilities,
            s.food AS food, s.firstName AS firstName, s.lastName AS lastName, s.email AS email,
            s.phoneNumber AS phoneNumber
            ) FROM Space s
            WHERE s.id = :id
                    """)

    SpaceDto getSpace(@Param("id") Long id);

}
