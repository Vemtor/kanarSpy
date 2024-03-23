package com.kanardestroyers.demo.dao;

import com.kanardestroyers.demo.entity.Kanar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KanarRepository extends JpaRepository<Kanar, Integer> {

}
