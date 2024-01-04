package com.example.carrentbe.Mapping;

public class CarUpdateRequest {
    private String plateId;
    private String newStatus;

    // getters and setters

    public String getPlateId() {
        return plateId;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }
}