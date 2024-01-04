package com.example.carrentbe.Exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateCustomerException.class)
    public ResponseEntity<Object> handleDuplicateCustomer(DuplicateCustomerException e) {
        // Construct an error response that the frontend can understand
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", e.getMessage());
        System.out.println("Error: " + e.getMessage());
        return new ResponseEntity<>(responseBody, HttpStatus.CONFLICT);
    }
}