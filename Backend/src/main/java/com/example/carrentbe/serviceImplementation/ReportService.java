package com.example.carrentbe.serviceImplementation;

import com.example.carrentbe.DTO.ReservationReportDTO;
import com.example.carrentbe.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public List<ReservationReportDTO> findAllReservationReports() {
        // Ensure this method correctly fetches all reservation reports.
        return reportRepository.findAllReservationReports();
    }

    public List<ReservationReportDTO> findAllReservationsByCarAndDateRange(String plateId, Date startDate, Date endDate) {
        // Verify that the repository method is being called correctly with the right parameters.
        return reportRepository.findAllReservationsByCarAndDateRange(plateId, startDate, endDate);
    }

    public List<ReservationReportDTO> findAllReservationsByCustomerAndDateRange(Integer customerId) {
        // Ensure this method is properly implemented and corresponds to the method in the repository.
        return reportRepository.findAllReservationsByCustomerAndDateRange(customerId);
    }

    public List<ReservationReportDTO> findAllReservationsWithPriceByDateRange(Date startDate, Date endDate) {
        // This is the method referenced in line 56 of your controller.
        // Verify that it correctly interacts with the repository.
        return reportRepository.findAllReservationsWithPriceByDateRange(startDate, endDate);
    }

    // Add any other service methods as necessary.
}
