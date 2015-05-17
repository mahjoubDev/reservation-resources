package com.proxym.controller;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.proxym.business.UserInfo;
import com.proxym.exception.GestionResourceException;
import com.proxym.service.UserService;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;

/**
 * Rest controller for managing the Resource.
 * 
 * @author Nessrine
 * @version 1.0
 */
@Api(basePath = "/proxym", value = "User", description = "Operations with Users", produces = "application/json")
@RestController
@RequestMapping("/proxym/user")
public class UserController extends AbstractRestHandler {
	/**
	 * {@link UserService}
	 */
	@Autowired
	private UserService userService ;
	
	/**
	 * The logger instance . All log messages from this class are routed through
	 * this member.
	 */
	private final  static Logger LOGGER = LoggerFactory.getLogger(ResourceController.class);
	
	/**
	 * get the current user informations.
	 * 
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/account",method=RequestMethod.GET,produces = "application/json")
	@ApiOperation(value = "Get current user informations", notes = "Get current user informations")
	public UserInfo getAccount () throws Exception  {
	//	User user = userService.getUserCurrent() ;
	//	UserInfo userInfo =new UserInfo();
//		userInfo.setFirstName(user.getFirstName());
//		userInfo.setLastName(user.getLastName());
//		userInfo.setEmail(user.getEmail());
//		userInfo.setRoles(userService.getRoles());
		List<String> roles = Arrays.asList("[users","Domain Admins","Proxym-Group","Enterprise Admins", "Grp_Crm]");
		UserInfo userInfo = new UserInfo("marzougui","mahjoub","marzouguimahjoub@gmail.com",roles);
		
		return userInfo ;
		
	}
 
}
