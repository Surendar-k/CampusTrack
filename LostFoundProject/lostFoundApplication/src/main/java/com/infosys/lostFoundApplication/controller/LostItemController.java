package com.infosys.lostFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.dao.LostItemDao;
import com.infosys.lostFoundApplication.service.LostItemService;
import com.infosys.lostFoundApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class LostItemController {
    @Autowired 
    private LostfoundUserService service;
	
    @Autowired
    private LostItemService lostService;
    
    @Autowired
	private LostItemDao lostItemDao;
	
    @PostMapping("/lost")
	public void saveLostItem(@RequestBody LostItem lostItem) {
		lostItemDao.saveLostItem(lostItem);

	}

	@GetMapping("/lost")
	public List<LostItem> getAllLostItems() {
		return lostItemDao.getAllLostItems();
	}

	@GetMapping("/lost/{id}")
	public LostItem getLostItemById(@PathVariable String id) {
		return lostItemDao.getLostItemById(id);
	}

	@DeleteMapping("/lost/{id}")
	public void deleteLostItemById(@PathVariable String id) {
		lostItemDao.deleteLostItemById(id);

	}

	@PutMapping("/lost")
	public void updateLostItem(@RequestBody LostItem lostItem) {
		lostItemDao.saveLostItem(lostItem);

	}

	@GetMapping("/lost-id")
	public String generateId() {
		return lostService.generateLostItemId();
		
	}
	@GetMapping("/lost-user")
	List<LostItem> getLostItemsByUsername(){
		String userId=service.getUserId();
		return lostItemDao.getLostItemsByUsername(userId);
	}
}