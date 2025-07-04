package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Reservation;

import java.util.List;

public interface ReservationService {
    List<Reservation> getAllReservations();
    Reservation getReservationById(int id);
    Reservation createReservation(Reservation reservation);
    Reservation updateReservation(int id, Reservation reservationDetails);
    boolean deleteReservation(int id);
    boolean forwardReservation(int id);
}
