package com.o2tapi.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.models.Metric;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.enums.MetricType;
import com.o2tapi.api.pojo.MetricDTO;
import com.o2tapi.api.repository.MetricRepository;
import com.o2tapi.api.service.MetricService;
import com.o2tapi.api.service.ValidationService;

@Service
public class MetricServiceImpl implements MetricService{

    @Autowired
    private MetricRepository metricRepository;

    @Autowired
    private ValidationService validationService;

    @Override
    public ResponseEntity<String> delete(Metric metric) {

        metricRepository.delete(metric);

        return ResponseEntity.ok("Metric deleted successfully!");
    }
    
    @Override
    public ResponseEntity<Metric> update(MetricDTO newMetric, Metric actualMetric) {

        validationService.validateNotEmptyFields(new String[] {newMetric.getMetricType()});

        actualMetric.setRegistrationDate(newMetric.getRegistrationDate());
        actualMetric.setValue(newMetric.getValue());
        actualMetric.setMetricType(MetricType.valueOf(newMetric.getMetricType()));

        return ResponseEntity.ok(metricRepository.save(actualMetric));
        
    }
    
    @Override
    public ResponseEntity<Metric> create(MetricDTO metric, User creatorUser) {
        Metric newMetric = new Metric();
        
        newMetric.setRegistrationDate(metric.getRegistrationDate());
        newMetric.setValue(metric.getValue());
        newMetric.setMetricType(MetricType.valueOf(metric.getMetricType()));

        newMetric.setCreatedBy(creatorUser);
        
        return ResponseEntity.ok(metricRepository.save(newMetric));
    }
    
    @Override
    public ResponseEntity<Metric> find(Metric metric) {
        return ResponseEntity.ok(metricRepository.findById(metric.getId()).get());
    }
    
    @Override
    public ResponseEntity<List<Metric>> findAllByUser(User user) {
        return ResponseEntity.ok(metricRepository.findAllByCreatedBy(user));
    }
}
