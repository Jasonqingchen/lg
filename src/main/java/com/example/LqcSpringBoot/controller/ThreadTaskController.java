package com.example.LqcSpringBoot.controller;

import com.example.LqcSpringBoot.mapper.MembeMapper;
import com.example.LqcSpringBoot.model.Membe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * 定时任务类
 * 刘清臣  2022/06/24
 */
@Controller
@RequestMapping("/membe")
public class ThreadTaskController {
    public final static long ONE_Minute =  3600 * 1000;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private MembeMapper membeMapper;

    /**
     * 定时同步数据库数据到redis中
     * 一小时
     */
    /*@Scheduled(fixedRate=ONE_Minute)
    public void testRedis () {
        redisTemplate.keys("*");//清空缓存
        List<Membe> membes = membeMapper.selectList(null);
        membes.forEach(list->{
            redisTemplate.opsForValue().set(list.getId(),list);
        });
    }*/
}
