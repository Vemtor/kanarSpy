package com.kanardestroyers.demo.service;

import com.kanardestroyers.demo.dao.KanarRepository;
import com.kanardestroyers.demo.entity.Kanar;

import java.util.List;

public interface KanarService {




    List<Kanar> findAll();

    Kanar findBiId(int theId);

    Kanar save(Kanar theKanar);

    void deleteById(int theId);

}
