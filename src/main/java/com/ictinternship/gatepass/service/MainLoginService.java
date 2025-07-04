package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Authority;
import com.ictinternship.gatepass.model.Main;

public interface MainLoginService {
    Main login(String username, String password);
}
