package com.ictinternship.gatepass.repository;

import com.ictinternship.gatepass.model.LeaveForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveFormRepository extends JpaRepository<LeaveForm, Integer> {
}
