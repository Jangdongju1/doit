package com.personal.doit.repository;

import com.personal.doit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{

    boolean existsByUserId(String userId);
    User findByUserId(String userId);

}
