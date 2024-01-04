package com.example.carrentbe.controller;

import com.example.carrentbe.model.Customer;
import com.example.carrentbe.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<Customer> registerCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerService.registerCustomer(customer);
        savedCustomer.setPassword(null); // Ensure the password is not sent back in the response
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);

    }



    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        // Check if the customer ID in the path matches the ID in the request body
        if (!id.equals(customer.getCustomerId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Customer updatedCustomer = customerService.updateCustomer(customer);
        if (updatedCustomer != null) {
            updatedCustomer.setPassword(null); // Again, ensure the password is not sent back
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity<?> checkCustomerCredentials(@RequestBody Customer loginDetails) {
        boolean isAuthentic = customerService.checkCustomerCredentials(loginDetails.getEmail(), loginDetails.getPassword());
        if (isAuthentic) {
            // You may want to return a token or a success message here
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Login failed", HttpStatus.UNAUTHORIZED);
        }
    }

}

