package com.example.carrentbe.controller;

import com.example.carrentbe.DTO.ReservationReportDTO;
import com.example.carrentbe.serviceImplementation.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/reservations")
    public List<ReservationReportDTO> getAllReservationReports() {
        return reportService.findAllReservationReports();
    }

    @GetMapping("/reservations2")
    public List<ReservationReportDTO> getReservationReportsByCarAndDateRange(
            @RequestParam String plateId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate) {
        System.out.println(plateId);
        System.out.println(fromDate);
        System.out.println(toDate);
        return reportService.findAllReservationsByCarAndDateRange(plateId, fromDate, toDate);
    }

    @GetMapping("/reservation4")
    public ResponseEntity<List<ReservationReportDTO>> getReservationsByCustomerAndDateRange(
            @RequestParam Integer customerId)
            {
        List<ReservationReportDTO> reservations = reportService.findAllReservationsByCustomerAndDateRange(customerId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/reservation5")
    public ResponseEntity<List<ReservationReportDTO>> getReservationDurationPriceReport(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<ReservationReportDTO> reservationPrices = reportService.findAllReservationsWithPriceByDateRange(startDate, endDate);
        return ResponseEntity.ok(reservationPrices);
    }

}
