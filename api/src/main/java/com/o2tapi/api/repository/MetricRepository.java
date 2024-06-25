package com.o2tapi.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2tapi.api.models.Metric;
import com.o2tapi.api.models.User;

public interface MetricRepository extends JpaRepository<Metric, Long>{
    
    List<Metric> findAllByCreatedBy(User createdBy);
}
