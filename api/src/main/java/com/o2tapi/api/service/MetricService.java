package com.o2tapi.api.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.Metric;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.MetricDTO;

public interface MetricService {

    ResponseEntity<String> delete(Metric metric);
    
    ResponseEntity<Metric> update(MetricDTO newMetric, Metric actualMetric);
    
    ResponseEntity<Metric> create(MetricDTO metric, User creatorUser);
    
    ResponseEntity<Metric> find(Metric metric);
    
    ResponseEntity<List<Metric>> findAllByUser(User user);
}
