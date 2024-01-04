package com.example.carrentbe.DTO;

import com.example.carrentbe.model.Car;
import com.example.carrentbe.model.Customer;
import com.example.carrentbe.model.Reservation;

public class AdvancedSearchResult {

    private final Car car;
    private final Customer customer;
    private final Reservation reservation;

    public AdvancedSearchResult(Car car, Customer customer, Reservation reservation) {
        this.car = car;
        this.customer = customer;
        this.reservation = reservation;
    }

    public Car getCar() {
        return car;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Reservation getReservation() {
        return reservation;
    }
}
