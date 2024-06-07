package com.o2tapi.api.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDTO {
    
    private String name;
    private String email;
    private String password;
    private String sport;
}
