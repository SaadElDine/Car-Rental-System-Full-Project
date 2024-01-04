package com.example.carrentbe.DTO;

import java.time.LocalDate;

public class CarReservationReportDTO {
    private String plateId;
    private String model;
    private String color;
    private String location;
    private int year;
    private Long reservationId;
    private LocalDate pickupDate;
    private LocalDate returnDate;
    private String reservationStatus;

    // Constructor that matches the query
    public CarReservationReportDTO(String plateId, String model, String color, String location, int year, Long reservationId, LocalDate pickupDate, LocalDate returnDate, String reservationStatus) {
        this.plateId = plateId;
        this.model = model;
        this.color = color;
        this.location = location;
        this.year = year;
        this.reservationId = reservationId;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.reservationStatus = reservationStatus;
    }

    public String getPlateId() {
        return plateId;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }
// Getters and setters
}
