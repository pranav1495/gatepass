package com.ictinternship.gatepass.controller;
import com.ictinternship.gatepass.model.Authority;
import com.ictinternship.gatepass.service.AuthorityLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/authority")
public class AuthorityLoginController {

    @Autowired
    private AuthorityLoginService authorityloginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Authority authority) {
        try {
            Authority loggedInAuthority = authorityloginService.login(authority.getEmail(), authority.getPassword());
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}