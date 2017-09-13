<template>
  <div>
    <!--Charts-->
    <div class="row">

      <highcharts :options="options" ref="highcharts"></highcharts>
      
      
      <div class="col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Users behavior</h4>
          <span slot="subTitle"> 24 Hours performance</span>
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import VueHighchartsCard from 'components/UIComponents/Cards/VueHighchartsCard.vue'
   
   var axios = require('axios')
 
  var options = {
  title: {
    text: 'Monthly Average Temperature',
    x: -20 //center
  },
  subtitle: {
    text: 'Source: WorldClimate.com',
    x: -20
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
  },
  yAxis: {
    title: {
      text: 'Temperature (°C)'
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  },
  tooltip: {
    valueSuffix: '°C'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  }
};
  export default {
    components: {
      ChartCard,
      VueHighchartsCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
      options:options,
        usersChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 562, 594, 626, 698, 895, 952],
              [67, 152, 193, 240, 387, 435, 535, 642, 744],
              [23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
          },
          options: {
            low: 0,
            high: 1000,
            showArea: true,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: this.$Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false
          }
        }
      }
    },
    
    mounted: function() {
      var chart = this.$refs.highcharts.chart;
		//chart.hideNoData();
		//chart.showNoData("Loading data...");
		
		var vm = this;
		var chart = vm.$refs.highcharts.chart;
		
        axios.get('http://localhost:8000/chart-data')
          .then(function (response) {
				var chart = vm.$refs.highcharts.chart;
				response.data.series.forEach(function(element) {
					chart.addSeries(element, false);
				});
			
				//chart.hideNoData();
				chart.redraw();
          })
          .catch(function (error) {
            //chart.showNoData("Error: Failed to load chart data!");
          })
    }
  }
</script>
<style>

</style>
