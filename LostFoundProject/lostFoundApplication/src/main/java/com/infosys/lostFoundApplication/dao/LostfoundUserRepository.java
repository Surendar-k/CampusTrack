package com.infosys.lostFoundApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.lostFoundApplication.bean.LostfoundUser;

public interface LostfoundUserRepository extends JpaRepository<LostfoundUser, String> {

}
