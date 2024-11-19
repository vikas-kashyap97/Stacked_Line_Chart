import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const App = () => {
  const rawData = [
    { Year: 2000, "Total Population": 1058, "Growth Rate (%)": 255.96, "Density (/km²)": 356, "Urban (%)": 27.7, "Fertility Rate": 165.3, "Sex Ratio": 673, "0-65 Years": 525, "15-64 Years": 62, "65+ Years": 5 },
    { Year: 2005, "Total Population": 772, "Growth Rate (%)": 400.86, "Density (/km²)": 698.8, "Urban (%)": 124.43, "Fertility Rate": 200.8, "Sex Ratio": 1233, "0-65 Years": 890.74, "15-64 Years": 65, "65+ Years": 5 },
    { Year: 2010, "Total Population": 1098, "Growth Rate (%)": 705.85, "Density (/km²)": 418, "Urban (%)": 248.94, "Fertility Rate": 552.6, "Sex Ratio": 905, "0-65 Years": 807.35, "15-64 Years": 67, "65+ Years": 5 },
    { Year: 2015, "Total Population": 1118, "Growth Rate (%)": 800.82, "Density (/km²)": 447, "Urban (%)": 350.83, "Fertility Rate": 657.3, "Sex Ratio": 948, "0-65 Years": 612.96, "15-64 Years": 67, "65+ Years": 6 },
    { Year: 2020, "Total Population": 1234, "Growth Rate (%)": 650.52, "Density (/km²)": 472, "Urban (%)": 223.4, "Fertility Rate": 1150.2, "Sex Ratio": 900, "0-65 Years": 797.23, "15-64 Years": 67, "65+ Years": 7 },
    { Year: 2024, "Total Population": 1463, "Growth Rate (%)": 1300.86, "Density (/km²)": 638.52, "Urban (%)": 788.3, "Fertility Rate": 200.0, "Sex Ratio": 948, "0-65 Years": 1110.89, "15-64 Years": 68, "65+ Years": 7 }
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Chart initialization
    const myChart = echarts.init(document.getElementById('mainChart'));

    const seriesList = [
      {
        type: 'line',
        data: rawData.map(item => item["Total Population"]),
        name: 'Total Population',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value}M` 
        },
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        data: rawData.map(item => item["Growth Rate (%)"]),
        name: 'Growth Rate (%)',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value}%` 
        },
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        data: rawData.map(item => item["Density (/km²)"]),
        name: 'Population Density (/km²)',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value} people/km²` 
        },
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        data: rawData.map(item => item["Urban (%)"]),
        name: 'Urban (%)',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value}% Urban` 
        },
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        data: rawData.map(item => item["Fertility Rate"]),
        name: 'Fertility Rate',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value} births/woman` 
        },
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        data: rawData.map(item => item["Sex Ratio"]),
        name: 'Sex Ratio (Females per 1000 Males)',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value} Females/1000 Males` 
        },
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        data: rawData.map(item => item["0-65 Years"]),
        name: 'Age Structure (0-65 Years)',
        label: { 
          show: !isSmallScreen, 
          formatter: params => `${params.value}% 0-65 Years` 
        },
        emphasis: { focus: 'series' },
      }
    ];

    const option = {
      title: { 
        text: 'Population and Demographic Data Overview', 
        left: 'center', 
        top: '10px',
        textStyle: {
          fontSize: isSmallScreen ? 14 : 18
        }
      },
      tooltip: { 
        trigger: 'axis', 
        axisPointer: { type: 'cross' },
        confine: true 
      },
      legend: { 
        data: seriesList.map(s => s.name), 
        top: '50px',
        type: isSmallScreen ? 'scroll' : 'plain',
        width: isSmallScreen ? '90%' : 'auto'
      },
      grid: {
        top: isSmallScreen ? '120px' : '100px',
        left: isSmallScreen ? '5%' : '10%',
        right: isSmallScreen ? '5%' : '10%',
        bottom: isSmallScreen ? '50px' : '60px'
      },
      xAxis: { 
        type: 'category', 
        name: 'Year', 
        data: rawData.map(item => item.Year),
        nameTextStyle: {
          fontSize: isSmallScreen ? 10 : 12
        }
      },
      yAxis: { 
        type: 'value', 
        name: 'Value',
        nameTextStyle: {
          fontSize: isSmallScreen ? 10 : 12
        }
      },
      series: seriesList
    };

    myChart.setOption(option);

    const resizeChart = () => myChart.resize();
    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      window.removeEventListener('resize', checkScreenSize);
      myChart.dispose();
    };
  }, [isSmallScreen]);

  return (
    <div style={{ 
      width: '100%', 
      padding: '0 10px', 
      boxSizing: 'border-box' 
    }}>
      <div 
        id="mainChart" 
        style={{ 
          width: '100%', 
          height: isSmallScreen ? '60vh' : '80vh', 
          minHeight: '300px' 
        }}
      ></div>
      <ResponsiveTable data={rawData} />
    </div>
  );
};

const ResponsiveTable = ({ data }) => {
  return (
    <div style={{ 
      width: '100%', 
      overflowX: 'auto', 
      padding: '10px 0' 
    }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        fontSize: '14px' 
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            {Object.keys(data[0]).map((key, index) => (
              <th key={index} style={{ 
                padding: '10px', 
                border: '1px solid #ddd', 
                whiteSpace: 'nowrap' 
              }}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ 
              borderBottom: '1px solid #ddd' 
            }}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex} style={{ 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  textAlign: 'center',
                  whiteSpace: 'nowrap' 
                }}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;