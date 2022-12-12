import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Pie3D = ({data}) => {
  const chartConfigs = {
    type: 'pie3D',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: { 
      chart: {
        caption: "Languages",
        decimals: 0,
        pieRadius: '45%',
        theme: "fusion"
    },
    // Chart Data - from step 2
    data: data},
  };
  return <ReactFC {...chartConfigs} />;
}

export default Pie3D;
