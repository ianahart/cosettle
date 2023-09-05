package com.hart.cosettle.privatemessage;

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
@Table(name = "private_message")
public class PrivateMessage {

    @Id
    @SequenceGenerator(name = "private_message_sequence", sequenceName = "private_message_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "private_message_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp()
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp()
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "message", length = 200)
    private String message;
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    @ManyToOne
    private User sender;
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    @ManyToOne
    private User receiver;

    public PrivateMessage() {

    }

    public PrivateMessage(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String message) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.message = message;
    }

    public PrivateMessage(String message, User sender, User receiver) {
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
    }

    public Long getId() {
        return id;
    }

    public User getSender() {
        return sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public String getMessage() {
        return message;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

}
