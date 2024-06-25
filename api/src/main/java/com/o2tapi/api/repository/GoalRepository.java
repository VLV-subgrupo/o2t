package com.o2tapi.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.o2tapi.api.models.Goal;
import com.o2tapi.api.models.User;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long>{

    List<Goal> findAllByCreatedBy(User createdBy);
}
