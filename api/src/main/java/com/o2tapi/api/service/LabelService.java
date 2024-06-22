package com.o2tapi.api.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.LabelDTO;

public interface LabelService {
    
    ResponseEntity<String> delete(Label label);
    
    ResponseEntity<Label> update(LabelDTO newLabel, Label actualLabel);
    
    ResponseEntity<Label> create(LabelDTO register);
    
    ResponseEntity<Label> find(Label label);
    
    ResponseEntity<List<Label>> findAllByUser(User user);
}