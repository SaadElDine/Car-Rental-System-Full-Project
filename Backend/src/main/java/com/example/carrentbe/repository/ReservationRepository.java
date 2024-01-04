package com.example.carrentbe.repository;

import com.example.carrentbe.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    // Custom query methods


        @Query("SELECT r FROM Reservation r WHERE r.plateId = :plateId AND r.reservationStatus = 'reserved' AND (r.pickUpDate < :endTime AND r.returnDate > :startTime)")
        List<Reservation> findConflictingReservations(String plateId, Date startTime, Date endTime);


}
