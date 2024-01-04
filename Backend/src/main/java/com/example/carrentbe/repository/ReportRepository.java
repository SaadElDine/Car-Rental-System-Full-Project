package com.example.carrentbe.repository;

import com.example.carrentbe.DTO.ReservationReportDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReportRepository {
    List<ReservationReportDTO> findAllReservationReports();
    // New method with date range and plateId
    List<ReservationReportDTO> findAllReservationsByCarAndDateRange(String plateId, Date startDate, Date endDate);

    List<ReservationReportDTO> findAllReservationsByCustomerAndDateRange(Integer customerId);
    List<ReservationReportDTO> findAllReservationsWithPriceByDateRange(Date startDate, Date endDate);

}
