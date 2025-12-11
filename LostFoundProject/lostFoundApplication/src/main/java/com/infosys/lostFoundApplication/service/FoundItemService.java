package com.infosys.lostFoundApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.dao.FoundItemDao;

@Service
public class FoundItemService {

    @Autowired
    private FoundItemDao foundItemDao;

    public String generateFoundItemId() {
        String newId = "";
        String id = foundItemDao.getLastId();
        
        if (id == null) {
            newId = "F100001";
        } else {
            int num = Integer.parseInt(id.substring(1)) + 1;
            newId = "F" + num;
        }
        return newId;
    }
}


