new Vue({
    el: '#app',
    data() {
        return {
            tableData:[],
            fits: [ 'contain'],
            xq: false,
            input1:''
        }
    },

    //初始化加载方法
    mounted: function () {

    },
    methods: {
        //时间格式化
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            if(data == null) {
                return null
            }
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        },
        //提交身份证号码
        onSubmit() {
            //console.log('submit!');
            var newthis = this;
            if (newthis.input1=="") {
                newthis.$notify.error({
                    title: '错误',
                    message: '请输入您的身份ID'
                });
                return;
            }
            var url = '/membe/seach';
            $.ajax({
                type: 'POST',
                url: url,
                data: {'id': newthis.input1},
                dataType: 'json',
                success: function (result) {
                    if (result.length>0) {
                        newthis.tableData = result;
                        newthis.xq = true;
                    } else {
                        newthis.$notify.error({
                            title: '提示',
                            message: '您还不是会员 请与管理员取得联系'
                        });
                    }

                },
                error: function () {

                }
            });
        },
    }

})