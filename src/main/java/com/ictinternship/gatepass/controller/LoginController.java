package com.ictinternship.gatepass.controller;

import com.ictinternship.gatepass.model.Security;
import com.ictinternship.gatepass.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Security security) {
        try {
            Security loggedInSecurity = loginService.login(security.getEmail(), security.getPassword());
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}

