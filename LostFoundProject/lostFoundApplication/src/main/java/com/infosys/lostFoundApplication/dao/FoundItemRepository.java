package com.infosys.lostFoundApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.infosys.lostFoundApplication.bean.FoundItem;

public interface FoundItemRepository extends JpaRepository<FoundItem, String> {

	    @Query("SELECT max(foundItemId) FROM FoundItem")
	    public String getLastId();

	    @Query("SELECT a FROM FoundItem a WHERE a.username = ?1")
	    public List<FoundItem> getFoundItemsByUsername(String username);
}
