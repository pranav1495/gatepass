package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Security;

public interface LoginService {
    Security login(String email, String password);
}

