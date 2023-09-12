package com.hart.cosettle.post;

import java.sql.Timestamp;

import com.hart.cosettle.group.Group;
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

@Entity()
@Table(name = "post")
public class Post {

    @Id
    @SequenceGenerator(name = "post_sequence", sequenceName = "post_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp()
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "content")
    private String content;
    @Column(name = "url")
    private String url;
    @Column(name = "filename")
    private String filename;

    @JoinColumn(name = "group_id", referencedColumnName = "id")
    @ManyToOne()
    private Group group;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne()
    private User user;

    public Post() {

    }

    public Post(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String content,
            String url,
            String filename) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.content = content;
        this.url = url;
        this.filename = filename;
    }

    public Post(Group group, User user, String content, String url, String filename) {

        this.group = group;
        this.user = user;
        this.content = content;
        this.url = url;
        this.filename = filename;
    }

    public Post(Group group, User user, String content) {
        this.group = group;
        this.user = user;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public User getUser() {
        return user;
    }

    public Group getGroup() {
        return group;
    }

    public String getContent() {
        return content;
    }

    public String getFilename() {
        return filename;
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

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
