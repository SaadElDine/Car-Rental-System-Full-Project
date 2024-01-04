package com.example.carrentbe.DTO;

import java.util.Date;
import com.example.carrentbe.*;
public class ReservationReportDTO {
    // Reservation fields
    private Integer reservationId;
    private Integer customerId;
    private Date pickUpDate;
    private Date returnDate;
    private String reservationStatus;

    // Car fields
    private String plateId;
    private String color;
    private String model;
    private Double price;
    private String carStatus;

    // Default constructor
    public ReservationReportDTO() {
    }

    // All-args constructor
    public ReservationReportDTO(Integer reservationId, Integer customerId, Date pickUpDate, Date returnDate,
                                String reservationStatus, String plateId, String color, String model,
                                Double price, String carStatus) {
        this.reservationId = reservationId;
        this.customerId = customerId;
        this.pickUpDate = pickUpDate;
        this.returnDate = returnDate;
        this.reservationStatus = reservationStatus;
        this.plateId = plateId;
        this.color = color;
        this.model = model;
        this.price = price;
        this.carStatus = carStatus;
    }

    // Getters and setters for Reservation fields
    public Integer getReservationId() {
        return reservationId;
    }

    public void setReservationId(Integer reservationId) {
        this.reservationId = reservationId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Date getPickUpDate() {
        return pickUpDate;
    }

    public void setPickUpDate(Date pickUpDate) {
        this.pickUpDate = pickUpDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    // Getters and setters for Car fields
    public String getPlateId() {
        return plateId;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCarStatus() {
        return carStatus;
    }

    public void setCarStatus(String carStatus) {
        this.carStatus = carStatus;
    }
}
