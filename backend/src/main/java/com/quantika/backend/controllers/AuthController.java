package com.quantika.backend.controllers;

import com.quantika.backend.model.User;
import com.quantika.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserRepository userRepository;

    @Value("${jwt.secret}")
    private String secret;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String password = body.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Falta correo o contraseña"));
            }

            System.out.println("📩 Email recibido: " + email);
            System.out.println("🔑 Password recibido: " + password);

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                System.out.println("⚠️ Usuario no encontrado");
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Usuario no encontrado"));
            }

            User user = optionalUser.get();
            System.out.println("👤 Usuario encontrado: " + user.getNombre());
            System.out.println("🔒 Contraseña en BD: " + user.getPassword());

            // ✅ Comparar texto plano directamente (sin hash)
            if (!password.equals(user.getPassword())) {
                System.out.println("❌ Contraseña incorrecta");
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Contraseña incorrecta"));
            }

            // ✅ Clave secreta compatible con jjwt 0.11.5
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

            // ✅ Generar token JWT válido por 1 día
            String token = Jwts.builder()
                    .setSubject(String.valueOf(user.getId()))
                    .claim("rol", user.getRol())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "nombre", user.getNombre(),
                    "apellido", user.getApellido(),
                    "email", user.getEmail(),
                    "rol", user.getRol()));

            System.out.println("✅ Login exitoso para: " + email);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("💥 Error en login: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error interno del servidor: " + e.getMessage()));
        }
    }
}
