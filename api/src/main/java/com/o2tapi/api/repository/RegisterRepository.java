package com.o2tapi.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2tapi.api.models.Register;


public interface RegisterRepository extends JpaRepository<Register, Long>{

    Optional<Register> findByEmail(String email);
}
