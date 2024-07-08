import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import am5index from "@amcharts/amcharts5/index";
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  private root!: am5.Root;
  icons = [{ name: 'chevron-left' }, { name: 'chevron-right' }];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.browserOnly(() => {
      this.root = am5.Root.new('chartdiv');
    });
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.verticalChart();
      this.pieChart();
      this.pieChart2();
      this.funnelChart();
      this.horizonalChart();
      if (!this.root) return; // Ensure root is initialized
    });
  }

  verticalChart() {
    let sales_ticket_per_owner = [
      {
        user_name: ' Tyagi',
        total_ticket: 90,
      },
      {
        user_name: 'Tinku Sharma',
        total_ticket: 89,
      },
      {
        user_name: 'Vishal Mishra',
        total_ticket: 3,
      },
      {
        user_name: 'Pawna Kumare',
        total_ticket: 19,
      },
      {
        user_name: 'Shivank Tyagi',
        total_ticket: 36,
      },
      {
        user_name: 'Vikash Tiwari',
        total_ticket: 6,
      },
      {
        user_name: 'Garima Tiwari',
        total_ticket: 5,
      },
      {
        user_name: 'Ankit Tyagi',
        total_ticket: 90,
      },
      {
        user_name: 'David Jon',
        total_ticket: 45,
      },
    ];
    // XY Chart
    let chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panY: false,
        // panX: true,

        layout: this.root.verticalLayout,
      })
    );
    this.root._logo?.dispose();

    chart.plotContainer.events.on("wheel", function(ev) {
      if (ev.originalEvent.ctrlKey) {
        ev.originalEvent.preventDefault();
        chart.set("wheelX", "panX");
        chart.set("wheelY", "zoomX");
      }
      else {
        chart.set("wheelX", "none");
        chart.set("wheelY", "none");
      }
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {}),
        visible: false,
      })
    );
    yAxis.get('renderer').grid.template.setAll({ visible: false });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        renderer: am5xy.AxisRendererX.new(this.root, {}),
        categoryField: 'user_name',
      })
    );
    xAxis.get('renderer').grid.template.setAll({ visible: false });

    // xAxis.data.setAll(sales_ticket_per_owner);

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'total_ticket',
        categoryXField: 'user_name',
        fill: am5.color('#00468B'),
      })
    );
    let dataToShow1 = sales_ticket_per_owner.slice(0, 4);
    // series1.data.setAll(sales_ticket_per_owner);
    series1.data.setAll(dataToShow1);
    xAxis.data.setAll(dataToShow1);

    series1.columns.template.setAll({
      width: am5.percent(20),
      strokeOpacity: 0,
    });

    let legend = chart.children.push(am5.Legend.new(this.root, {}));
    legend.data.setAll(chart.series.values);
    let dataToShow = sales_ticket_per_owner.slice(0, 4);
    let add = dataToShow.length;

    function pushAndShiftData() {
      if (add < sales_ticket_per_owner.length) {
        dataToShow.push(sales_ticket_per_owner[add]);
        dataToShow.shift();
        add = add + 1;        
      }
      updateChart();
    }

    function popAndUnshiftData() {
      if (add > dataToShow.length) {
        dataToShow.pop();
        console.log(add - dataToShow.length);
        add = add - 1;
        dataToShow.unshift(sales_ticket_per_owner[add - dataToShow.length - 1]);
       
      }

      updateChart();
    }

    function updateChart() {
      xAxis.data.setAll(dataToShow);
      series1.data.setAll(dataToShow);
      legend.data.setAll(chart.series.values);
    }
    document
      .getElementById('popAndUnshiftButton')
      ?.addEventListener('click', pushAndShiftData);
    document
      .getElementById('pushAndShiftButton')
      ?.addEventListener('click', popAndUnshiftData);
  }

  pieChart() {
    let source_graph = [
      {
        sourceName: 'Direct',
        value: 309,
      },
      {
        sourceName: 'Cross Sales',
        value: 97,
      },
      {
        sourceName: 'Portal Enquiry',
        value: 7,
      },
    ];
    // Via Source Piechart
    let root1 = am5.Root.new('piechartdiv');
    root1.setThemes([am5themes_Animated.new(root1)]);

    let pirchart = root1.container.children.push(
      am5percent.PieChart.new(root1, {
        radius: am5.percent(50),
        innerRadius: am5.percent(75),
      })
    );

    var series = pirchart.series.push(
      am5percent.PieSeries.new(root1, {
        name: 'Series',
        valueField: 'value',
        categoryField: 'sourceName',
        y: am5.percent(6),
      })
    );
    let colors = ['#B8CFEC', '#A5DEF2', '#1E80C1'];
    series.data.setAll(source_graph);
    source_graph.forEach((_dataItem, index) => {

      
      let dataItemAtIndex = series.dataItems[index];
      if (dataItemAtIndex) {
        dataItemAtIndex.set('fill', am5.color(colors[index % colors.length]));
      }
    });
    series.labels.template.set('visible', false);
    series.ticks.template.set('visible', false);

    // Add legend
    let legend1 = pirchart.children.push(
      am5.Legend.new(root1, {
        centerY: am5.percent(50),
        y: am5.percent(20),
        layout: root1.horizontalLayout,
      })
    );
    legend1.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    legend1.data.setAll(series.dataItems);
  }

  pieChart2() {
    let Sales_request_per_variant = [
      {
        name: 'Bronze',
        count: 18,
      },
      {
        name: 'Gold',
        count: 48,
      },
      {
        name: 'Silver',
        count: 94,
      },
      {
        name: 'Best Effort',
        count: 27,
      },
      {
        name: 'Platinum',
        count: 4,
      },
    ];
    // Sales Request Per Variant PicChart
    let root2 = am5.Root.new('piechartdiv2');
    root2.setThemes([am5themes_Animated.new(root2)]);
    root2._logo?.dispose();

    let piechart2 = root2.container.children.push(
      am5percent.PieChart.new(root2, {
        radius: am5.percent(50),
        innerRadius: am5.percent(60),
      })
    );

    var series2 = piechart2.series.push(
      am5percent.PieSeries.new(root2, {
        name: 'Series',
        valueField: 'count',
        categoryField: 'name',
        x: am5.percent(-20),
        y: am5.percent(4),
      })
    );

    let color = ['#B8CFEC', '#A5DEF2', '#1E80C1', '#3F76BF', '#3A9BDC'];

    series2.data.setAll(Sales_request_per_variant);
    Sales_request_per_variant.forEach((_dataItem1, index) => {      
      let dataItemAtIndex1 = series2.dataItems[index];
      if (dataItemAtIndex1) {
        dataItemAtIndex1.set('fill', am5.color(color[index % color.length]));
      }
    });

    let legend2 = piechart2.children.push(
      am5.Legend.new(root2, {
        centerY: am5.percent(50),
        y: am5.percent(60),
        x: am5.percent(60),
        layout: root2.verticalLayout,
      })
    );

    legend2.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    series2.labels.template.set('forceHidden', true);
    series2.ticks.template.set('forceHidden', true);

    legend2.data.setAll(series2.dataItems);
  }
  funnelChart() {
    let sales_funnel = [
      {
        name: 'Lead',
        count: 413,
        percentage: '27%',
      },
      {
        name: 'Opportunity',
        count: 113,
        percentage: '76%',
      },
      {
        name: 'Quotation',
        count: 86,
        percentage: '58%',
      },
      {
        name: 'Order',
        count: 50,
        percentage: '0%',
      },
    ];
    //  Funnel Chart
    var root3 = am5.Root.new('funnelchartdiv');

    root3.setThemes([am5themes_Animated.new(root3)]);
    root3._logo?.dispose();

    var chart3 = root3.container.children.push(
      am5percent.SlicedChart.new(root3, {
        layout: root3.horizontalLayout,
      })
    );

    var series3 = chart3.series.push(
      am5percent.FunnelSeries.new(root3, {
        name: 'Series',
        valueField: 'count',
        categoryField: 'name',
        alignLabels: false,
        legendLabelText: '{percentage}',
        legendValueText: '[ {}][/]',
        orientation: 'vertical',
        x: am5.percent(50),
      })
    );
    series3.labels.template.setAll({
      fontSize: 20,
      text: '{count}',
      visible: true,
    });
    series3.data.setAll(sales_funnel);

    let legend3 = chart3.children.push(
      am5.Legend.new(root3, {
        nameField: 'category',
        centerY: am5.percent(50),
        y: am5.percent(50),
        x: am5.percent(10),
        layout: root3.verticalLayout,
      })
    );
    legend3.data.setAll(series3.dataItems);
    legend3.labels.template.set('paddingBottom', 20);
    let legend32 = chart3.children.push(
      am5.Legend.new(root3, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root3.verticalLayout,
      })
    );
    legend32.data.setAll(series3.dataItems);
    legend32.labels.template.set('paddingBottom', 20);

    legend32.markers.template.setAll({
      height: 0,
      width: 0,
    });
    legend3.markers.template.setAll({
      height: 0,
      width: 0,
    });
  }
  horizonalChart() {
    let certainity = [
      {
        name: 'High',
        value: 32,
      },
      {
        name: 'Moderate',
        value: 47,
      },
      {
        name: 'Low',
        value: 28,
      },
      {
        name: 'Extremly High',
        value: 10,
      },
      {
        name: 'Almost Lost',
        value: 2,
      },
    ];
    //  Horizontal XY Chart
    let root4 = am5.Root.new('horizotalchartdiv');
    root4.setThemes([am5themes_Animated.new(root4)]);
    var chart4 = root4.container.children.push(
      am5xy.XYChart.new(root4, {
        panX: false,
        panY: false,
        x: am5.percent(0),
        layout: root4.verticalLayout,
      })
    );
    root4._logo?.dispose();

    var yRenderer = am5xy.AxisRendererY.new(root4, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set('location', 1);

    var yAxis4 = chart4.yAxes.push(
      am5xy.CategoryAxis.new(root4, {
        categoryField: 'name',
        renderer: yRenderer,
        visible: false,
      })
    );
    yAxis4.get('renderer').grid.template.setAll({ visible: false });

    yAxis4.data.setAll(certainity);

    var xAxis4 = chart4.xAxes.push(
      am5xy.ValueAxis.new(root4, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root4, {
          strokeOpacity: 0.1,
        }),
        visible: false,
      })
    );
    xAxis4.get('renderer').grid.template.setAll({ visible: false });
    yAxis4.setAll({
      background: am5.Rectangle.new(root4, {
        fill: root4.interfaceColors.get('alternativeBackground'),
      }),
    });

    var yseries = chart4.series.push(
      am5xy.ColumnSeries.new(root4, {
        name: 'Certainity',
        xAxis: xAxis4,
        yAxis: yAxis4,
        // y:50,
        valueXField: 'value',
        categoryYField: 'name',
        height: am5.percent(90),
        y: am5.percent(90),
      })
    );

    yseries.columns.template.adapters.add('fill', function (_fill, target) {
      // console.log(fill);
      
      return chart4.get('colors')?.getIndex(yseries.columns.indexOf(target));
    });

    // yseries.columns.template.setAll({
    //  height:20
    // })
    yseries.data.setAll(certainity);

    yseries.bullets.push(function () {
      return am5.Bullet.new(root4, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(root4, {
          centerY: am5.p50,
          text: '{value}',
          populateText: true,
        }),
      });
    });

    let ylegend = chart4.children.push(
      am5.Legend.new(root4, {
        nameField: 'categoryY',
        clickTarget: 'none',
      })
    );

    ylegend.data.setAll(yseries.dataItems);
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
