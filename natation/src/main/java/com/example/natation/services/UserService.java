package com.example.natation.services;

import com.example.natation.models.Role;
import com.example.natation.models.User;
import com.example.natation.repo.RoleRepository;
import com.example.natation.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder; // <-- ajouter cette ligne

    // Injecter PasswordEncoder dans le constructeur
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder; // <-- assigner ici
    }

    public User ajouterUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // encode le mot de passe
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User modifierUser(Long id, User newUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setNom(newUser.getNom());
                    user.setPrenom(newUser.getPrenom());
                    user.setEmail(newUser.getEmail());
                    // encoder le mot de passe seulement si non vide
                    if (newUser.getPassword() != null && !newUser.getPassword().isEmpty()) {
                        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
                    }
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User non trouvé"));
    }

    public void supprimerUser(Long id) {
        userRepository.deleteById(id);
    }

    public User assignRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User non trouvé"));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));

        user.getRoles().add(role);
        return userRepository.save(user);
    }
}
