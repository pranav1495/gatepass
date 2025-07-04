package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.LeaveForm;

import java.util.List;

public interface LeaveFormService {
    List<LeaveForm> getAllLeaveForms();

    LeaveForm getLeaveFormById(int id);

    LeaveForm addLeaveForm(LeaveForm leaveForm);

    LeaveForm updateLeaveForm(int id, LeaveForm leaveForm);

    void deleteLeaveForm(int id);
}
