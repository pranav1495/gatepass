package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Visitor;
import com.ictinternship.gatepass.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisitorServiceImpl implements VisitorService {

    @Autowired
    private VisitorRepository visitorRepository;

    @Override
    public void saveVisitor(Visitor visitor) {
        visitorRepository.save(visitor);
    }

    public List<Visitor> getVisitorsByDateRange(String fromDate, String toDate) {
        return visitorRepository.findByDateBetween(fromDate, toDate);
    }

    @Override
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @Override
    public Optional<Visitor> getVisitorById(int id) {
        return visitorRepository.findById(id);
    }

    @Override
    public void deleteVisitorById(int id) {
        visitorRepository.deleteById(id);
    }

    @Override
    public void sendVisitorDataToRole(int visitorId, String role) throws Exception {
        Visitor visitor = visitorRepository.findById(Math.toIntExact(visitorId))
                .orElseThrow(() -> new Exception("Visitor not found"));
        System.out.println("Sending data of " + visitor.getName() + " to " + role);

        // TODO: Implement actual sending logic here, such as sending an email or storing the data in a specific table
    }
}
