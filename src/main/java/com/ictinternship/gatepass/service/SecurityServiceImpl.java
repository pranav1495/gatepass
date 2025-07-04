package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Security;
import com.ictinternship.gatepass.repository.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityServiceImpl implements SecurityService {
    @Autowired
    private SecurityRepository securityRepository;

    @Override
    public void saveSecurity(Security security) {
        if (!existsByEmail(security.getEmail())) {
            securityRepository.save(security);
        } else {
            throw new IllegalArgumentException("Email already in use");
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        return securityRepository.existsByEmail(email);
    }

    @Override
    public boolean deleteSecurity(Long id) {
        securityRepository.deleteById(id);
        return false;
    }
}

