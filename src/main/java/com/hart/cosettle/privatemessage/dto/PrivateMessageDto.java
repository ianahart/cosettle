package com.hart.cosettle.privatemessage.dto;

import java.sql.Timestamp;

public class PrivateMessageDto {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String senderFirstName;
    private String senderLastName;
    private String senderAvatarUrl;
    private Timestamp createdAt;

    public PrivateMessageDto() {

    }

    public PrivateMessageDto(
            Long id,
            Long senderId,
            Long receiverId,
            String senderFirstName,
            String senderLastName,
            String senderAvatarUrl,
            Timestamp createdAt) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderFirstName = senderFirstName;
        this.senderLastName = senderLastName;
        this.senderAvatarUrl = senderAvatarUrl;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public String getSenderLastName() {
        return senderLastName;
    }

    public String getSenderAvatarUrl() {
        return senderAvatarUrl;
    }

    public String getSenderFirstName() {
        return senderFirstName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public void setSenderLastName(String senderLastName) {
        this.senderLastName = senderLastName;
    }

    public void setSenderAvatarUrl(String senderAvatarUrl) {
        this.senderAvatarUrl = senderAvatarUrl;
    }

    public void setSenderFirstName(String senderFirstName) {
        this.senderFirstName = senderFirstName;
    }
}
