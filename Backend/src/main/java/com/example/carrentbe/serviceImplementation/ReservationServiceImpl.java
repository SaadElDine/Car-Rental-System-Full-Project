package com.example.carrentbe.serviceImplementation;
import com.example.carrentbe.model.Reservation;
import com.example.carrentbe.repository.ReservationRepository;
import com.example.carrentbe.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    //@Override
    //public Reservation saveReservation(Reservation reservation) {
    //    return reservationRepository.save(reservation);
    //}

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(Integer reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        return reservation.orElse(null);
    }

    @Override
    public Reservation updateReservation(Reservation reservation) {
        if (reservation != null && reservation.getReservationId() != null && reservationRepository.existsById(reservation.getReservationId())) {
            return reservationRepository.save(reservation);
        } else {
            return null;
        }
    }
    public Reservation saveReservation(Reservation reservation) {
        // Check for conflicting reservations
        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
                reservation.getPlateId(),
                reservation.getPickUpDate(),
                reservation.getReturnDate());

        if (conflicts.isEmpty()) {
            // No conflicts, safe to save
            return reservationRepository.save(reservation);
        } else {
            // Handle conflict, perhaps throw an exception or return a specific type
            throw new IllegalStateException("Conflict with an existing reservation.");
        }
    }


    @Override
    public void deleteReservation(Integer reservationId) {
        reservationRepository.deleteById(reservationId);
    }
}
