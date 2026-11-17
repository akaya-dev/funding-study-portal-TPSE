package com.tpse86.student_funding_portal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormPageController {

    @GetMapping("/form")
    public String showForm() {
        return "form";
    }
}
