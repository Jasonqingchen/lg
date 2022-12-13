new Vue({
    el: '#app',
    data() {
        return {
        }
    },

    //初始化加载方法
    mounted: function () {
        this.init();
    },
    methods: {

        init() {
           // var ideovSource =  "http://www.w3school.com.cn/example/html5/mov_bbb.mp4";
            var ideovSource =  "/imgs/v.mp4";
            // 初始化播放器
            new Aliplayer({
            id: "J_prismPlayer", // 容器id
                source: ideovSource,//视频地址// cover: "http://cdn.img.mtedu.com/images/assignment/day_3.jpg",  //播放器封面图
                autoplay: false,      // 是否自动播放
                width: "100%",       // 播放器宽度
                height: "810px",      // 播放器高度
                playsinline: true,
                "skinLayout": [
                {
                    "name": "bigPlayButton",
                    "align": "blabs",
                    "x": 30,
                    "y": 80
                },
                {
                    "name": "H5Loading",
                    "align": "cc"
                },
                {
                    "name": "errorDisplay",
                    "align": "tlabs",
                    "x": 0,
                    "y": 0
                },
                {
                    "name": "infoDisplay"
                },
                {
                    "name": "tooltip",
                    "align": "blabs",
                    "x": 0,
                    "y": 56
                },
                {
                    "name": "thumbnail"
                },
                {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [
                        {
                            "name": "progress",
                            "align": "blabs",
                            "x": 0,
                            "y": 44
                        },
                        {
                            "name": "playButton",
                            "align": "tl",
                            "x": 15,
                            "y": 12
                        },
                        {
                            "name": "timeDisplay",
                            "align": "tl",
                            "x": 10,
                            "y": 7
                        },
                        {
                            "name": "fullScreenButton",
                            "align": "tr",
                            "x": 10,
                            "y": 12
                        },
                        {
                            "name": "volume",
                            "align": "tr",
                            "x": 5,
                            "y": 10
                        }
                    ]
                }
            ]
        })
        }
    }

})