package com.hart.cosettle.comment;

import java.sql.Timestamp;

import com.hart.cosettle.post.Post;
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
@Table(name = "comment")
public class Comment {

    @Id
    @SequenceGenerator(name = "comment_sequence", sequenceName = "comment_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "text")
    private String text;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne()
    private User user;

    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @ManyToOne()
    private Post post;

    public Comment() {

    }

    public Comment(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String text) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.text = text;
    }

    public Comment(User user, Post post, String text) {
        this.user = user;
        this.post = post;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public Post getPost() {
        return post;
    }

    public User getUser() {
        return user;
    }

    public String getText() {
        return text;
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

    public void setPost(Post post) {
        this.post = post;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

}
