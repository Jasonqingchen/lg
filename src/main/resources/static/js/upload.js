new Vue({
    el: '#app',
    data() {
        return {
            fileList: [],
            up: false
        }
    },

    //初始化加载方法
    mounted: function () {

    },
    methods: {
        //上传服务
        submitUpload() {
            //判断files数组的长度是否大于0，不大于0 则未选择附件
            if (this.$refs.upload.uploadFiles.length == 0) {
                this.up = true;
                return false;
            }
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        //清除表数据
        cleanTable() {
            this.$confirm('确定清除数据库?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var newthis =this;
                var url = '/membe/cleanTable';
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    success: function (result) {
                        if (result == 1) {
                            newthis.$message({
                                message: '恭喜你，清空成功',
                                type: 'success'
                            });
                        } else {
                            newthis.$message.error('很遗憾，清空失败');
                        }
                    },
                    error: function () {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }).catch(() => {
                this.$notify.error({
                    title: '取消成功',
                    message: '取消成功！'
                });
            });

        }
    }

})