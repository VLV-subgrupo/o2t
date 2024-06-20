package com.o2tapi.api.pojo;

public class LabelDTO {
    
    private String name;
    private String color;
    private Long createdById;

    public LabelDTO(String name, String color, Long createdById) {
        this.name = name;
        this.color = color;
        this.createdById = createdById;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public void setCreatedById(Long createdById) {
        this.createdById = createdById;
    }
}
