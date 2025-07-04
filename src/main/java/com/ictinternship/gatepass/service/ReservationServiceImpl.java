package com.ictinternship.gatepass.service.impl;

import com.ictinternship.gatepass.model.Reservation;
import com.ictinternship.gatepass.repository.ReservationRepository;
import com.ictinternship.gatepass.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(int id) {
        return reservationRepository.findById(id).orElse(null);
    }

    @Override
    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation updateReservation(int id, Reservation reservationDetails) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setName(reservationDetails.getName());
            reservation.setPhoneNo(reservationDetails.getPhoneNo());
            reservation.setDate(reservationDetails.getDate());
            reservation.setEntrytime(reservationDetails.getEntrytime());
            return reservationRepository.save(reservation);
        }).orElse(null);
    }

    @Override
    public boolean deleteReservation(int id) {
        return reservationRepository.findById(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
    }

    @Override
    public boolean forwardReservation(int id) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setStatus("Forwarded");
            reservationRepository.save(reservation);
            return true;
        }).orElse(false);
    }
}
