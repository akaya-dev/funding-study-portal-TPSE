package com.tpse86.student_funding_portal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormPageController {

    // The React app is served at "/"; keep the old /form URL working
    @GetMapping("/form")
    public String showForm() {
        return "forward:/index.html";
    }
}
