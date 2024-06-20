package com.o2tapi.api.pojo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TimerRequest {
    
    private Date startDate;
    private Date endDate;

}
