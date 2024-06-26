package com.o2tapi.api.pojo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GoalDTO {

    private Long createdBy;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date targetDate;

    private Float weight; // kg

    private Float hydration; // L

    private Float sleep; // minutes

    private Float calories;
}
