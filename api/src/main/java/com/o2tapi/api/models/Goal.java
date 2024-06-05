package com.o2tapi.api.models;

import java.util.Date;

import org.springframework.data.annotation.CreatedBy;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedBy
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(referencedColumnName = "id")
    private User createdBy;

    @NotNull
    private Float weight; // kg

    @NotNull
    private Float hydration; // L

    @NotNull
    private Float sleep; // minutes

    @NotNull
    private Float calories;

    @Temporal(TemporalType.TIMESTAMP)
    private Date targetDate;
}
