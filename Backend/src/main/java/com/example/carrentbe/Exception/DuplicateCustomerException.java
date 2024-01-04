package com.example.carrentbe.Exception;

import org.springframework.http.HttpStatus;

public class DuplicateCustomerException extends RuntimeException {
    public DuplicateCustomerException(String message) {
        super(message);
    }
}