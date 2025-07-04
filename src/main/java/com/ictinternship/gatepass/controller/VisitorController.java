package com.ictinternship.gatepass.controller;

import com.ictinternship.gatepass.model.Visitor;
import com.ictinternship.gatepass.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/Visitor")
public class VisitorController {

    @Autowired
    private VisitorService visitorService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Visitor visitor) {
        visitorService.saveVisitor(visitor);
        return new ResponseEntity<>("New Visitor is added", HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Visitor>> list() {
        List<Visitor> visitors = visitorService.getAllVisitors();
        return new ResponseEntity<>(visitors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visitor> getVisitor(@PathVariable("id") int id) {
        Optional<Visitor> visitor = visitorService.getVisitorById(id);
        return visitor.map(v -> new ResponseEntity<>(v, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVisitor(@PathVariable("id") int id) {
        Optional<Visitor> visitor = visitorService.getVisitorById(id);
        if (visitor.isPresent()) {
            visitorService.deleteVisitorById(id);
            return new ResponseEntity<>("Visitor deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Visitor not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> updateVisitor(@PathVariable("id") int id, @RequestBody Visitor visitor) {
        Optional<Visitor> existingVisitor = visitorService.getVisitorById(id);
        if (existingVisitor.isPresent()) {
            visitor.setId(id); // Ensure the visitor ID is set correctly
            visitorService.saveVisitor(visitor);
            return new ResponseEntity<>("Visitor edited successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Visitor not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/forward")
    public ResponseEntity<String> sendToRole(@RequestBody RoleRequest roleRequest) {
        try {
            visitorService.sendVisitorDataToRole(roleRequest.getVisitorId(), roleRequest.getRole());
            return new ResponseEntity<>("Visitor data sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error sending visitor data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getByDateRange")
    public ResponseEntity<List<Visitor>> getVisitorsByDateRange(@RequestParam String fromDate, @RequestParam String toDate) {
        List<Visitor> visitors = visitorService.getVisitorsByDateRange(fromDate, toDate);
        return new ResponseEntity<>(visitors, HttpStatus.OK);
    }

    public static class RoleRequest {
        private int visitorId;
        private String role;

        // Getters and Setters
        public int getVisitorId() {
            return visitorId;
        }

        public void setVisitorId(int visitorId) {
            this.visitorId = visitorId;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
