package com.o2tapi.api.repository;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    List<Workout> findAllByCreatedBy(User user);

    List<Workout> findAllByCreatedByAndRegistrationDate(User user, Date registrationDate);
}
