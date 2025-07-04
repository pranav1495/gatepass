package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Security;
import com.ictinternship.gatepass.repository.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private SecurityRepository securityRepository;

    @Override
    public Security login(String email, String password) {
        Security security = securityRepository.findByEmail(email);
        if (security != null && security.getPassword().equals(password)) {
            return security;
        }
        throw new IllegalArgumentException("Invalid email or password");
    }
}

