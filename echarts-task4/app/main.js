/**
 * Created by gedune on 2017/5/4.
 */
  // 基于准备好的dom，初始化echarts实例
var echarts = require('echarts');
var myChart = echarts.init(document.getElementById('main'));

myChart.showLoading();

var rawData = require('../assert/converted.json');

var index = 30;

var categoryData = [];
var values = [];
var volumes = [];
var data = splitData(rawData);

var option = {
  backgroundColor: '#eee',
  animation: false,
  legend: {
    bottom: 10,
    left: 'center',
    data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000'
    },
    position: function (pos, params, el, elRect, size) {
      var obj = {top: 10};
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
      return obj;
    },
    extraCssText: 'width: 170px'
  },
  axisPointer: {
    link: {xAxisIndex: 'all'},
    label: {
      backgroundColor: '#777'
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      },
      brush: {
        type: ['lineX', 'clear']
      }
    }
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1
    }
  },
  visualMap: {
    seriesIndex: 5,
    dimension: 2,
    pieces: [{
      value: 1,
      color: '#2f4554'
    }, {
      value: -1,
      color: '#c23531'
    }]
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%'
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      splitLine: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      axisTick: {show: false},
      splitLine: {show: false},
      axisLabel: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        label: {
          formatter: function (params) {
            var seriesValue = (params.seriesData[0] || {}).value;
            return params.value
              + (seriesValue != null
                  ? '\n' + echarts.format.addCommas(seriesValue)
                  : ''
              );
          }
        }
      }
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: {show: false},
      axisLine: {show: false},
      axisTick: {show: false},
      splitLine: {show: false}
    }
  ],
  //缩放区域
  // dataZoom: [
  //   {
  //     type: 'inside',
  //     xAxisIndex: [0, 1],
  //     start: 98,
  //     end: 100
  //   },
  //   {
  //     show: true,
  //     xAxisIndex: [0, 1],
  //     type: 'slider',
  //     top: '85%',
  //     start: 98,
  //     end: 100
  //   }
  // ],
  series: [
    {
      name: 'Dow-Jones index',
      type: 'candlestick',
      data: data.values,
      itemStyle: {
        normal: {
          borderColor: null,
          borderColor0: null
        }
      },
      tooltip: {
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('');
        }
      }
    },
    //以下都不用管
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data),
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10, data),
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20, data),
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30, data),
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.volumes
    }
  ]
};



function addData(shift) {

  index++;

  if (rawData[index].Ticker == "A" && shift) {
    //横坐标
    categoryData.push(rawData[index].Date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
    var value = [parseFloat(rawData[index].Open),
      parseFloat(rawData[index].High),
      parseFloat(rawData[index].Low),
      parseFloat(rawData[index].Close),
      parseFloat(rawData[index].Volume)];

    values.push(value);
    volumes.push(rawData[index].Volume);

    categoryData.shift();
    values.shift();
    volumes.shift()
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}

setInterval(function () {
  data = addData(true);

  //小坑，需要重新设置 MA5 系列的 data 值，不然无法刷新
  myChart.setOption({
    xAxis: {
      data: data.categoryData
    },
    series: [{
      name: '日k',
      data: data.values
    },
      {
        name: 'MA5',
        data: calculateMA(5, data)
      },
      {
        name: 'MA10',
        data: calculateMA(10, data)
      },
      {
        name: 'MA20',
        data: calculateMA(20, data),
      },
      {
        name: 'MA30',
        data: calculateMA(30, data),
      },
      {
        name: '成交量',
        data: data.volumns
      }]
  });
}, 200);
myChart.setOption(option);


function splitData(rawData) {

  for (var i = 0; i < index; i++) {

    if (rawData[i].Ticker == "A") {
      //横坐标
      categoryData.push(rawData[i].Date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
      var value = [parseFloat(rawData[i].Open),
        parseFloat(rawData[i].High),
        parseFloat(rawData[i].Low),
        parseFloat(rawData[i].Close),
        parseFloat(rawData[i].Volume)];

      values.push(value);
      volumes.push(rawData[i].Volume);
    }
  }
  myChart.hideLoading();
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}


function calculateMA(dayCount, data) {
  var result = [];
  console.log("data")
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;

    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}
