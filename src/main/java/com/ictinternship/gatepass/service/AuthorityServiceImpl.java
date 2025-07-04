package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Authority;
import com.ictinternship.gatepass.repository.AuthorityRepository;
import com.ictinternship.gatepass.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Authority saveAuthority(Authority authority) {
        return authorityRepository.save(authority);
    }
}
