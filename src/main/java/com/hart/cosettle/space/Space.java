package com.hart.cosettle.space;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hart.cosettle.favorite.Favorite;
import com.hart.cosettle.review.Review;
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

    @JsonManagedReference
    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites;

    @JsonManagedReference
    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

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

    public List<Review> getReviews() {
        return reviews;
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

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((size == null) ? 0 : size.hashCode());
        result = prime * result + ((capacity == null) ? 0 : capacity.hashCode());
        result = prime * result + ((street == null) ? 0 : street.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + ((country == null) ? 0 : country.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((flooring == null) ? 0 : flooring.hashCode());
        result = prime * result + ((wifi == null) ? 0 : wifi.hashCode());
        result = prime * result + ((price == null) ? 0 : price.hashCode());
        result = prime * result + ((days == null) ? 0 : days.hashCode());
        result = prime * result + ((openTime == null) ? 0 : openTime.hashCode());
        result = prime * result + ((closeTime == null) ? 0 : closeTime.hashCode());
        result = prime * result + ((bathrooms == null) ? 0 : bathrooms.hashCode());
        result = prime * result + ((utilities == null) ? 0 : utilities.hashCode());
        result = prime * result + ((food == null) ? 0 : food.hashCode());
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((phoneNumber == null) ? 0 : phoneNumber.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((spacePhotos == null) ? 0 : spacePhotos.hashCode());
        result = prime * result + ((favorites == null) ? 0 : favorites.hashCode());
        result = prime * result + ((reviews == null) ? 0 : reviews.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Space other = (Space) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (updatedAt == null) {
            if (other.updatedAt != null)
                return false;
        } else if (!updatedAt.equals(other.updatedAt))
            return false;
        if (size == null) {
            if (other.size != null)
                return false;
        } else if (!size.equals(other.size))
            return false;
        if (capacity == null) {
            if (other.capacity != null)
                return false;
        } else if (!capacity.equals(other.capacity))
            return false;
        if (street == null) {
            if (other.street != null)
                return false;
        } else if (!street.equals(other.street))
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (type == null) {
            if (other.type != null)
                return false;
        } else if (!type.equals(other.type))
            return false;
        if (country == null) {
            if (other.country != null)
                return false;
        } else if (!country.equals(other.country))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (flooring == null) {
            if (other.flooring != null)
                return false;
        } else if (!flooring.equals(other.flooring))
            return false;
        if (wifi == null) {
            if (other.wifi != null)
                return false;
        } else if (!wifi.equals(other.wifi))
            return false;
        if (price == null) {
            if (other.price != null)
                return false;
        } else if (!price.equals(other.price))
            return false;
        if (days == null) {
            if (other.days != null)
                return false;
        } else if (!days.equals(other.days))
            return false;
        if (openTime == null) {
            if (other.openTime != null)
                return false;
        } else if (!openTime.equals(other.openTime))
            return false;
        if (closeTime == null) {
            if (other.closeTime != null)
                return false;
        } else if (!closeTime.equals(other.closeTime))
            return false;
        if (bathrooms == null) {
            if (other.bathrooms != null)
                return false;
        } else if (!bathrooms.equals(other.bathrooms))
            return false;
        if (utilities == null) {
            if (other.utilities != null)
                return false;
        } else if (!utilities.equals(other.utilities))
            return false;
        if (food == null) {
            if (other.food != null)
                return false;
        } else if (!food.equals(other.food))
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (phoneNumber == null) {
            if (other.phoneNumber != null)
                return false;
        } else if (!phoneNumber.equals(other.phoneNumber))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (spacePhotos == null) {
            if (other.spacePhotos != null)
                return false;
        } else if (!spacePhotos.equals(other.spacePhotos))
            return false;
        if (favorites == null) {
            if (other.favorites != null)
                return false;
        } else if (!favorites.equals(other.favorites))
            return false;
        if (reviews == null) {
            if (other.reviews != null)
                return false;
        } else if (!reviews.equals(other.reviews))
            return false;
        return true;
    }

}
