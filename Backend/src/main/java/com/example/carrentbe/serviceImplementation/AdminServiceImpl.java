package com.example.carrentbe.serviceImplementation;

import com.example.carrentbe.model.Admin;
import com.example.carrentbe.repository.AdminRepository;
import com.example.carrentbe.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;


    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }



    @Override
    public Admin getAdminById(Long id) {
        // Retrieve an admin by ID and clear the password before returning
        return adminRepository.findById(id)
                .map(admin -> {
                    admin.setPassword(null);
                    return admin;
                })
                .orElse(null); // Return null or throw a custom exception if the admin is not found
    }

    @Override
    public void deleteAdmin(Long id) {
        // Delete the admin if it exists
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        } else {
            // Handle the case where the admin doesn't exist or log this event
        }
    }

    @Override
    public boolean checkAdminCredentials(String email, String rawPassword) {
        // Check the admin's credentials
        System.out.println("Email: " + email + " Password: " + rawPassword);
        System.out.println("elzeft ::");
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            String storedPassword = admin.getPassword(); // Assuming getPassword() returns the stored plain text password
            // Compare the rawPassword directly with the storedPassword
            return rawPassword.equals(storedPassword);
        } else {
            return false; // Return false if the admin is not found
        }
    }

    @Override
    public Admin getAdminByEmail(String email) {
        // Retrieve an admin by email
        return adminRepository.findByEmail(email).orElse(null);
    }

    // Additional methods and business logic...
}
