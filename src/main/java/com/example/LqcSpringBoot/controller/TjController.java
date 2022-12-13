package com.example.LqcSpringBoot.controller;

import com.example.LqcSpringBoot.mapper.MembeMapper;
import com.example.LqcSpringBoot.model.Membe;
import com.example.LqcSpringBoot.ut.MainPartimportBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * liuqingchen
 * 2022/06/06
 * 主界面
 */
@Controller
@RequestMapping("/membe")
public class TjController {
    @Autowired
    private MembeMapper membeMapper;
    @Autowired
    private MainPartimportBean mainPartimportBean;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;


    @RequestMapping("/one")
    @ResponseBody
    public Map cleanTable () {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String format = formatter.format(new Date());

        Map map = new HashMap();
        Integer a = membeMapper.onezshy();
        Integer b = membeMapper.oneygq();
        Integer c = membeMapper.onenan();
        Integer d = membeMapper.onenv();
        map.put("a",a);
        map.put("b",b);
        map.put("c",c);
        map.put("d",d);
        return map;
    }

    @RequestMapping("/zzt")
    @ResponseBody
    public Map zzt () {
        Map map = new HashMap();
        List list1 = new ArrayList();
        List list2 = new ArrayList();
        List<Map> cc = membeMapper.getZcAndCount();
        cc.forEach(res->{
            list1.add(res.get("value"));
            list2.add(res.get("name"));
        });
        map.put("a",list1);
        map.put("b",list2);
        return map;
    }

    @RequestMapping("/gdt")
    @ResponseBody
    public List<Membe> gdt () {
        /*Set<String> keys = redisTemplate.keys("*");
        if (!keys.isEmpty()) {
            List<Membe> list = new ArrayList<>();
            keys.forEach(key->{
                list.add((Membe)redisTemplate.opsForValue().get(key));
            });
            return list;
        } else {
            return membeMapper.selectOderLimit();
        }*/
        return membeMapper.selectOderLimit();
    }

    @RequestMapping("/bzt")
    @ResponseBody
    public List<Map>  bzt () {
            return membeMapper.getZcAndCount();
    }
}
