package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Security;

public interface SecurityService {
    void saveSecurity(Security security);
    boolean existsByEmail(String email);
    boolean deleteSecurity(Long id);
}

