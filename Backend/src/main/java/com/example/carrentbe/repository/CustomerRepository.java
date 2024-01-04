package com.example.carrentbe.repository;

import com.example.carrentbe.model.Customer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.*;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query(value = "SELECT c FROM Customer c WHERE c.email = :email")
    Optional<Customer> findByEmail(String email);
    @Query(value = "SELECT c FROM Customer c ")
    public List<Customer> getAllCustomersFromDB() ;

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO Customer ( address, contactInfo, email, name, password) VALUES ( :address, :contactInfo, :email, :name, :password)", nativeQuery = true)
    int saveCustByAbdelwahed(@Param("address") String address,
                             @Param("contactInfo") String contactInfo,
                             @Param("email") String email,
                             @Param("name") String name,
                             @Param("password") String password);



}
