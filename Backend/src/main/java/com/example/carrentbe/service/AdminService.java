package com.example.carrentbe.service;

import com.example.carrentbe.model.Admin;
import java.util.List;

public interface AdminService {



    // Retrieve an admin by ID
    Admin getAdminById(Long id);


    // Delete an admin by ID
    void deleteAdmin(Long id);

    // Check admin credentials for login
    boolean checkAdminCredentials(String email, String rawPassword);

    // Additional methods specific to Admin can be added here
    // For example, changing the password of an admin


    // Retrieve an admin by email if needed
    Admin getAdminByEmail(String email);
}
