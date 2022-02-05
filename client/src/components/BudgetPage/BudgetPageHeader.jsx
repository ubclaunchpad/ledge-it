import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import StyledSelect from '../StyledSelect';
import StyledButton from '../StyledButton';
import Modal from '../CustomModal';
import appTheme from '../../../theme';
import { METHODS } from '../../utils/sorts';

const years = [
  { label: '2021', value: 2021 },
  { label: '2020', value: 2020 },
  { label: '2019', value: 2019 },
];

const BudgetHeader = ({ year, setYear, sortFunction }) => {
  const [yearDropdownVisible, setYearDropdownVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const sortBudgets = (sortCriteria) => {
    sortFunction(sortCriteria);
    setSortModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headBox}>
          <Text style={styles.headText}>Your Budgets</Text>
        </View>
        <View style={styles.buttons}>
          <View>
            <StyledSelect
              options={years}
              selected={year}
              setSelected={setYear}
              dropdownVisible={yearDropdownVisible}
              setDropdownVisible={setYearDropdownVisible}
              type="box"
              placeholder="2021"
            />
          </View>
          {/* TODO: refactor to use generic SortMenu component */}
          <View>
            <StyledButton
              customStyles={dropDownStyles}
              label="Sort"
              onTap={() => setSortModalVisible(true)}
              icon={sortModalVisible ? 'chevron-up' : 'chevron-down'}
            />
          </View>
          <Modal isModalVisible={sortModalVisible} setModalVisible={setSortModalVisible}>
            <View>
              <StyledButton
                onTap={() => {
                  sortBudgets(METHODS.OLD_TO_NEW);
                }}
                customStyles={btnCustomStyles}
                label="Sort by date (old to new)"
              />
              <StyledButton
                onTap={() => {
                  sortBudgets(METHODS.NEW_TO_OLD);
                }}
                customStyles={btnCustomStyles}
                label="Sort by date (new to old)"
              />
              <StyledButton
                onTap={() => {
                  sortBudgets(METHODS.HIGH_TO_LOW);
                }}
                customStyles={btnCustomStyles}
                label="Sort by amount (high to low)"
              />
              <StyledButton
                onTap={() => {
                  sortBudgets(METHODS.LOW_TO_HIGH);
                }}
                customStyles={btnCustomStyles}
                label="Sort by amount (low to high)"
              />
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  content: {
    width: Dimensions.get('window').width - 30,
    marginTop: 40,
    marginBottom: 2,
  },

  headBox: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: appTheme.colors.primaryDark,
    paddingHorizontal: 3,
    paddingVertical: 7,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headText: {
    color: appTheme.colors.primary,
    fontWeight: 'bold',
    fontSize: 38,
  },

  buttons: {
    flex: -1,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const dropDownStyles = StyleSheet.create({
  background: {
    backgroundColor: appTheme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    height: 40,
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: appTheme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const btnCustomStyles = StyleSheet.create({
  background: {
    color: appTheme.colors.white,
    borderColor: appTheme.colors.primary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: 40,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: appTheme.colors.primary,
  },
});

export default BudgetHeader;
