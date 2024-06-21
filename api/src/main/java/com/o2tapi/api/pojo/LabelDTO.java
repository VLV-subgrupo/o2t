package com.o2tapi.api.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LabelDTO {
    
    private String name;
    private String color;
    private Long createdById;

}
