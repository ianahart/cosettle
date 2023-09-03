package com.hart.cosettle.friend;

import java.sql.Timestamp;

import com.hart.cosettle.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "friend")
public class Friend {

    @Id
    @SequenceGenerator(name = "friend_sequence", sequenceName = "friend_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "friend_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne()
    private User user;
    @ManyToOne()
    @JoinColumn(name = "friend_id", referencedColumnName = "id")
    private User friend;
    @Column(name = "requested")
    private Boolean requested;
    @Column(name = "accepted")
    private Boolean accepted;

    public Friend() {

    }

    public Friend(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            User user,
            User friend,
            Boolean requested,
            Boolean accepted) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
        this.friend = friend;
        this.requested = requested;
        this.accepted = accepted;
    }

    public Friend(
            User user,
            User friend,
            Boolean requested,
            Boolean accepted) {
        this.user = user;
        this.friend = friend;
        this.requested = requested;
        this.accepted = accepted;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public User getFriend() {
        return friend;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public Boolean getRequested() {
        return requested;
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

    public void setFriend(User friend) {
        this.friend = friend;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

}
