package com.hart.cosettle.spacephoto;

import java.sql.Timestamp;

import com.hart.cosettle.space.Space;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity()
@Table(name = "space_photo")
public class SpacePhoto {

    @Id
    @SequenceGenerator(name = "space_photo_sequence", sequenceName = "space_photo_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "space_photo_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "url", length = 400)
    private String url;
    @Column(name = "filename", length = 400)
    private String filename;
    @ManyToOne()
    @JoinColumn(name = "space_id", referencedColumnName = "id")
    private Space space;

    public SpacePhoto() {

    }

    public SpacePhoto(
            Long id,
            String url,
            String filename,
            Timestamp createdAt) {
        this.id = id;
        this.url = url;
        this.filename = filename;
        this.createdAt = createdAt;
    }

    public SpacePhoto(
            String url,
            String filename,
            Space space) {
        this.url = url;
        this.filename = filename;
        this.space = space;

    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public Space getSpace() {
        return space;
    }

    public String getFilename() {
        return filename;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}
