package com.example.carrentbe.controller;

import com.example.carrentbe.DTO.AdvancedSearchResult;
import com.example.carrentbe.DTO.CarAvailabilityDTO;
import com.example.carrentbe.Mapping.CarUpdateRequest;
import com.example.carrentbe.model.Car;

import com.example.carrentbe.Mapping.SearchRequest;
import com.example.carrentbe.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/search")
    public ResponseEntity<List<Car>> searchCars(@RequestBody SearchRequest request) {
        List<Car> cars = carService.searchCarsBySpecifications(request.getPlateId(), request.getModel(), request.getYear(), request.getPrice());
        return ResponseEntity.ok(cars);
    }@PostMapping("/addcar")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        System.out.println(car);
        carService.saveCar(car);
        return new ResponseEntity<>(car, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarByPlateId(@PathVariable Integer id) {
        Car car = carService.getCarByPlateId(id);
        return car != null ? ResponseEntity.ok(car) : ResponseEntity.notFound().build();
    }

    @PutMapping
    public ResponseEntity<Car> updateCar(@RequestBody Car car) {
        return ResponseEntity.ok(carService.updateCar(car));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Integer id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/availability")
    public ResponseEntity<List<CarAvailabilityDTO>> getCarAvailability(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<CarAvailabilityDTO> carAvailabilityList = carService.getCarAvailabilityOnDate(date);
        return ResponseEntity.ok(carAvailabilityList);
    }

    @GetMapping("/advanced")
    public List<AdvancedSearchResult> advancedSearch(@RequestParam("searchTerm") String searchTerm) {
        return carService.performAdvancedSearch(searchTerm);
    }

    @PostMapping("/updatecar")
    public String updateCarStatus(@RequestBody CarUpdateRequest request) {
        int updatedRows = carService.updateCarStatus(request.getPlateId(), request.getNewStatus());
        if (updatedRows > 0) {
            return "Car status updated successfully";
        } else {
            return "Failed to update car status";
        }
    }
    //3adelto 3ala el car controller

}