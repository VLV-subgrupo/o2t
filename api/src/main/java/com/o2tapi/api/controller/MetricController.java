package com.o2tapi.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2tapi.api.models.Metric;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.MetricDTO;
import com.o2tapi.api.service.MetricService;
import com.o2tapi.api.service.ValidationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;

@CrossOrigin
@Api(value = "LabelController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1/metric")
public class MetricController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private MetricService metricService;

    @PostMapping()
    @ApiOperation("Create metric")
    public ResponseEntity<Metric> createMetric(@Valid @RequestBody MetricDTO metric) {
        
        User creatorUser = validationService.validateUser(metric.getCreatedBy());
        
        return metricService.create(metric, creatorUser);
    }

    @PutMapping("/{id}")
    @ApiOperation("Update metric")
    public ResponseEntity<Metric> updateMetric(@PathVariable Long id, @Valid @RequestBody MetricDTO metricDTO) {
        
        Metric actualMetric = validationService.validateMetric(id);
        
        return metricService.update(metricDTO, actualMetric);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Delete metric by id")
    public ResponseEntity<String> deleteMetric(@PathVariable Long id) {
        
        Metric metric = validationService.validateMetric(id);

        return metricService.delete(metric);
    }

    @GetMapping("/{id}")
    @ApiOperation("Find metric by id")
    public ResponseEntity<Metric> findMetric(@PathVariable Long id) {
        
        Metric metric = validationService.validateMetric(id);

        return metricService.find(metric);
    }
    
    @GetMapping("/user/{userId}")
    @ApiOperation("Find all metric by user id")
    public ResponseEntity<List<Metric>> findAllByUser(@PathVariable Long userId) {
        
        User user = validationService.validateUser(userId);

        return metricService.findAllByUser(user);
    }
}
