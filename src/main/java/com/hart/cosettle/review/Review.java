package com.hart.cosettle.review;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hart.cosettle.space.Space;
import com.hart.cosettle.user.User;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @SequenceGenerator(name = "review_sequence", sequenceName = "review_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "rating")
    private Integer rating;
    @Column(name = "text")
    private String text;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "space_id", referencedColumnName = "id")
    private Space space;

    public Review() {

    }

    public Review(
            Long id,
            Timestamp createdAt,
            Integer rating,
            String text) {

        this.id = id;
        this.createdAt = createdAt;
        this.rating = rating;
        this.text = text;
    }

    public Review(
            User user,
            Space space,
            Integer rating,
            String text) {
        this.user = user;
        this.space = space;
        this.rating = rating;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }

    public Space getSpace() {
        return space;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Integer getRating() {
        return rating;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}
