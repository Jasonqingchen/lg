package com.example.LqcSpringBoot.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.LqcSpringBoot.model.Membe;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface MembeMapper extends BaseMapper<Membe> {
    //查找对象
    List<Membe> selectMembeById(String id);
    //查找列表
    List<Membe>  selectMembeAll();
    //删除
    Integer deleteMembeById(String guid);

    List<Membe> selectCategories();

    List<Membe> selectNodes();

    Integer cleanTable();

    Integer onezshy();
    Integer oneygq();
    Integer onenan();
    Integer onenv();
    List<Map> getZcAndCount();

    List<Membe> selectOderLimit();


}
