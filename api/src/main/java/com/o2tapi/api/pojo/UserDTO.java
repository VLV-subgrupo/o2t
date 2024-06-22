package com.o2tapi.api.pojo;

import jakarta.validation.constraints.Email;

public class UserDTO {
    
    private String name;

    @Email(message = "*Provide a valid email")
    private String email;
    private String sport;


    public UserDTO(String name, String email, String sport) {
        this.name = name;
        this.email = email;
        this.sport = sport;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getSport() {
        return sport;
    }


    public void setSport(String sport) {
        this.sport = sport;
    }

     
    
}
