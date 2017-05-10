/**
 * Created by gedune on 2017/5/4.
 */
    // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {
        //触发类型 [ default: 'item' ] 。axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
        //'item' 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        //'none' 什么都不触发。
        trigger: 'axis',

        // 坐标轴指示器，坐标轴触发有效
        axisPointer: {
            type: 'cross'       // 指示器类型。默认为直线，可选为：'line' | 'shadow'
        }
    },

    //图例组件,展现了不同系列的标记，颜色和名字。可以通过点击图例控制哪些系列不显示。
    legend: {

        //图例的数据数组。跟 series 中的 name 对应
        data: ['销量'],

        //当然还有很多其他样式可以设置，比如说形状，文字的颜色等
    },


    xAxis: [
        {
            //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            type: 'category',
            // 类目数据，在类目轴（type: 'category'）中有效。
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],

            //y轴坐标数值的最小值，可用来提高精度
            min: 20
        }
    ],

    yAxis: {},

    //系列列表。每个系列通过 type 决定自己的图表类型
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);