package com.example.LqcSpringBoot.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.LqcSpringBoot.model.User;

import java.util.List;

public interface UserMapper extends BaseMapper<User> {

    List<User> selectUserByNameAndPassword(String name, String password);
}
