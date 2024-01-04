package com.example.carrentbe.controller;

import com.example.carrentbe.model.Admin;
import com.example.carrentbe.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminController(AdminService adminService, PasswordEncoder passwordEncoder) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
    }

    // Endpoint to create a new admin
    //@PostMapping("/register")
    //public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
    //    admin.setPassword(passwordEncoder.encode(admin.getPassword())); // Encrypt the password
    //    Admin newAdmin = adminService.createAdmin(admin);
    //    return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
    //}

    // Endpoint to retrieve admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Admin admin = adminService.getAdminById(id);
        admin.setPassword(null); // It's good practice to clear sensitive information
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    // Endpoint to check admin credentials
    @PostMapping("/login")
    public ResponseEntity<?> checkAdminCredentials(@RequestBody Admin credentials) {
        System.out.println("Email: " + credentials.getEmail()+ " Password: " + credentials.getPassword());
        boolean isValid = adminService.checkAdminCredentials(credentials.getEmail(), credentials.getPassword());
        System.out.println("isValid: " + isValid);
        if (isValid) {
            return ResponseEntity.ok().body("Login successful.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }

    // Endpoint to delete an admin by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok().body("Admin deleted successfully.");
    }

    // Endpoint to update an existing admin
    //@PutMapping("/{id}")
    //public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
    //    Admin updatedAdmin = adminService.updateAdmin(id, adminDetails);
    //    return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
    //}

    // Endpoint to get all admins
    //@GetMapping("/all")
    //public ResponseEntity<List<Admin>> getAllAdmins() {
    //    List<Admin> admins = adminService.getAllAdmins();
    //    return new ResponseEntity<>(admins, HttpStatus.OK);
    //}

    // Add more endpoints as required...

}
