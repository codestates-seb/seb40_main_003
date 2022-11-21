package com.kittyhiker.sikjipsa.jwt.repository;

import com.kittyhiker.sikjipsa.jwt.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findRefreshTokenByValue(String value);
    void deleteRefreshTokenByValue(String value);
}
