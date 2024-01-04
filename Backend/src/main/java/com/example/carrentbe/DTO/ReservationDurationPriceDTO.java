package com.example.carrentbe.DTO;

import java.sql.Date;

public class ReservationDurationPriceDTO {
    private Integer reservationId;
    private Integer customerId;
    private Date startDate;
    private Date endDate;
    private Double totalPrice;

    // Constructor matching the expected signature
    public ReservationDurationPriceDTO(Integer reservationId, Integer customerId, Date startDate, Date endDate, Double pricePerDay) {
        this.reservationId = reservationId;
        this.customerId = customerId;
        this.startDate = startDate;
        this.endDate = endDate;

        // Ensure that endDate is after startDate to avoid negative days
        if (endDate != null && startDate != null && endDate.after(startDate)) {
            // Calculate the number of days between startDate and endDate
            long diffInMillis = endDate.getTime() - startDate.getTime();
            long diffInDays = diffInMillis / (1000 * 60 * 60 * 24);
            this.totalPrice = pricePerDay * diffInDays;
        } else {
            // Handle the case where dates are null or endDate is before startDate
            this.totalPrice = 0.0;
        }
    }
    // Getters and setters for all properties
    // ...

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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    // Optionally, override toString, equals, and hashCode methods
    // ...
}
