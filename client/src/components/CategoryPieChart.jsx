import React, { Component } from 'react';

import { VictoryPie } from 'victory-native';

const CategoryPieChart = () => {
  return <VictoryPie innerRadius={100} data={sampleData} />;
};

const sampleData = [
  { x: 'A', y: 40 },
  { x: 'B', y: 35 },
  { x: 'C', y: 25 },
  { x: 'D', y: 30 },
];

export default CategoryPieChart;
