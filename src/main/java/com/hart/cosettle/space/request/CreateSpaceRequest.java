package com.hart.cosettle.space.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateSpaceRequest {

    @Size(min = 1, max = 100, message = "Size must be between 1 and 100 characters")
    private String size;
    @Size(min = 1, max = 100, message = "Capacity must be between 1 and 100 characters")
    private String capacity;
    @Size(min = 1, max = 250, message = "Location must be between 1 and 250 characters")
    private String location;
    @Size(min = 1, max = 300, message = "Description must be between 1 and 300 characters")
    private String description;
    @Size(min = 1, max = 100, message = "Flooring must be between 1 and 100 characters")
    private String flooring;
    @Size(min = 1, max = 50, message = "Wifi must be between 1 and 50 characters")
    private String wifi;
    @Size(min = 1, max = 50, message = "Price must be between 1 and 50 characters")
    private String price;
    @Size(min = 1, max = 300, message = "Days must be between 1 and 300 characters")
    private String days;
    private String openTime;
    private String closeTime;
    private String bathrooms;
    private String utilities;
    private String food;
    @Size(min = 1, max = 200, message = "First name must be between 1 and 200 characters")
    private String firstName;
    @Size(min = 1, max = 200, message = "Last name must be between 1 and 200 characters")
    private String lastName;
    @Size(min = 1, message = "Email must not be empty")
    @Email
    private String email;
    @Pattern(regexp = "^(\\d{3}[- .]?){2}\\d{4}$", message = "Please provide a valid phone number")
    private String phoneNumber;

    public CreateSpaceRequest() {

    }

    public CreateSpaceRequest(
            String size,
            String capacity,
            String location,
            String description,
            String flooring,
            String wifi,
            String price,
            String days,
            String openTime,
            String closeTime,
            String bathrooms,
            String utilities,
            String food,
            String firstName,
            String lastName,
            String email,
            String phoneNumber) {
        this.size = size;
        this.capacity = capacity;
        this.location = location;
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

    public String getDays() {
        return days;
    }

    public String getFood() {
        return food;
    }

    public String getSize() {
        return size;
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

    public String getCapacity() {
        return capacity;
    }

    public String getFlooring() {
        return flooring;
    }

    public String getLastName() {
        return lastName;
    }

    public String getLocation() {
        return location;
    }

    public String getOpenTime() {
        return openTime;
    }

    public String getBathrooms() {
        return bathrooms;
    }

    public String getCloseTime() {
        return closeTime;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getUtilities() {
        return utilities;
    }

    public String getDescription() {
        return description;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public void setSize(String size) {
        this.size = size;
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

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public void setFlooring(String flooring) {
        this.flooring = flooring;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setOpenTime(String openTime) {
        this.openTime = openTime;
    }

    public void setBathrooms(String bathrooms) {
        this.bathrooms = bathrooms;
    }

    public void setCloseTime(String closeTime) {
        this.closeTime = closeTime;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setUtilities(String utilities) {
        this.utilities = utilities;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
