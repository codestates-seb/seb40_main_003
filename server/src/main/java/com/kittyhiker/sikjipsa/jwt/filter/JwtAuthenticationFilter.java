package com.kittyhiker.sikjipsa.jwt.filter;

import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.jwt.token.JwtAuthenticationToken;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String jwt = request.getHeader("Authorization");
//
//        if (StringUtils.hasText(jwt)) {
//            String token = getToken(jwt);
//            getAuthentication(token);
//            filterChain.doFilter(request, response);
//        } else {
//            filterChain.doFilter(request, response);
//        }
        String token = getToken(request);
        try {
            if (StringUtils.hasText(token)) {
                getAuthentication(token);
            }
        }
        catch (SecurityException | MalformedJwtException e) {
            request.setAttribute("exception", ExceptionCode.WRONG_TOKEN);
            log.error("Wrong Token // token : {}", token);
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", ExceptionCode.EXPIRED_TOKEN);
            log.error("EXPIRED Token // token : {}", token);
        } catch (UnsupportedJwtException e) {
            request.setAttribute("exception", ExceptionCode.UNSUPPORTED_TOKEN);
            log.error("Unsupported Token // token : {}", token);
        } catch (IllegalArgumentException e) {
            request.setAttribute("exception", ExceptionCode.WRONG_TOKEN);
            log.error("Wrong Token // token : {}", token);
        } catch (Exception e) {
            log.error("====================================================");
            log.error("JwtFilter - doFilterInternal() 오류 발생");
            log.error("token : {}", token);
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception StackTrace : {");
            e.printStackTrace();
            log.error("}");
            log.error("====================================================");
        }
        filterChain.doFilter(request, response);
    }

    private void getAuthentication(String token) {
        JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(token);
        authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext()
                .setAuthentication(authenticationToken);
    }

//    private String getToken(String jwt) {
//        String[] jwtArr = jwt.split(" ");
//        return jwtArr[1];
//    }

    private String getToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer")){
            String[] arr = authorization.split(" ");
            return arr[1];
        }
        return null;
    }
}
