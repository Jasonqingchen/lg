package com.example.LqcSpringBoot.controller;


import com.example.LqcSpringBoot.mapper.MembeMapper;
import com.example.LqcSpringBoot.mapper.UserMapper;
import com.example.LqcSpringBoot.model.Membe;
import com.example.LqcSpringBoot.model.User;
import com.example.LqcSpringBoot.ut.MainPartimportBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.types.RedisClientInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;


/**
 * liuqingchen
 * 2022/05/21
 * 会员查询与导入系统
 */
@Controller
@RequestMapping("/membe")
public class MembeController {
    @Autowired
    private MembeMapper membeMapper;
    @Autowired
    public UserMapper userMapper;
    @Autowired
    private MainPartimportBean mainPartimportBean;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    //用户查询页面（后台）
    @RequestMapping("/hyseach")
    public String hyseach () {
        return "hyseach";
    }
    //首页
    @RequestMapping("/index")
    public String index () {
        return "index";
    }

    //用户查询页面（后台）
    @RequestMapping("/video")
    public String video () {
        return "video";
    }

    @RequestMapping("/upload")
    public String upload () {
        return "upload";
    }

    @RequestMapping("/tj")
    public String tj () {
        return "tj";
    }


    /**
     * 跳转列表页面
     * @return
     */
    @RequestMapping("/list")
    public String list () {
        return "list";
    }

    /**
     * 关系图
     * @return
     */
    @RequestMapping("/echarts")
    public String echarts () {
        return "echarts";
    }


    /**
     * 登录
     * @return
     */
    @CrossOrigin
    @RequestMapping("/loginsubmit")
    @ResponseBody
    public Object loginsubmit (HttpServletRequest request, HttpServletResponse response , @RequestParam Map map) {
        String flag ="success";
       List<User> list = userMapper.selectUserByNameAndPassword(map.get("name").toString(),map.get("password").toString());
        if (list.size()>0) {
            request.getSession().setAttribute("token", list.get(0));
            /*try {
                response.sendRedirect( "http://localhost:8081/membe/index" );
            } catch (IOException e) {
                e.printStackTrace();
            }*/
        } else {
            flag="error";
        }
        return flag;
    }

    /**
     * 获得当前用户
     * @param request
     * @return
     */
    @RequestMapping("getUser")
    @ResponseBody
    public static User getUser (HttpServletRequest request) {
        return (User)request.getSession().getAttribute("token");
    }

    /**
     * 退出
     * @param request
     * @return
     */
    @RequestMapping("out")
    @ResponseBody
    public String out (HttpServletRequest request) {
        String flag ="success";
        request.getSession().removeAttribute("token");
        return flag ;
    }

    /**
     * 导入会员
     * @return
     */
    @RequestMapping("/dr")
    public String dr (HttpServletRequest request, @RequestParam(required = false) MultipartFile file ) throws IOException {
        InputStream fileInputStream = null;
        fileInputStream = file.getInputStream();
        mainPartimportBean.insertDB(fileInputStream);
        request.getSession().setAttribute("message", "导入成功");
        request.getSession().setAttribute("url", "topic/list");
        return String.format("redirect:/message");
    }

    @RequestMapping("/cleanTable")
    @ResponseBody
    public Integer cleanTable (Membe membe) {
        membeMapper.cleanTable();
        return 1;
    }

    @RequestMapping("/add")
    @ResponseBody
    public Integer inser (Membe membe) {
        membe.setGuid(UUID.randomUUID().toString().replace("-", "").toString());
        int insert = membeMapper.insert(membe);
        return insert;
    }

    /**
     * 条件搜索 （redis缓存提高查询效率）
     */
    @RequestMapping("/seach")
    @ResponseBody
    public List<Membe> seach (@RequestParam Map map) {
        /*List<Membe> list= new ArrayList<>();
        Membe membe = (Membe)redisTemplate.opsForValue().get((String)map.get("id"));
         if (membe==null) {
             list = membeMapper.selectMembeById((String)map.get("id"));
         } else {
             list.add(membe);
             return list;
         }*/
        List<Membe> list = membeMapper.selectMembeById((String)map.get("id"));
        return list;
    }

    /**
     * 删除
     */
    @RequestMapping("/del")
    @ResponseBody
    public Integer del (@RequestParam Map map) {
        Integer i = membeMapper.deleteMembeById((String) map.get("guid"));
        return i;
    }

    /**
     * 列表查询（从数据库中查询 可能存在缓存中还未来的急同步的情况）
     */
    @RequestMapping("/lists")
    @ResponseBody
    public List<Membe> lists (@RequestParam Map map) {
        List<Membe> list=null;
        if (map.size()>0 && map.get("id")!="") {
            list = seach(map);
        } else {
            list = membeMapper.selectList(null);
        }
        return list;
    }


    /**
     * echarts 数据查询与封装
     */
    @RequestMapping("/echartsdata")
    @ResponseBody
    public List<Map> echartsdata () {
        List list = new ArrayList();
        List list2 = new ArrayList();
        //第1层
        Map map1 = new HashMap();
        List<Membe> listCategories = membeMapper.selectCategories();
        List<Membe> listNodes = membeMapper.selectNodes();
        listCategories.forEach(as->{
            Map map2 = new HashMap();
            List list3 = new ArrayList();
            listNodes.forEach(as1->{
                if (as.getZc().equals(as1.getZc())) {
                    Map map3 = new HashMap();
                    map3.put("name",as1.getName());
                    map3.put("value",as1.getZc());
                    list3.add(map3);
                }
          });

            map2.put("name",as.getZc());
            map2.put("children",list3);
            list2.add(map2);
        });
        map1.put("name","职称");
        map1.put("children",list2);
        list.add(map1);
        return list;
    }
}
