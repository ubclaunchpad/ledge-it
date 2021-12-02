import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import StyledSelect from '../StyledSelect';
import StyledButton from '../StyledButton';
import Modal from '../CustomModal';

const BudgetHeader = ({ year, setYear, sortFunction }) => {
  const years = [
    { label: '2021', value: 2021 },
    { label: '2020', value: 2020 },
    { label: '2019', value: 2019 },
  ];

  const [yearDropdownVisible, setYearDropdownVisible] = useState(false);

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const sortBudgets = (sortCriteria) => {
    sortFunction(sortCriteria);
    setSortModalVisible(false);
  };

  return (
    <>
      <View>
        <View>
          <Text style={styles.box}>Your Budgets</Text>
        </View>
      </View>
      <View style={styles.selects}>
        <StyledSelect
          options={years}
          selected={year}
          setSelected={setYear}
          dropdownVisible={yearDropdownVisible}
          setDropdownVisible={setYearDropdownVisible}
          type="box"
          placeholder="2021"
        />
        <StyledButton
          customStyles={btnCustomStyles}
          label="Sort"
          onTap={setSortModalVisible}
          icon={sortModalVisible ? 'chevron-up' : 'chevron-down'}
        />
        <Modal isModalVisible={sortModalVisible} setModalVisible={setSortModalVisible}>
          <View style={styles.sortButtons}>
            <StyledButton
              onTap={() => {
                sortBudgets('old-new');
              }}
              customStyles={btnCustomStyles}
              label="Sort by date (old to new)"
            />
            <StyledButton
              onTap={() => {
                sortBudgets('new-old');
              }}
              customStyles={btnCustomStyles}
              label="Sort by date (new to old)"
            />
            <StyledButton
              onTap={() => {
                sortBudgets('high-low');
              }}
              customStyles={btnCustomStyles}
              label="Sort by amount (high to low)"
            />
            <StyledButton
              onTap={() => {
                sortBudgets('low-high');
              }}
              customStyles={btnCustomStyles}
              label="Sort by amount (low to high)"
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(36, 131, 143, 1)',
    color: 'rgba(36, 131, 143, 1)',
    padding: 10,
    fontWeight: '400',
    fontSize: 50,
    maxWidth: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    marginTop: 40,
  },
  selects: {
    position: 'relative',
    zIndex: 1,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 35,
    marginRight: 35,
  },
});

const btnCustomStyles = StyleSheet.create({
  background: {
    color: 'rgba(36, 131, 143, 1)',
    borderColor: '#24838F',
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: 40,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#24838F',
  },
});

export default BudgetHeader;
