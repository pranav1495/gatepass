package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Visitor;

import java.util.List;
import java.util.Optional;

public interface VisitorService {
    void saveVisitor(Visitor visitor);
    List<Visitor> getAllVisitors();
    Optional<Visitor> getVisitorById(int id);
    void deleteVisitorById(int id);
    void sendVisitorDataToRole(int visitorId, String role) throws Exception;
    List<Visitor> getVisitorsByDateRange(String fromDate, String toDate);
}

