new Vue({
    el: '#app',
    data() {
        return {
            fileList: [],
            up:false
        }
    },

    //初始化加载方法
    mounted: function () {
        var newthis = this;
        $.ajax({
            type: 'POST',
            url: '/membe/echartsdata',
            dataType: 'json',
            success: function (result) {
                //echart
                newthis.echarinit(result);
            },
            error: function () {

            }
        });
    },
    methods: {
        echarinit:function (data){
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            option = null;
            data[0].children.forEach(function (datum, index) {
                index % 2 === 0 && (datum.collapsed = true);
            });
            option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'tree',
                        data: [data[0]],
                        left: '2%',
                        right: '2%',
                        top: '8%',
                        bottom: '20%',
                        symbol: 'emptyCircle',
                        orient: 'vertical',
                        expandAndCollapse: true,
                        label: {
                            position: 'top',
                            rotate: -90,
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 9
                        },
                        leaves: {
                            label: {
                                position: 'bottom',
                                rotate: -90,
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        },
                        animationDurationUpdate: 750
                    }
                ]
            }
            myChart.setOption(option);
        }

    }

})