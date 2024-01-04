package com.example.carrentbe.serviceImplementation;



import com.example.carrentbe.DTO.AdvancedSearchResult;
import com.example.carrentbe.DTO.CarAvailabilityDTO;
import com.example.carrentbe.model.Car;
import com.example.carrentbe.repository.CarRepository;
import com.example.carrentbe.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void saveCar(Car car) {
        carRepository.insertCar(car);
    }

    @Override
    public List<Car> searchCarsBySpecifications(String plateId, String model, Integer year, Double maxPrice) {
        System.out.println(plateId);
        System.out.println(model);
        System.out.println(year);
        System.out.println(maxPrice);
        return carRepository.searchCarsBySpecifications(plateId, model, year, maxPrice);
    }

    @Override
    public List<AdvancedSearchResult> performAdvancedSearch(String searchTerm) {
        return carRepository.advancedSearch(searchTerm);
    }

    @Override
    public List<CarAvailabilityDTO> getCarAvailabilityOnDate(LocalDate date) {
        return carRepository.findCarAvailabilityByDate(date);
    }

    @Override
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    public Car getCarByPlateId(Integer carId) {
        return carRepository.findById(carId).orElse(null);
    }

    @Override
    public Car updateCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void deleteCar(Integer carId) {
        carRepository.deleteById(carId);
    }

    @Override
    public int updateCarStatus(String plateId, String newStatus) {
        return carRepository.updateCarStatus(plateId, newStatus);
    }
}
