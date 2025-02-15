package com.personal.doit.repository;

import com.personal.doit.entity.Schedule;
import com.personal.doit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
//    List<Schedule> findAllByWriter(User user );



    Schedule findBySequence(Integer sequence);

    @Query(value = "SELECT * FROM schedule WHERE " +
            "schedule_year IN (:prevYear, :thisYear, :nextYear) " +
            "AND " +
            "schedule_month IN (:prevMonth, :thisMonth, :nextMonth) "
            , nativeQuery = true)
    List<Schedule> getScheduleList(@Param("prevYear") Integer prevYear,
                                   @Param("prevMonth") Integer prevMonth,
                                   @Param("thisYear") Integer thisYear,
                                   @Param("thisMonth") Integer thisMonth,
                                   @Param("nextYear") Integer nextYear,
                                   @Param("nextMonth") Integer nextMonth);
}
