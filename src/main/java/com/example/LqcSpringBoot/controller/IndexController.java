package com.example.LqcSpringBoot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class IndexController {


    //用户查询页面(用户)
    @RequestMapping("/seachtz")
    public String seachtz () {
        return "seach";
    }

    @RequestMapping("/login")
    public String login () {
        return "loginpage";
    }
}
