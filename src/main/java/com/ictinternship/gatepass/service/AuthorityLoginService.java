package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Authority;

public interface AuthorityLoginService {
    Authority login(String email, String password);
}

