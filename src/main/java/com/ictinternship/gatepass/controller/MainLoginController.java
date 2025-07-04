package com.ictinternship.gatepass.controller;
import com.ictinternship.gatepass.model.Authority;
import com.ictinternship.gatepass.model.Main;
import com.ictinternship.gatepass.service.AuthorityLoginService;
import com.ictinternship.gatepass.service.MainLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/main")
public class MainLoginController {

    @Autowired
    private MainLoginService mainloginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Main main) {
        try {
            Main loggedInMain = mainloginService.login(main.getUsername(), main.getPassword());
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}