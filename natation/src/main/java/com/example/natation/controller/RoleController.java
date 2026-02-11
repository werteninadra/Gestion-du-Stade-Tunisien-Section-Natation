package com.example.natation.controller;

import com.example.natation.models.Role;
import com.example.natation.services.RoleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/add")
    public Role ajouter(@RequestBody Role role) {
        return roleService.ajouterRole(role);
    }

    @GetMapping("/all")
    public List<Role> allRoles() {
        return roleService.getAllRoles();
    }

    @PutMapping("/update/{id}")
    public Role modifier(@PathVariable Long id, @RequestBody Role role) {
        return roleService.modifierRole(id, role);
    }

    @DeleteMapping("/delete/{id}")
    public void supprimer(@PathVariable Long id) {
        roleService.supprimerRole(id);
    }
}
