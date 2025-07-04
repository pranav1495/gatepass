package com.ictinternship.gatepass.controller;

import com.ictinternship.gatepass.model.Reservation;
import com.ictinternship.gatepass.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/getAll")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable int id) {
        Reservation reservation = reservationService.getReservationById(id);
        return reservation != null ? ResponseEntity.ok(reservation) : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable int id, @RequestBody Reservation reservationDetails) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservationDetails);
        return updatedReservation != null ? ResponseEntity.ok(updatedReservation) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int id) {
        boolean deleted = reservationService.deleteReservation(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    @PostMapping("/forward/{id}")
    public ResponseEntity<Void> forwardReservation(@PathVariable int id) {
        boolean forwarded = reservationService.forwardReservation(id);
        return forwarded ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

}
