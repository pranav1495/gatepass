package com.ictinternship.gatepass.repository;

import com.ictinternship.gatepass.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Integer> {
    List<Visitor> findByDateBetween(String fromDate, String toDate);
}

