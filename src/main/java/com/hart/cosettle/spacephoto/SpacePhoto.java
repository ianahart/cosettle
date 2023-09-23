package com.hart.cosettle.spacephoto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @JsonBackReference
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((url == null) ? 0 : url.hashCode());
        result = prime * result + ((filename == null) ? 0 : filename.hashCode());
        result = prime * result + ((space == null) ? 0 : space.hashCode());
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
        SpacePhoto other = (SpacePhoto) obj;
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
        if (url == null) {
            if (other.url != null)
                return false;
        } else if (!url.equals(other.url))
            return false;
        if (filename == null) {
            if (other.filename != null)
                return false;
        } else if (!filename.equals(other.filename))
            return false;
        if (space == null) {
            if (other.space != null)
                return false;
        } else if (!space.equals(other.space))
            return false;
        return true;
    }

}
