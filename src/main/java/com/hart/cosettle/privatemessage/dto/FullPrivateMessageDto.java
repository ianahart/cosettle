package com.hart.cosettle.privatemessage.dto;

import java.sql.Timestamp;

public class FullPrivateMessageDto {
    private Long id;
    private String message;
    private String senderAvatarUrl;
    private String receiverAvatarUrl;
    private String receiverFirstName;
    private String receiverLastName;
    private Long senderUserId;
    private Long receiverUserId;
    private Timestamp createdAt;

    public FullPrivateMessageDto() {

    }

    public FullPrivateMessageDto(
            Long id,
            String message,
            String senderAvatarUrl,
            String receiverAvatarUrl,
            String receiverFirstName,
            String receiverLastName,
            Long senderUserId,
            Long receiverUserId,
            Timestamp createdAt) {
        this.id = id;
        this.message = message;
        this.senderAvatarUrl = senderAvatarUrl;
        this.receiverAvatarUrl = receiverAvatarUrl;
        this.receiverFirstName = receiverFirstName;
        this.receiverLastName = receiverLastName;
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getSenderUserId() {
        return senderUserId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Long getReceiverUserId() {
        return receiverUserId;
    }

    public String getSenderAvatarUrl() {
        return senderAvatarUrl;
    }

    public String getReceiverLastName() {
        return receiverLastName;
    }

    public String getReceiverAvatarUrl() {
        return receiverAvatarUrl;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSenderAvatarUrl(String senderAvatarUrl) {
        this.senderAvatarUrl = senderAvatarUrl;
    }

    public void setReceiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
    }

    public void setReceiverAvatarUrl(String receiverAvatarUrl) {
        this.receiverAvatarUrl = receiverAvatarUrl;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public void setSenderUserId(Long senderUserId) {
        this.senderUserId = senderUserId;
    }

    public void setReceiverUserId(Long receiverUserId) {
        this.receiverUserId = receiverUserId;
    }
}
