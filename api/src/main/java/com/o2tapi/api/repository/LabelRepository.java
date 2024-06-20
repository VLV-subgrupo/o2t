package com.o2tapi.api.repository;

import org.springframework.stereotype.Repository;

import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {
    
    List<Label> findAllByCreatedBy(User createdBy);
}