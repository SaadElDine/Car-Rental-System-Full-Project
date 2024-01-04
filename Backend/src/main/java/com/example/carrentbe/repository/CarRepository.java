package com.example.carrentbe.repository;

import com.example.carrentbe.DTO.AdvancedSearchResult;
import com.example.carrentbe.DTO.CarAvailabilityDTO;
import com.example.carrentbe.model.Car;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {



    @Modifying
    @Transactional
    @Query(value = "INSERT INTO cars (plateid, color, imageUrl, location, model, price, status, year) " +
            "VALUES (:#{#car.plateId}, :#{#car.color}, :#{#car.imageUrl}, :#{#car.location}, " +
            ":#{#car.model}, :#{#car.price}, :#{#car.status}, :#{#car.year})", nativeQuery = true)
    void insertCar(@Param("car") Car car);

    @Query(value = "SELECT * FROM cars WHERE plateid = :plateId", nativeQuery = true)
    Car findbyPlateId(@Param("plateId") String plateId);

    @Query(value = "SELECT * FROM Cars c WHERE " +
            "(:plateId IS null or :plateId='' or c.plateId = :plateId) AND" +
            "(:model IS null  or :model='' or c.model = :model) AND " +
            "(:year=0 OR c.year = :year) AND " +
            "(:maxPrice=0.0 OR c.price <= :maxPrice)",
            nativeQuery = true)

        List<Car> searchCarsBySpecifications(
                @Param("plateId") String plateId,
                @Param("model") String model,
                @Param("year") Integer year,
                @Param("maxPrice") Double maxPrice);

    @Query("SELECT new com.example.carrentbe.DTO.CarAvailabilityDTO(" +
            "c.plateId, " +
            "(SELECT CASE WHEN (COUNT(r) > 0) THEN false ELSE true END " +
            "FROM Reservation r " +
            "WHERE r.plateId = c.plateId AND :date BETWEEN r.pickUpDate AND r.returnDate) " +
            ") " +
            "FROM Car c")
    List<CarAvailabilityDTO> findCarAvailabilityByDate(@Param("date") LocalDate date);

    @Query("SELECT new com.example.carrentbe.DTO.AdvancedSearchResult(c, cust, r) " +
            "FROM Car c " +
            "LEFT JOIN Reservation r ON c.plateId = r.plateId " +
            "LEFT JOIN Customer cust ON cust.customerId = r.customerId " +
            "WHERE " +
            "   LOWER(c.plateId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(c.color) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(c.model) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(c.location) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(c.status) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(cust.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(cust.address) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(r.reservationStatus) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "   LOWER(cust.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))  ")
    List<AdvancedSearchResult> advancedSearch(@Param("searchTerm") String searchTerm);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Cars SET status = :newStatus WHERE plateid = :plateId", nativeQuery = true)
    int updateCarStatus(String plateId, String newStatus);

}






