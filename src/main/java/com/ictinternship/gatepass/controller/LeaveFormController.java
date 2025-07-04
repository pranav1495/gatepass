package com.ictinternship.gatepass.controller;

import com.ictinternship.gatepass.model.LeaveForm;
import com.ictinternship.gatepass.service.LeaveFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/leave-forms")
public class LeaveFormController {

    private final LeaveFormService leaveFormService;

    @Autowired
    public LeaveFormController(LeaveFormService leaveFormService) {
        this.leaveFormService = leaveFormService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<LeaveForm>> getAllLeaveForms() {
        List<LeaveForm> leaveForms = leaveFormService.getAllLeaveForms();
        return ResponseEntity.ok(leaveForms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveForm> getLeaveFormById(@PathVariable("id") int id) {
        LeaveForm leaveForm = leaveFormService.getLeaveFormById(id);
        if (leaveForm != null) {
            return ResponseEntity.ok(leaveForm);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<LeaveForm> addLeaveForm(@RequestBody LeaveForm leaveForm) {
        LeaveForm addedLeaveForm = leaveFormService.addLeaveForm(leaveForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedLeaveForm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveForm> updateLeaveForm(@PathVariable("id") int id, @RequestBody LeaveForm leaveForm) {
        LeaveForm updatedLeaveForm = leaveFormService.updateLeaveForm(id, leaveForm);
        if (updatedLeaveForm != null) {
            return ResponseEntity.ok(updatedLeaveForm);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveForm(@PathVariable("id") int id) {
        leaveFormService.deleteLeaveForm(id);
        return ResponseEntity.noContent().build();
    }
}
