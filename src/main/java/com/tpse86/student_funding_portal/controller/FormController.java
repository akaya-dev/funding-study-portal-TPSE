package com.tpse86.student_funding_portal.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormController {

    @PostMapping("/submit")
    public String handleSubmit(@RequestParam String field1, @RequestParam String field2) {
        return "Received: " + field1 + ", " + field2;
    }
}
