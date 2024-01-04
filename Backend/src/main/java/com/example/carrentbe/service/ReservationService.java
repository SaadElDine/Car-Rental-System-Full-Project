package com.example.carrentbe.service;
import com.example.carrentbe.model.Reservation;
import java.util.List;
public interface ReservationService {
    Reservation saveReservation(Reservation reservation);
    List<Reservation> getAllReservations();
    Reservation getReservationById(Integer reservationId);
    Reservation updateReservation(Reservation reservation);
    void deleteReservation(Integer reservationId);

}
