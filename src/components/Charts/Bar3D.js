import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Bar3D = ({data}) => {
  const chartConfigs = {
    type: 'bar3d',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: { 
      chart: {
        caption: "Most Forked",
        decimals: 0,
        pieRadius: '45%',
        theme: "fusion"
    },
    // Chart Data - from step 2
    data: data},
  };
  return <ReactFC {...chartConfigs} />;
}

export default Bar3D;
