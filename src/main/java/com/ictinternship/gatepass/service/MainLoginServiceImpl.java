package com.ictinternship.gatepass.service;
import com.ictinternship.gatepass.model.Main;
import com.ictinternship.gatepass.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainLoginServiceImpl implements MainLoginService {
    @Autowired
    private MainRepository mainRepository;

    @Override
    public Main login(String username, String password) {
        Main main = mainRepository.findByUsername(username);
        if (main != null && main.getPassword().equals(password)) {
            return main;
        }
        throw new IllegalArgumentException("Invalid email or password");
    }
}
