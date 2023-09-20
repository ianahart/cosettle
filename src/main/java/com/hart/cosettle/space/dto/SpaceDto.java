package com.hart.cosettle.space.dto;

import java.sql.Timestamp;
import java.util.List;

import com.hart.cosettle.spacephoto.SpacePhoto;

public class SpaceDto {
    Long id;
    Timestamp createdAt;
    Timestamp updatedAt;
    String size;
    String capacity;
    String street;
    String city;
    String country;
    String type;
    String description;
    String flooring;
    String wifi;
    String price;
    String days;
    String openTime;
    String closeTime;
    Boolean bathrooms;
    Boolean utilities;
    Boolean food;
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    List<SpacePhoto> photos;

    public SpaceDto() {

    }

    public SpaceDto(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String size,
            String capacity,
            String street,
            String city,
            String country,
            String type,
            String description,
            String flooring,
            String wifi,
            String price,
            String days,
            String openTime,
            String closeTime,
            Boolean bathrooms,
            Boolean utilities,
            Boolean food,
            String firstName,
            String lastName,
            String email,
            String phoneNumber) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.size = size;
        this.capacity = capacity;
        this.street = street;
        this.city = city;
        this.country = country;
        this.type = type;
        this.description = description;
        this.flooring = flooring;
        this.wifi = wifi;
        this.price = price;
        this.days = days;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.bathrooms = bathrooms;
        this.utilities = utilities;
        this.food = food;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public String getDays() {
        return days;
    }

    public Boolean getFood() {
        return food;
    }

    public String getSize() {
        return size;
    }

    public String getType() {
        return type;
    }

    public String getWifi() {
        return wifi;
    }

    public String getEmail() {
        return email;
    }

    public String getPrice() {
        return price;
    }

    public String getStreet() {
        return street;
    }

    public String getCountry() {
        return country;
    }

    public String getCapacity() {
        return capacity;
    }

    public String getFlooring() {
        return flooring;
    }

    public String getLastName() {
        return lastName;
    }

    public String getOpenTime() {
        return openTime;
    }

    public Boolean getBathrooms() {
        return bathrooms;
    }

    public String getCloseTime() {
        return closeTime;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getFirstName() {
        return firstName;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Boolean getUtilities() {
        return utilities;
    }

    public String getDescription() {
        return description;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public List<SpacePhoto> getPhotos() {
        return photos;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public void setFood(Boolean food) {
        this.food = food;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setWifi(String wifi) {
        this.wifi = wifi;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public void setFlooring(String flooring) {
        this.flooring = flooring;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setOpenTime(String openTime) {
        this.openTime = openTime;
    }

    public void setBathrooms(Boolean bathrooms) {
        this.bathrooms = bathrooms;
    }

    public void setCloseTime(String closeTime) {
        this.closeTime = closeTime;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setUtilities(Boolean utilities) {
        this.utilities = utilities;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPhotos(List<SpacePhoto> photos) {
        this.photos = photos;
    }

}
