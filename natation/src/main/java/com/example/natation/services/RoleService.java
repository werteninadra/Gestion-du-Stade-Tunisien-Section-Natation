package com.example.natation.services;

import com.example.natation.models.Role;
import com.example.natation.repo.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role ajouterRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role modifierRole(Long id, Role newRole) {
        return roleRepository.findById(id)
                .map(role -> {
                    role.setNom(newRole.getNom());
                    role.setDescription(newRole.getDescription());
                    return roleRepository.save(role);
                })
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));
    }

    public void supprimerRole(Long id) {
        roleRepository.deleteById(id);
    }
}
