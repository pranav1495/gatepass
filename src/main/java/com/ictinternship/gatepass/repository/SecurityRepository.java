package com.ictinternship.gatepass.repository;

import com.ictinternship.gatepass.model.Security;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecurityRepository extends JpaRepository<Security, Long> {
    boolean existsByEmail(String email);
    Security findByEmail(String email);
}
