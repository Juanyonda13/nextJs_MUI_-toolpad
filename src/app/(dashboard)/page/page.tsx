'use client'
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface SeriesData {
  name: string;
  data: number[];
}

const Dashboard: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      stacked: true,
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
        },
      },
    },
    colors: ['#f46a6a', '#66d9ef', '#ff6384', '#e83e8c', '#9e4491'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yaxis: {
      title: {
        text: 'Valor',
      },
    },
    tooltip: {
      theme: 'dark',
      followCursor: true,
      intersect: false,
      shared: true,
      yPadding: 10,
      xPadding: 10,
      marker: {
        show: true,
        size: 4,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  const series1: SeriesData[] = [
    { name: 'Ventas', data: [45, 52, 38, 42, 33] },
    { name: 'Rentabilidad', data: [35, 41, 55, 51, 32] },
    { name: 'Margen', data: [25, 31, 47, 39, 36] },
  ];

  const series2: SeriesData[] = [
    { name: 'Usuarios activos', data: [15, 18, 12, 20, 17] },
    { name: 'Sesiones', data: [25, 32, 35, 30, 28] },
    { name: 'Transacciones', data: [10, 22, 28, 29, 26] },
  ];

  const series3: SeriesData[] = [
    { name: 'Enero', data: [100, 120, 110, 130, 105] },
    { name: 'Febrero', data: [90, 115, 125, 140, 108] },
    { name: 'Marzo', data: [95, 118, 128, 145, 112] },
  ];

  return (
    <div className="dashboard-container">
      {/* Sección 1: Ventas y Rentabilidad */}
      <div className="section">
        <ReactApexChart options={options} series={series1} type="bar" height={350} />
        <p>Esta sección muestra las ventas y la rentabilidad mensual.</p>
      </div>


      {/* Sección 4: Gráfico de Línea */}
      <div className="section">
        <h2>Gráfico de Línea</h2>
        <ReactApexChart
          options={{
            chart: { ...options.chart, type: 'line' },
            stroke: { curve: 'smooth' },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
            tooltip: { theme: 'dark' },
          }}
          series={[
            { name: 'Ventas', data: [45, 52, 38, 42, 33] },
            { name: 'Rentabilidad', data: [35, 41, 55, 51, 32] },
          ]}
          type="line"
          height={350}
        />
        <p>Este gráfico muestra una línea de tendencia para las ventas y la rentabilidad.</p>
      </div>

      {/* Sección 5: Radar Chart */}
      <div className="section">
        <h2>Radar Chart</h2>
        <ReactApexChart
          options={{
            chart: { ...options.chart, type: 'radar' },
            stroke: { curve: 'smooth' },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
            tooltip: { theme: 'dark' },
          }}
          series={[
            { name: 'Ventas', data: [45, 52, 38, 42, 33] },
            { name: 'Rentabilidad', data: [35, 41, 55, 51, 32] },
            { name: 'Margen', data: [25, 31, 47, 39, 36] },
          ]}
          type="radar"
          height={350}
        />
        <p>Este gráfico radar compara múltiples métricas en un solo diagrama.</p>
      </div>
    </div>
  );
};

export default Dashboard;
