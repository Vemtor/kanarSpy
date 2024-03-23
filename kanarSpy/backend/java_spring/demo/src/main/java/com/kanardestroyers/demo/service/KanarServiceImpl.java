package com.kanardestroyers.demo.service;

import com.kanardestroyers.demo.dao.KanarRepository;
import com.kanardestroyers.demo.entity.Kanar;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class KanarServiceImpl implements KanarService {

    private KanarRepository kanarRepository;

    @Autowired
    public KanarServiceImpl(KanarRepository theKanarRepository){
        kanarRepository = theKanarRepository;
    }



    @Override
    public List<Kanar> findAll() {
        return kanarRepository.findAll();
    }

    @Override
    public Kanar findBiId(int theId) {
        Optional<Kanar> result = kanarRepository.findById(theId);

        Kanar theKanar = null;

        if (result.isPresent()) {
            theKanar = result.get();
        }
        else {
            // we didn't find the employee
            throw new RuntimeException("Did not find kanar id - " + theId);
        }

        return theKanar;
    }

    @Override
    public Kanar save(Kanar theKanar) {
        return kanarRepository.save(theKanar);
    }

    @Override
    public void deleteById(int theId) {
        kanarRepository.deleteById(theId);
    }
}
