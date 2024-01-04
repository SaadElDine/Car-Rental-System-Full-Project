package com.example.carrentbe.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Cars")
public class Car implements Serializable {

    @Id
    @Column(name = "plateid")
    private String plateId;

    private String model;
    private Integer year;

    private String status;
    private String color;
    private String location;
    private String imageUrl;
    private double price;

    // Default constructor
    public Car() {
    }

    // Constructor with parameters
    public Car(String model, Integer year, String plateId, String status, String color, String location, String imageUrl, double price) {
        this.model = model;
        this.year = year;
        this.plateId = plateId;
        this.status = status;
        this.color = color;
        this.location = location;
        this.imageUrl = imageUrl;
        this.price = price;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getPlateId() {
        return plateId;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString method for debugging
    @Override
    public String toString() {
        return "Car{" +
                ", model='" + model + '\'' +
                ", year=" + year +
                ", plateId='" + plateId + '\'' +
                ", status='" + status + '\'' +
                ", color='" + color + '\'' +
                ", location='" + location + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", price=" + price +
                '}';
    }
}
