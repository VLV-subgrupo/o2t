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

import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.LabelDTO;
import com.o2tapi.api.service.LabelService;
import com.o2tapi.api.service.ValidationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;


@CrossOrigin
@Api(value = "LabelController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1/labels")
public class LabelController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private LabelService labelService;

    @PostMapping()
    @ApiOperation("Create label")
    public ResponseEntity<Label> createLabel(@Valid @RequestBody LabelDTO register) {
        
        validationService.validateLabelFields(register, false);
        
        return labelService.create(register);
    }

    @PutMapping("/{id}")
    @ApiOperation("Update label")
    public ResponseEntity<Label> updateLabel(@PathVariable Long id, @Valid @RequestBody LabelDTO labelDTO) {
        
        validationService.validateLabelFields(labelDTO, true);
        Label existingLabel = validationService.validateLabelId(id);
        
        return labelService.update(labelDTO, existingLabel);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Delete label by id")
    public ResponseEntity<String> deleteLabel(@PathVariable Long id) {
        
        Label label = validationService.validateLabelId(id);

        return labelService.delete(label);
    }

    @GetMapping("/{id}")
    @ApiOperation("Find label by id")
    public ResponseEntity<Label> findLabel(@PathVariable Long id) {
        
        Label label = validationService.validateLabelId(id);

        return labelService.find(label);
    }
    
    @GetMapping("/user/{userId}")
    @ApiOperation("Find all labels by user id")
    public ResponseEntity<List<Label>> findAllByUser(@PathVariable Long userId) {
        
        User user = validationService.validateUser(userId);

        return labelService.findAllByUser(user);
    }
}