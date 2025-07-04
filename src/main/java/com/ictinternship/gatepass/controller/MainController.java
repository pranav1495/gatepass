package com.ictinternship.gatepass.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ictinternship.gatepass.model.Main;
import com.ictinternship.gatepass.service.MainService;

@RestController
@RequestMapping("/main")
public class MainController {

    @Autowired
    private MainService mainService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Main main) {
        mainService.saveMain(main);
        return new ResponseEntity<>("User access is approved", HttpStatus.CREATED);
    }
}

