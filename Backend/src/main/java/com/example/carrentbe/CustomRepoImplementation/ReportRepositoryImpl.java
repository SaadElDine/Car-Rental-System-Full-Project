package com.example.carrentbe.CustomRepoImplementation;

import com.example.carrentbe.DTO.ReservationReportDTO;
import com.example.carrentbe.repository.ReportRepository;
import jakarta.persistence.TemporalType;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.Date;
import java.util.List;

@Repository
public class ReportRepositoryImpl implements ReportRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public List<ReservationReportDTO> findAllReservationReports() {
        // Assuming you have a JPQL or SQL query that can construct your DTOs
        String jpql = "SELECT new com.example.carrentbe.DTO.ReservationReportDTO(" +
                "r.reservationId, r.customerId, r.pickUpDate, r.returnDate, r.reservationStatus, " +
                "c.plateId, c.color, c.model, c.price, c.status) " +
                "FROM Reservation r LEFT JOIN Car c ON r.plateId = c.plateId";
        Query query = entityManager.createQuery(jpql, ReservationReportDTO.class);
        return query.getResultList();
    }


    @Override
    public List<ReservationReportDTO> findAllReservationsByCarAndDateRange(String plateId, Date startDate, Date endDate) {
        String jpql = "SELECT new com.example.carrentbe.DTO.ReservationReportDTO(" +
                "r.reservationId, r.customerId, r.pickUpDate, r.returnDate, r.reservationStatus, " +
                "c.plateId, c.color, c.model, c.price, c.status) " +
                "FROM Reservation r, Car c " + // Implicit join on Car
                "WHERE r.plateId = c.plateId " + // Use the plateId from Reservation to join
                "AND r.plateId = :plateId " +
                "AND ((r.pickUpDate BETWEEN :startDate AND :endDate) OR " +
                "(r.returnDate BETWEEN :startDate AND :endDate) OR " +
                "(r.pickUpDate <= :startDate AND r.returnDate >= :endDate))";
        Query query = entityManager.createQuery(jpql, ReservationReportDTO.class);
        query.setParameter("plateId", plateId);
        query.setParameter("startDate", startDate, TemporalType.DATE);
        query.setParameter("endDate", endDate, TemporalType.DATE);
        return query.getResultList();
    }



    @Override
    public List<ReservationReportDTO> findAllReservationsByCustomerAndDateRange(Integer customerId) {
        String jpql = "SELECT new com.example.carrentbe.DTO.ReservationReportDTO(" +
                "r.reservationId, r.customerId, r.pickUpDate, r.returnDate, r.reservationStatus, " +
                "c.plateId, c.color, c.model, c.price, c.status) " +
                "FROM Reservation r, Car c " + // Implicit join on Car
                "WHERE r.plateId = c.plateId " + // Use the plateId from Reservation to join
                "AND r.customerId = :customerId";
        Query query = entityManager.createQuery(jpql, ReservationReportDTO.class);
        query.setParameter("customerId", customerId);
        return query.getResultList();
    }


    @Override
    public List<ReservationReportDTO> findAllReservationsWithPriceByDateRange(Date startDate, Date endDate) {
        String jpql = "SELECT new com.example.carrentbe.DTO.ReservationDurationPriceDTO(" +
                "r.reservationId, r.customerId, r.pickUpDate, r.returnDate, " +
                "(SELECT c.price FROM Car c WHERE c.plateId = r.plateId)) " +
                "FROM Reservation r " +
                "WHERE r.pickUpDate >= :startDate AND r.returnDate <= :endDate";


        Query query = entityManager.createQuery(jpql, ReservationReportDTO.class);
        query.setParameter("startDate", startDate, TemporalType.DATE);
        query.setParameter("endDate", endDate, TemporalType.DATE);
        return query.getResultList();
    }


}
