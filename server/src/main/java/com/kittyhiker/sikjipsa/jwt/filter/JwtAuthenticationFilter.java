package com.kittyhiker.sikjipsa.jwt.filter;

import com.kittyhiker.sikjipsa.jwt.token.JwtAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader("Authorization");

        if (StringUtils.hasText(jwt)) {
            String token = getToken(jwt);
            getAuthentication(token);
            filterChain.doFilter(request, response);
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private void getAuthentication(String token) {
        JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(token);
        authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext()
                .setAuthentication(authenticationToken);
    }

    private String getToken(String jwt) {
        String[] jwtArr = jwt.split(" ");
        return jwtArr[1];
    }
}
