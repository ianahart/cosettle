package com.hart.cosettle.theme;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hart.cosettle.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity()
@Table(name = "theme")
public class Theme {

    @Id
    @SequenceGenerator(name = "theme_sequence", sequenceName = "theme_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "theme_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "theme")
    private String theme;
    @JsonIgnore
    @OneToOne(mappedBy = "theme", cascade = CascadeType.ALL)
    private User user;

    public Theme() {

    }

    public Theme(String theme) {
         this.theme = theme;
    }

    public Theme(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String theme) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.theme = theme;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getTheme() {
        return theme;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
