package com.example.natation;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Clé sécurisée générée automatiquement pour HS256
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long EXPIRATION_MS = 1000 * 60 * 60 * 10; // 10h

    // Générer un token JWT
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(key)
                .compact();
    }

    // Extraire le username (email) depuis le token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Valider le token
    public boolean validateToken(String token) {
        return !getClaims(token).getExpiration().before(new Date());
    }

    // Extraire les claims
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
