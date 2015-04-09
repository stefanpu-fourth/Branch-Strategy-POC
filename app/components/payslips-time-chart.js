import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payslip__line'],

  didInsertElement: function() {
    this.$().highcharts({
      chart: {
        type: 'spline',
        marginLeft: 0,
        marginRight: 0
      },
      title: null,
      xAxis: {
        categories: ['06 Jan', '11 Jan', '18 Jan', '23 Jan', '30 Jan', '05 Feb', '12 Feb', '19 Feb', '26 Feb', '05 Mar', '12 Mar', '19 Mar'],
        tickmarkPlacement: 'on',
        tickWidth: 0,
        gridLineWidth: 1,
        tickLength: 0,
        gridLineColor: '#CCC',
        lineColor: '#CCC',
        labels: {
          autoRotation: [0, -45, -90],
          style: {
            'color': '#999999'
          },
        }
      },
      yAxis: {
        min: 0,
        gridLineColor: '#CCC',
        gridLineDashStyle: 'ShortDot',
        title: {
          text: null
        },
        labels: {
          align: 'left',
          zIndex: 1,
          x: 0,
          y: -2,
          style: {
            'color': '#999999'
          },
          formatter: function() {
            return '£' + this.value;
          }
        }
      },
      tooltip: {
        shared: true
      },
      series: [{
        marker: {
          symbol: 'circle'
        },
        name: 'Total',
        color: '#CCC',
        data: [965, 1121, 887, 954, 1021, 965, 1121, 887, 954, 1021, 854, 937]
      }, {
        marker: {
          symbol: 'circle'
        },
        name: 'Take home',
        color: '#9cbf2b',
        data: [875, 1055, 822, 900, 955, 871, 1052, 840, 903, 955, 807, 889]
      }]
    });
  }
});
