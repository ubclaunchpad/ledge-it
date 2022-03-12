import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import GraphFooter from '../components/DataPage/Graph/GraphFooter';

const exampleExpenseCategories = [
  'Food',
  'Housing',
  'Tuition',
  'Misc',
  'Gifts',
  'Technology',
  'Clothing',
  'Transit',
];
const exampleIncomeCategories = ['Work', 'Transfer', 'Gifts'];

const AnalyticsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allSelected, setAllSelected] = useState(true);
  const [viewing, setViewing] = useState('Expenses');

  const showState = () => {
    if (allSelected) {
      return `\n\nAll ${viewing} categories are selected`;
    } else {
      return `\n\n${viewing} categories: ${selectedCategories.join(', ')} are selected`;
    }
  };

  return (
    <SafeAreaView>
      <Text>{showState()}</Text>
      <GraphFooter
        categories={viewing === 'Expenses' ? exampleExpenseCategories : exampleIncomeCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        allSelected={allSelected}
        setAllSelected={setAllSelected}
        viewing={viewing}
        setViewing={setViewing}
      />
    </SafeAreaView>
  );
};

export default AnalyticsPage;
