package com.o2tapi.api.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PasswordDTO {
    
    private String previousPassword;
    private String newPassword;
}
