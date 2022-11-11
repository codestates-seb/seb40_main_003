package com.kittyhiker.sikjipsa.member.entiry;

import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member extends AuditingEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;
    private String password;
    private String nickname;
    private String roles;

    public List<String> getRolesToList() {
        return Arrays.stream(this.roles.split(",")).collect(Collectors.toList());
    }

    public void addRole(String roles) {
        this.roles = roles;
    }

    public void encryptingPassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.getPassword());
    }

}
