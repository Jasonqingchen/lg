new Vue({
    el: '#app',
    data() {
        return {
            form :{
                name:'',
                password:''
            }
        }
    },

    //初始化
    mounted: function () {
    },
    methods: {
        //登录方法
        loginpage () {
            var form = this.form;
            var newthis = this;
            var d = {
                'name': form.name,
                'password': form.password
            };
            var url = '/membe/loginsubmit';
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'text',
                data: d,
                success: function (res) {
                    if (res=="error") {
                        $("#error").prepend("<span style=\"color: #f11259; font-size: 12px;\"><strong>用户名或者密码有误</strong></span>");
                    } else {
                        window.location.href=urls+"/membe/index";
                    }
                },
                error: function () {

                }
            });

        },
        zc() {

        },
        passwordclik(){
            document.getElementById('error').innerHTML = "";
        },
        nameclik () {
            document.getElementById('error').innerHTML = "";
        }
    }
})