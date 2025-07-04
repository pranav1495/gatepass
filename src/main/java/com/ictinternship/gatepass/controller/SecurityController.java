package com.ictinternship.gatepass.controller;

import com.ictinternship.gatepass.model.Security;
import com.ictinternship.gatepass.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/signup")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    // Endpoint to add a new security personnel
    @PostMapping("/add")
    public ResponseEntity<String> addSecurity(@RequestBody Security security) {
        try {
            securityService.saveSecurity(security);
            return new ResponseEntity<>("Security personnel added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding security personnel", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to delete a security personnel by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSecurity(@PathVariable Long id) {
        try {
            boolean isDeleted = securityService.deleteSecurity(id);
            if (isDeleted) {
                return ResponseEntity.ok("Security personnel deleted successfully");
            } else {
                return new ResponseEntity<>("Security personnel not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting security personnel", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
