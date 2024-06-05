package com.o2tapi.api.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(max = 255)
    @Column(columnDefinition = "TEXT", length = 255)
    private String name;

    @NotNull
    @Email(message = "*Provide a valid email")
    private String email;

    @JsonIgnore
    @NotNull
    @Size(min = 8, message = "*Your password must have at least 8 characters.")
    private String password;

    @NotNull
    @Size(max = 255)
    @Column(columnDefinition = "TEXT", length = 255)
    private String sport;

}
