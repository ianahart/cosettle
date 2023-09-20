package com.hart.cosettle.space;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hart.cosettle.spacephoto.SpacePhoto;
import com.hart.cosettle.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.mapping.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity()
@Table(name = "space")
public class Space {

    @Id
    @SequenceGenerator(name = "space_sequence", sequenceName = "space_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "space_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "size", length = 100)
    private String size;
    @Column(name = "capacity", length = 100)
    private String capacity;
    @Column(name = "street", length = 250)
    private String street;
    @Column(name = "city", length = 250)
    private String city;
    @Column(name = "type")
    private String type;
    @Column(name = "country")
    private String country;
    @Column(name = "description", length = 300)
    private String description;
    @Column(name = "flooring", length = 100)
    private String flooring;
    @Column(name = "wifi", length = 50)
    private String wifi;
    @Column(name = "price", length = 50)
    private String price;
    @Column(name = "days", length = 300)
    private String days;
    @Column(name = "open_time")
    private String openTime;
    @Column(name = "close_time")
    private String closeTime;
    @Column(name = "bathrooms")
    private Boolean bathrooms;
    @Column(name = "utilities")
    private Boolean utilities;
    @Column(name = "food")
    private Boolean food;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SpacePhoto> spacePhotos;

    public Space() {

    }

    public Space(
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

    public Space(
            User user,
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
        this.user = user;
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

    public List<SpacePhoto> getSpacePhotos() {
        return spacePhotos;
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

    public User getUser() {
        return user;
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

    public String getCity() {
        return city;
    }

    public String getType() {
        return type;
    }

    public String getCountry() {
        return country;
    }

    public String getStreet() {
        return street;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setSpacePhotos(List<SpacePhoto> spacePhotos) {
        this.spacePhotos = spacePhotos;
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

    public void setUser(User user) {
        this.user = user;
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

    public void setCity(String city) {
        this.city = city;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setCountry(String country) {
        this.country = country;
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

}
