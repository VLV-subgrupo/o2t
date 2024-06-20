package com.o2tapi.api.pojo;

import java.util.Date;
// import java.util.Set;

// import com.o2tapi.api.models.Label;

public class WorkoutDTO {
    // TODO: Add labels
    private Date registrationDate;
    private String title;
    private String description;
    private Long createdById;
    // private Set<Label> labels;

    public WorkoutDTO(Date registrationDate, String title, String description, Long createdById) {
        this.registrationDate = registrationDate;
        this.title = title;
        this.description = description;
        this.createdById = createdById;
        // this.labels = labels;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public void setCreatedById(Long createdById) {
        this.createdById = createdById;
    }

    // public Set<Label> getLabels() {
    //     return labels;
    // }

    // public void setLabels(Set<Label> labels) {
    //     this.labels = labels;
    // }
}
