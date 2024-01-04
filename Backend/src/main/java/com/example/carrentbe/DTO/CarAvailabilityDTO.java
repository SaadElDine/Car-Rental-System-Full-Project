package com.example.carrentbe.DTO;
public class CarAvailabilityDTO{
    private String plateId;
    private boolean isAvailable;
    // Constructors, getters and setters
    String reservationStatus;
    public CarAvailabilityDTO(String plateId, boolean isAvailable) {
        this.plateId = plateId;
        this.isAvailable = isAvailable;
        if (isAvailable) {
            this.reservationStatus = "Available";
        } else {
            this.reservationStatus = "Unavailable";
        }

    }

    public String getPlateId() {
        return plateId;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
