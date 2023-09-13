package com.hart.cosettle.user;

import java.sql.Timestamp;
import java.util.List;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.hart.cosettle.comment.Comment;
import com.hart.cosettle.friend.Friend;
import com.hart.cosettle.passwordreset.PasswordReset;
import com.hart.cosettle.post.Post;
import com.hart.cosettle.privatemessage.PrivateMessage;
import com.hart.cosettle.profile.Profile;
import com.hart.cosettle.refreshtoken.RefreshToken;
import com.hart.cosettle.space.Space;
import com.hart.cosettle.theme.Theme;
import com.hart.cosettle.token.Token;
import com.hart.cosettle.group.Group;
import com.hart.cosettle.groupmember.GroupMember;
import com.hart.cosettle.like.Like;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "_user")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name = "_user_sequence", sequenceName = "_user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_user_sequence")
    @Column(name = "id")
    private Long id;
    @Column(name = "email", unique = true)
    private String email;
    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "logged_in")
    private boolean loggedIn;

    @Transient
    private String abbreviation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "theme_id", referencedColumnName = "id")
    private Theme theme;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PasswordReset> passwordResets;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Space> spaces;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "friend", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Friend> friends;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Friend> users;

    @OneToMany(mappedBy = "receiver", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrivateMessage> receivers;

    @OneToMany(mappedBy = "sender", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrivateMessage> sender;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Group> adminGroups;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMember> groupMembers;

    @OneToMany(mappedBy = "inviter", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMember> inviters;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    public User() {

    }

    public User(
            Long id,
            String email,
            Timestamp createdAt,
            Timestamp updatedAt,
            String firstName,
            String lastName,
            Role role,
            Theme theme

    ) {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.theme = theme;
    }

    public User(String firstName, String lastName, String email, String password, boolean loggedIn, Role role,
            Profile profile, Theme theme) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
        this.role = role;
        this.profile = profile;
        this.theme = theme;
    }

    public Long getId() {
        return id;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public List<GroupMember> getInviters() {
        return inviters;
    }

    public List<Like> getLikes() {
        return likes;
    }

    public List<GroupMember> getGroupMembers() {
        return groupMembers;
    }

    public List<Group> getAdminGroups() {
        return adminGroups;
    }

    public Theme getTheme() {
        return theme;
    }

    public List<Friend> getUsers() {
        return users;
    }

    public List<Friend> getFriends() {
        return friends;
    }

    public List<Space> getSpaces() {
        return spaces;
    }

    public String getEmail() {
        return email;
    }

    public List<PasswordReset> getPasswordResets() {
        return passwordResets;
    }

    public void setPasswordResets(List<PasswordReset> passwordResets) {
        this.passwordResets = passwordResets;
    }

    public String getAbbreviation() {
        return firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public List<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public Profile getProfile() {
        return profile;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean getLoggedIn() {
        return loggedIn;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Role getRole() {
        return role;
    }

    public String getFirstName() {
        return firstName;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setLoggedIn(boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }

    public void setInviters(List<GroupMember> inviters) {
        this.inviters = inviters;
    }

    public void setGroupMembers(List<GroupMember> groupMembers) {
        this.groupMembers = groupMembers;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void setAdminGroups(List<Group> adminGroups) {

        this.adminGroups = adminGroups;
    }

    public void setSpaces(List<Space> spaces) {
        this.spaces = spaces;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setFriends(List<Friend> friends) {
        this.friends = friends;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void setUsers(List<Friend> users) {
        this.users = users;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
