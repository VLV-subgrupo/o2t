package com.o2tapi.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.LabelDTO;
import com.o2tapi.api.repository.LabelRepository;
import com.o2tapi.api.service.LabelService;
import com.o2tapi.api.service.ValidationService;

import java.util.List;

@Service
public class LabelServiceImpl implements LabelService {

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    private ValidationService validationService;

    @Override
    public ResponseEntity<String> delete(Label label) {

        labelRepository.delete(label);

        return ResponseEntity.ok("Label of id " + label.getId() + " deleted successfully");
    }
    
    @Override
    public ResponseEntity<Label> update(LabelDTO newLabel, Label existingLabel) {
       
        validationService.validateNotEmptyFields(new String[]{newLabel.getName(), newLabel.getColor()});

        existingLabel.setName(newLabel.getName());
        existingLabel.setColor(newLabel.getColor());

        return ResponseEntity.ok(labelRepository.save(existingLabel));
    }
    
    @Override
    public ResponseEntity<Label> create(LabelDTO register) {
        
        Label label = new Label();
        label.setName(register.getName());
        label.setColor(register.getColor());

        User user = validationService.validateUser(register.getCreatedById());
        label.setCreatedBy(user);

        return ResponseEntity.ok(labelRepository.save(label));
    }

    @Override
    public ResponseEntity<Label> find(Label label) {
        return ResponseEntity.ok(label);
    }

    @Override
    public ResponseEntity<List<Label>> findAllByUser(User user) {
        return ResponseEntity.ok(labelRepository.findAllByCreatedBy(user));
    }
}
