package com.hart.cosettle.group;

import java.sql.Timestamp;

import com.hart.cosettle.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity()
@Table(name = "_group")
public class Group {

    @Id
    @SequenceGenerator(name = "group_sequence", sequenceName = "group_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "group_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "name")
    private String name;
    @Column(name = "privacy")
    private String privacy;
    @Column(name = "accepted")
    private Boolean accepted;
    @Column(name = "requested")
    private Boolean requested;

    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    @ManyToOne()
    private User admin;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne()
    private User user;

    public Group() {

    }

    public Group(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String name,
            Boolean requested,
            Boolean accepted) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.requested = requested;
        this.accepted = accepted;
    }

    public Group(
            User admin,
            User user,
            String name,
            String privacy,
            Boolean accepted,
            Boolean requested) {
        this.admin = admin;
        this.user = user;
        this.name = name;
        this.privacy = privacy;
        this.accepted = accepted;
        this.requested = requested;
    }

    public Long getId() {
        return id;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public Boolean getRequested() {
        return requested;
    }

    public String getPrivacy() {
        return privacy;
    }

    public String getName() {
        return name;
    }

    public User getUser() {
        return user;
    }

    public User getAdmin() {
        return admin;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;

    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }

}
