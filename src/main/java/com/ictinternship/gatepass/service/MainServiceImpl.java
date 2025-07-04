package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.Authority;
import com.ictinternship.gatepass.model.Main;

import com.ictinternship.gatepass.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private MainRepository mainRepository;

    @Override
    public Main saveMain(Main main) {
       return mainRepository.save(main);
    }
}
