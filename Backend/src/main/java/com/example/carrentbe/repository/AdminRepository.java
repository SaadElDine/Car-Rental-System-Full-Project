package com.example.carrentbe.repository;

import com.example.carrentbe.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Custom query method to find an admin by email using JPQL

    @Query("SELECT a FROM Admin a WHERE a.email = :email")
    Optional<Admin> findByEmail(String email);

    // Method to retrieve all admins
    @Query("SELECT a FROM Admin a")
    List<Admin> getAllAdmins();
}
