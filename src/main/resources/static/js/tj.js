new Vue({
    el: '#app',
    data() {
        return {
            animate: false,
            count: [],
            loading: true
        }
    },

    //初始化加载方法
    mounted: function () {
        this.init();
        this.zzt();
        this.bzt();
        this.gdt();
        var kk = this;
        this.timer1 =  setInterval(function(){
            kk.scroll();
        },300)
    },
    methods: {
        scroll() {
            //建一个方法
            let con1 = this.$refs.con1;
            con1.style.marginTop = "0px"; //设置style样式 向上移动30px
            this.animate = !this.animate; //
            var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
            setTimeout(function () {
                that.count.push(that.count[0]); //尾部追加数组的第一个，放到数组最后
                that.count.shift(); //删除第一个元素
                con1.style.marginTop = "0px"; //设置style样式 向上移动30px 再回到原位
                that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            }, 300);
        },
        mEnter() {
            clearInterval(this.timer1); //鼠标移入清除定时器
        },
        mLeave() {
            this.timer1 = setInterval(this.scroll, 300); //鼠标离开启动定时器，执行 scroll
        },

        bzt() {
            var newthis = this;
            var url = '/membe/bzt';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    newthis.testbzt(result);
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        testbzt(data) {
            var dom = document.getElementById("container2");
            var myChart = echarts.init(dom);
            option = null;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['20%', '60%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data
                    }
                ]
            };
            myChart.setOption(option);
        },
        //滚动条
        gdt() {
            var newthis = this;
            var url = '/membe/gdt';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    newthis.count =result;
                    newthis.loading=false;
                    /*for (var i=0;i<result.length;i++) {
                        newthis.count.push(result[i].name+"   "+result[i].id);
                    }*/

                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //后台赋值
        init() {
            var url = '/membe/one';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    document.getElementById("a").innerHTML = result.a;
                    document.getElementById("b").innerHTML = result.b;
                    document.getElementById("c").innerHTML = result.c;
                    document.getElementById("d").innerHTML = result.d;
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //点击事件
        a(flag){
        },
        //柱状图
        zzt() {
            var newthis = this;
            var url = '/membe/zzt';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    newthis.testzzt(result);
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        testzzt :function (data) {
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            option = null;
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data.b,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        barWidth: '60%',
                        data: data.a
                    }
                ]
            };
            myChart.setOption(option);
        },
        //清除表数据
        cleanTable() {
            let newThis = this;
            var url = '/membe/cleanTable';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function (result) {
                    if (result == 1) {
                        newThis.$message({
                            message: '恭喜你，清空成功',
                            type: 'success'
                        });
                    } else {
                        newThis.$message.error('很遗憾，清空失败');
                    }
                },
                error: function () {
                    console.log('error submit!!');
                    return false;
                }
            });

        }
    }

})