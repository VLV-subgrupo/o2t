package com.o2tapi.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Register {

    @Id
    @Email(message = "*Please provide a valid Email")
    @NotNull(message = "*Please provide an email")
    private String email;

    @NotEmpty
    @Size(max = 255)
    @Column(columnDefinition = "TEXT", length = 255)
    private String name;

    @NotEmpty
    @Size(max = 255)
    @Column(columnDefinition = "TEXT", length = 255)
    private String sport;

    @NotEmpty
    @JsonIgnore
    @Size(max = 255)
    @Column(columnDefinition = "TEXT", length = 255)
    private String hash;


    @JsonIgnore
    @Size(max = 255)
    @Column(columnDefinition = "TEXT", length = 255)
    private String password;
}
