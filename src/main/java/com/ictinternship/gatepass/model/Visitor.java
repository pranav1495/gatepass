package com.ictinternship.gatepass.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Visitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String phoneNo;
    private String name;
    private String entrytime;
    private String exittime;
    private String date;
    private String toMeetWhom;
    private String purposeOfVisit;

    public Visitor() {
    }

    public Visitor(int id, String phoneNo, String name, String entrytime,String exittime, String date, String toMeetWhom, String purposeOfVisit) {
        this.id = id;
        this.phoneNo = phoneNo;
        this.name = name;
        this.entrytime = entrytime;
        this.exittime=exittime;
        this.date = date;
        this.toMeetWhom = toMeetWhom;
        this.purposeOfVisit = purposeOfVisit;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEntrytime() {
        return entrytime;
    }

    public void setEntrytime(String entrytime) {
        this.entrytime = entrytime;
    }

    public String getExittime() {
        return exittime;
    }

    public void setExittime(String exittime) {
        this.exittime = exittime;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getToMeetWhom() {
        return toMeetWhom;
    }

    public void setToMeetWhom(String toMeetWhom) {
        this.toMeetWhom = toMeetWhom;
    }

    public String getPurposeOfVisit() {
        return purposeOfVisit;
    }

    public void setPurposeOfVisit(String purposeOfVisit) {
        this.purposeOfVisit = purposeOfVisit;
    }
}
