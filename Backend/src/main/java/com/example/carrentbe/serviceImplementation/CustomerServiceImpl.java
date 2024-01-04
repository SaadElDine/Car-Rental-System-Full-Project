package com.example.carrentbe.serviceImplementation;

import com.example.carrentbe.model.Customer;
import com.example.carrentbe.repository.CustomerRepository;
import com.example.carrentbe.service.CustomerService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.carrentbe.Exception.DuplicateCustomerException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {


    @Autowired
    private final CustomerRepository customerRepository ;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired

    public CustomerServiceImpl(CustomerRepository customerRepository, BCryptPasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Customer registerCustomer(Customer customer) {
        try {
            // Encrypt the password before saving
            String encryptedPassword = passwordEncoder.encode(customer.getPassword());
            customer.setPassword(encryptedPassword);


            customerRepository.saveCustByAbdelwahed( customer.getAddress(), customer.getContactInfo(), customer.getEmail(), customer.getName(), encryptedPassword);
            // Fetch and return the saved customer
            return customerRepository.findByEmail(customer.getEmail()).orElse(null);
            // Attempt to save the customer with the encrypted password
            //return customerRepository.saveCustByAbdelwahed(customer.getCustomerId(),customer.getAddress(),customer.getContactInfo(),customer.getEmail(),customer.getName(),customer.getPassword());

        } catch (DataIntegrityViolationException e) {
            // Handle the case where a duplicate key is being inserted.
            // This is a simplistic way to handle it. In a real scenario, you might want
            // to check the exception message or cause to determine which column caused
            // the violation and respond appropriately.

            // Log the exception for debugging purposes
            // logger.error("Data integrity violation when registering customer: ", e);

            // Handle the exception and inform the caller that a duplicate entry was made
            throw new DuplicateCustomerException("A customer with the same ID, contact info, or email already exists.");
        }
    }

    @Override
    public List<Customer> getAllCustomers() {
        // Retrieve all customers and clear their passwords before returning

        return customerRepository.getAllCustomersFromDB().stream()
                .peek(customer -> customer.setPassword(null))
                .collect(Collectors.toList());
    }
        //return customerRepository.findAll().stream().peek(customer -> customer.setPassword(null)).collect(Collectors.toList());


    @Override
    public Customer getCustomerById(Integer customerId) {
        // Retrieve a customer by ID and clear the password before returning
        return customerRepository.findById(customerId)
                .map(customer -> {
                    customer.setPassword(null);
                    return customer;
                })
                .orElse(null); // Return null or throw a custom exception if the customer is not found
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        // Check if the customer exists and update it
        return Optional.ofNullable(customer)
                .filter(c -> c.getCustomerId() != null && customerRepository.existsById(c.getCustomerId()))
                .map(c -> {
                    // Encrypt the password if it's being updated
                    if (c.getPassword() != null && !c.getPassword().isEmpty()) {
                        String encryptedPassword = passwordEncoder.encode(c.getPassword());
                        c.setPassword(encryptedPassword);
                    }
                    return customerRepository.save(c);
                })
                .orElse(null); // Return null or handle the case where the customer doesn't exist
    }

    @Override
    public void deleteCustomer(Integer customerId) {
        // Delete the customer if it exists
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
        } else {
            // Handle the case where the customer doesn't exist or log this event
        }
    }

    @Override
    public boolean checkCustomerCredentials(String email, String rawPassword) {
        // Check the customer's credentials
        return customerRepository.findByEmail(email)
                .map(customer -> passwordEncoder.matches(rawPassword, customer.getPassword()))
                .orElse(false); // Return false if the customer is not found or if the password doesn't match
    }
}
