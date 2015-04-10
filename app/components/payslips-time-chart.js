import Ember from 'ember';
import i18n from 'fourth-components/i18n';

export default Ember.Component.extend({
  classNames: ['payslip__line'],

  payslips: null,

  grossPayTitle: i18n.t('payslips.totalPay'),

  netPayTitle: i18n.t('payslips.takeHome'),

  xCategories: function () {
    return this.get('payslips').getEach('formattedProcessingDate').toArray();
  }.property('payslips'),

  grossPaySeries: function () {
    return this.get('payslips').getEach('grossPay').toArray();
  }.property('payslips'),

  netPaySeries: function () {
    return this.get('payslips').getEach('netPay').toArray();
  }.property('payslips'),

  labelFormatter: function () {
    return `£${this.value}`.htmlSafe();
  },

  tooltipFormatter: function () {
    var title = this.x;
    var seriesMarkup;

    seriesMarkup = this.points.map(item => {
      var name = item.series.name;
      var pay = parseFloat(item.y).toFixed(2);

      return `${name}:£${pay}`;
    }).join('<br />');

    return `<strong>${title}</strong><br />${seriesMarkup}`.htmlSafe();
  },

  didInsertElement: function() {
    var propNames = [ 'xCategories', 'grossPaySeries', 'netPaySeries', 'grossPayTitle', 'netPayTitle' ];
    var props = this.getProperties(propNames);

    this.$().highcharts({
      title: null,
      chart: {
        type: 'spline',
        marginLeft: 0,
        marginRight: 0
      },
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
          formatter: this.labelFormatter
        }
      },
      tooltip: {
        formatter: this.tooltipFormatter,
        shared: true
      },
      series: [{
        marker: {
          symbol: 'circle'
        },
        name: props.grossPayTitle,
        color: '#CCC',
        data: props.grossPaySeries
      }, {
        marker: {
          symbol: 'circle'
        },
        name: props.netPayTitle,
        color: '#9cbf2b',
        data: props.netPaySeries
      }]
    });
  }
});
