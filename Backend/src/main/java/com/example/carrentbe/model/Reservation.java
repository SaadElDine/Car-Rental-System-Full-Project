package com.example.carrentbe.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "Reservation")
public class Reservation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer reservationId;

    @Column(name = "customer_id")
    private Integer customerId;

    @Temporal(TemporalType.DATE)
    @Column(name = "pickup_date")
    private Date pickUpDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "return_date")
    private Date returnDate;

    @Column(name = "reservation_status")
    private String reservationStatus;
    @Column(name = "plateId")
    private String plateId;

    public String getPlateId() {
        return plateId;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    // Constructors
    public Reservation() {
        // Default constructor
    }

    public Reservation( Integer customerId, Date pickUpDate, Date returnDate, String reservationStatus) {

        this.customerId = customerId;
        this.pickUpDate = pickUpDate;
        this.returnDate = returnDate;
        this.reservationStatus = reservationStatus;
    }

    // Getters and Setters
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

    // toString() method
    @Override
    public String toString() {
        return "Reservation{" +
                "reservationId=" + reservationId +
                ", plateId=" + plateId +
                ", customerId=" + customerId +
                ", pickUpDate=" + pickUpDate +
                ", returnDate=" + returnDate +
                ", reservationStatus='" + reservationStatus + '\'' +
                '}';
    }

}
