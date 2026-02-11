package com.example.natation.models;



import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
    public class Admin extends User {



        public Admin() {}

        public Admin(String nom, String prenom, String email, String password) {
            super(nom, prenom, email, password);
        }


    }


