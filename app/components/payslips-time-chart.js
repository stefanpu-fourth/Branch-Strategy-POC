import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payslip__line'],

  payslips: null,

  xCategories: function () {
    return this.get('payslips').getEach('formattedProcessingDate').toArray();
  }.property('payslip'),

  grossPaySeries: function () {
    return this.get('payslips').getEach('grossPay').toArray();
  }.property('payslip'),

  netPaySeries: function () {
    return this.get('payslips').getEach('netPay').toArray();
  }.property('payslip'),

  didInsertElement: function() {
    var props = this.getProperties('xCategories', 'grossPaySeries', 'netPaySeries');

    this.$().highcharts({
      chart: {
        type: 'spline',
        marginLeft: 0,
        marginRight: 0
      },
      title: null,
      xAxis: {
        categories: props.xCategories,
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
          formatter: function () {
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
        data: props.grossPaySeries
      }, {
        marker: {
          symbol: 'circle'
        },
        name: 'Take home',
        color: '#9cbf2b',
        data: props.netPaySeries
      }]
    });
  }
});
