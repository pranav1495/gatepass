package com.ictinternship.gatepass.repository;
import com.ictinternship.gatepass.model.Main;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MainRepository extends JpaRepository<Main, Integer> {
    Main findByUsername(String username);
}
