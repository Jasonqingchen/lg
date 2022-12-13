new Vue({
    el: '#app',
    data() {
        return {
            loading: true,
            tableData: [],
            currentPage: 1, //初始页
            pagesize: 5,    //    每页的数据
            search: '',
            form:{
                id:'',
            },
            addmemb: false,
            addForm: {
                zc:'',
                name: '',
                id: '',
                hyzh:'',
                status:'',
                startdata:'',
                dp:'',
                email:'',
                sjhm:'',
                txdz:'',
                zw:'',
                mz:'',
                xb:'',
                gzdw:'',
                hytype:'',
                csrq:'',
            }
        }
    },

    //初始化加载方法
    mounted: function () {
        this.list();
    },
    methods: {

        //保存
        submit() {
            var addForm = this.addForm;
            var newthis = this;
            var d = {
                'dp': addForm.dp,
                'email': addForm.email,
                'sjhm': addForm.sjhm,
                'txdz': addForm.txdz,
                'zw': addForm.zw,
                'mz': addForm.mz,
                'xb': addForm.xb,
                'gzdw': addForm.gzdw,
                'hytype': addForm.hytype,
                'csrq': addForm.csrq,
                'zc': addForm.zc,
                'status': addForm.status,
                'name': addForm.name,
                'id': addForm.id,
                'hyzh': addForm.hyzh,
                'enddata': addForm.enddata
            };
            var url = '/membe/add';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    if (result == 1) {
                        newthis.list();
                        newthis.addmemb = false;
                        newthis.$message({
                            message: '恭喜你，添加成功',
                            type: 'success'
                        });
                    } else {
                        newthis.$message.error('很遗憾，添加失败');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //打开添加页面
        add() {
            var self = this;
            self.addform = [];
            self.addmemb = true;
        },
        //条件搜索
        seach (){
            var form = this.form;
            var _$this = this;
            var d = {
                'id': form.id,
            };
            var url = '/membe/lists';
            $.ajax({
                type: 'POST',
                url: url,
                data: d,
                dataType: 'json',
                success: function (result) {
                    if (result.length>0) {
                        _$this.conuntsize = result.length;
                        _$this.tableData = result;
                    } else {
                        _$this.conuntsize = result.length;
                        _$this.tableData = [];
                    }

                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        list () {
            var newthis = this;
            var url = '/membe/lists';
            $.ajax({
                type: 'POST',
                url: url,
                // data: {'id': newthis.input1},
                dataType: 'json',
                success: function (result) {
                    if (result.length>0) {
                        newthis.tableData = result;
                        newthis.loading=false;
                    }
                },
                error: function () {

                }
            });
        },
        //编辑
        handleEdit(index, row) {
            console.log(index, row);
        },
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
        //删除
        handleDelete(index, row) {
            var newth = this;
            this.$confirm('确定删除该条报名?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = '/membe/del';
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: {'guid': row.guid},
                    dataType: 'json',
                    success: function (result) {
                        if (result == 1) {
                            newth.list();
                            newth.$message({
                                message: '恭喜你，删除成功',
                                type: 'success'
                            });
                        } else {
                            newth.$message.error('很遗憾，删除失败');
                        }
                    },
                    error: function () {

                    }
                });
            }).catch(() => {
                newth.$notify.error({
                    title: '取消删除',
                    message: '取消删除！'
                });
            });
            console.log(index, row);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
        },
    }

})