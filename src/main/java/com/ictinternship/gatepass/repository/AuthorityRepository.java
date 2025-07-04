package com.ictinternship.gatepass.repository;

import com.ictinternship.gatepass.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Authority findByEmail(String email);
}
