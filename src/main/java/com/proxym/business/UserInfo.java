package com.proxym.business;

import java.util.List;

public class UserInfo {
	
	/**
	 * 
	 */
	private String firstName ;
	/**
	 * 
	 */
	private String lastName ;
	/**
	 * 
	 */
	private String email ;
	/**
	 * list of roles .
	 */
	private List<String> roles;
	
	/**
	 * default constrcutor.
	 */
	public UserInfo() {
	}
	
	

	public UserInfo(String firstName, String lastName, String email,
			List<String> roles) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.roles = roles;
	}



	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	
	
		

}
