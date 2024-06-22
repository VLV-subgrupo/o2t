package com.o2tapi.api.repository;

import org.springframework.stereotype.Repository;

import com.o2tapi.api.models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    User findByName(String name);
}
