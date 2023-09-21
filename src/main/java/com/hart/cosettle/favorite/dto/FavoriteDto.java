package com.hart.cosettle.favorite.dto;

import com.hart.cosettle.spacephoto.SpacePhoto;

public class FavoriteDto {

    private Long id;
    private Long spaceId;
    private String street;
    private String city;
    private String country;
    private SpacePhoto spacePhoto;

    public FavoriteDto() {

    }

    public FavoriteDto(
            Long id,
            Long spaceId,
            String street,
            String city,
            String country) {

        this.id = id;
        this.spaceId = spaceId;
        this.street = street;
        this.city = city;
        this.country = country;
    }

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public String getStreet() {
        return street;
    }

    public String getCountry() {
        return country;
    }

    public Long getSpaceId() {
        return spaceId;
    }

    public SpacePhoto getSpacePhoto() {
        return spacePhoto;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }

    public void setSpacePhoto(SpacePhoto spacePhoto) {
        this.spacePhoto = spacePhoto;
    }
}
