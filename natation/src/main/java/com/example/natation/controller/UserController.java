package com.example.natation.controller;

import com.example.natation.models.User;
import com.example.natation.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public User ajouter(@RequestBody User user) {
        return userService.ajouterUser(user);
    }

    @GetMapping("/all")
    public List<User> allUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/update/{id}")
    public User modifier(@PathVariable Long id, @RequestBody User user) {
        return userService.modifierUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public void supprimer(@PathVariable Long id) {
        userService.supprimerUser(id);
    }
    @PutMapping("/{userId}/roles/{roleId}")
    public User assignRole(@PathVariable Long userId, @PathVariable Long roleId) {
        return userService.assignRoleToUser(userId, roleId);
    }

}
