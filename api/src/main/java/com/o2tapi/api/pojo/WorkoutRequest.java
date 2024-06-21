package com.o2tapi.api.pojo;

import java.util.Date;

import com.o2tapi.api.models.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutRequest {
    
    Date registrationDate;
    String title;
    String description;
    User createdBy;
    // Set<Label> labels;

}
