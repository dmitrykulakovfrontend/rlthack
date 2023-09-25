package com.cringeneers.rlthack;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.List;

@SpringBootApplication
@RestController
public class RlthackApplication {
	private final Logger logger = LoggerFactory.getLogger(RlthackApplication.class);
	@Autowired
	private CustomerRepository repository;
	@RequestMapping("/")
	public String home() {
		return "Dockerizing Spring Boot Application";
	}
	@GetMapping("/api/test")
    public ResponseEntity<ApiResponse<Customer>> test() {
        List<Customer> allCustomers = this.repository.findAll();
        ApiResponse<Customer> response = new ApiResponse<>(allCustomers);
        return ResponseEntity.ok(response);
    }
	@EventListener(ApplicationReadyEvent.class)
	public void runAfterStartup() {
		List allCustomers = this.repository.findAll();
		logger.info("Number of customers: " + allCustomers.size());

		Customer newCustomer = new Customer();
		newCustomer.setFirstName("John");
		newCustomer.setLastName("Doe");
		logger.info("Saving new customer...");
		this.repository.save(newCustomer);

		allCustomers = this.repository.findAll();
		logger.info("Number of customers: " + allCustomers.size());
	}


	public static void main(String[] args) {
		SpringApplication.run(RlthackApplication.class, args);
	}

}