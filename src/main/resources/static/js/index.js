new Vue({
    el: '#app',
    data() {
        return {
            tableData:[],
            xq: false,
            rid:'',
            content:''
        }
    },

    //初始化加载方法
    mounted: function () {
        //获得当前登录用户信息
        this.getUser();
    },
    methods: {
        //退出
        out() {
            var url = '/membe/out';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'text',
                success: function (res) {
                        if (res=="success") {
                              window.location.href=urls+"/login";
                        }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //查看当亲登录人详情
        look () {
            var newthis =this;
            var url = '/membe/getUser';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    var list = [];
                    list.push(result)
                    newthis.tableData = list;
                    newthis.xq = true;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //获得当前用户
        getUser () {
            let newthis = this;
            var url = '/membe/getUser';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    $("#rname").prepend("当前登陆用户 ："+result.name);
                    $("#cd").prepend(result.name+" 权限菜单");
                    newthis.content = "用户:"+result.name+" 权限菜单";
                    var url = urls+"/membe/tj";
                    if (result.rid=="用户") {
                        url = urls+"/membe/hyseach";
                        document.getElementById("excel").style.display = "none";
                        document.getElementById("list").style.display = "none";
                        document.getElementById("tp").style.display = "none";
                        document.getElementById("tjsj").style.display = "none";
                        document.getElementById("sp").style.display = "none";
                    }
                    document.getElementById('nr').innerHTML = "";
                    $("#nr").prepend("<iframe src="+ url + " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //index 就是要跳转的路由
        menuClick(index){
            if (index=="1-1") {
                document.getElementById('nr').innerHTML = "";
                $("#nr").prepend("<iframe src="+ urls+"/membe/hyseach"+ " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
            } else if (index=="1-2") {
                document.getElementById('nr').innerHTML = "";
                $("#nr").prepend("<iframe src="+ urls+"/membe/upload"+ " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
            } else if (index=="1-3") {
                document.getElementById('nr').innerHTML = "";
                $("#nr").prepend("<iframe src="+ urls+"/membe/list"+ " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
            }else if (index=="1-4") {
                document.getElementById('nr').innerHTML = "";
                $("#nr").prepend("<iframe src="+ urls+"/membe/echarts"+ " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
            }else if (index=="1-5") {
                document.getElementById('nr').innerHTML = "";
                $("#nr").prepend("<iframe src="+ urls+"/membe/tj"+ " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
            }else if (index=="1-6") {
                document.getElementById('nr').innerHTML = "";
                $("#nr").prepend("<iframe src="+ urls+"/membe/video"+ " width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"overflow:hidden;\"></iframe>");
            }
        },
    }

})