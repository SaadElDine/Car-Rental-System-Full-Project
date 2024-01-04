package com.example.carrentbe.service;

import com.example.carrentbe.model.Customer;
import java.util.List;

public interface CustomerService {
    Customer registerCustomer(Customer customer);
    List<Customer> getAllCustomers();
    Customer getCustomerById(Integer customerId);
    Customer updateCustomer(Customer customer);
    void deleteCustomer(Integer customerId);
    boolean checkCustomerCredentials(String email, String password);
}
