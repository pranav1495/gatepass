package com.ictinternship.gatepass.service;
import com.ictinternship.gatepass.model.Authority;
import com.ictinternship.gatepass.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorityLoginServiceImpl implements AuthorityLoginService {
    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Authority login(String email, String password) {
        Authority authority = authorityRepository.findByEmail(email);
        if (authority != null && authority.getPassword().equals(password)) {
            return authority;
        }
        throw new IllegalArgumentException("Invalid email or password");
    }
}
