package com.ictinternship.gatepass.service;

import com.ictinternship.gatepass.model.LeaveForm;
import com.ictinternship.gatepass.repository.LeaveFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveFormServiceImpl implements LeaveFormService {

    private final LeaveFormRepository leaveFormRepository;

    @Autowired
    public LeaveFormServiceImpl(LeaveFormRepository leaveFormRepository) {
        this.leaveFormRepository = leaveFormRepository;
    }

    @Override
    public List<LeaveForm> getAllLeaveForms() {
        return leaveFormRepository.findAll();
    }

    @Override
    public LeaveForm getLeaveFormById(int id) {
        Optional<LeaveForm> optionalLeaveForm = leaveFormRepository.findById(id);
        return optionalLeaveForm.orElse(null);
    }

    @Override
    public LeaveForm addLeaveForm(LeaveForm leaveForm) {
        return leaveFormRepository.save(leaveForm);
    }

    @Override
    public LeaveForm updateLeaveForm(int id, LeaveForm leaveForm) {
        if (leaveFormRepository.existsById(id)) {
            leaveForm.setId(id);
            return leaveFormRepository.save(leaveForm);
        }
        return null;
    }

    @Override
    public void deleteLeaveForm(int id) {
        leaveFormRepository.deleteById(id);
    }
}
