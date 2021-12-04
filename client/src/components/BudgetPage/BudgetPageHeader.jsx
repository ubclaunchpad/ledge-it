import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import StyledSelect from '../StyledSelect';
import StyledButton from '../StyledButton';
import Modal from '../CustomModal';
import appTheme from '../../../theme';

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
          <View style={styles.dropDownContainer}>
            <StyledButton
              customStyles={sortModalVisible ? dropDownOpenStyles : dropDownClosedStyles}
              label="Sort"
              onTap={setSortModalVisible}
              icon={sortModalVisible ? 'chevron-up' : 'chevron-down'}
            />
          </View>
          <Modal isModalVisible={sortModalVisible} setModalVisible={setSortModalVisible}>
            <View>
              <StyledButton
                onTap={() => {
                  sortBudgets('old->new');
                }}
                customStyles={btnCustomStyles}
                label="Sort by date (old to new)"
              />
              <StyledButton
                onTap={() => {
                  sortBudgets('new->old');
                }}
                customStyles={btnCustomStyles}
                label="Sort by date (new to old)"
              />
              <StyledButton
                onTap={() => {
                  sortBudgets('high->low');
                }}
                customStyles={btnCustomStyles}
                label="Sort by amount (high to low)"
              />
              <StyledButton
                onTap={() => {
                  sortBudgets('low->high');
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headText: {
    color: appTheme.colors.primary,
    fontWeight: 'bold',
    fontSize: 50,
  },

  buttons: {
    flex: -1,
    marginLeft: -7,
    marginRight: -7,
    width: Dimensions.get('window').width - 10,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

const dropDownClosedStyles = StyleSheet.create({
  background: {
    borderColor: appTheme.colors.primaryDark,
    backgroundColor: appTheme.colors.primary,
    borderWidth: 4,
    padding: 10,
    paddingVertical: 5,
    borderRadius: 20,
    height: 40,
    width: 90,
    margin: 5,
    flexDirection: 'row',
  },

  text: {
    color: appTheme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const dropDownOpenStyles = StyleSheet.create({
  background: {
    borderColor: appTheme.colors.primaryDark,
    backgroundColor: appTheme.colors.white,
    borderWidth: 4,
    padding: 10,
    paddingVertical: 5,
    borderRadius: 20,
    height: 40,
    width: 90,
    margin: 5,
    flexDirection: 'row',
  },

  text: {
    color: appTheme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const btnCustomStyles = StyleSheet.create({
  background: {
    color: appTheme.colors.white,
    borderColor: appTheme.colors.primary,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: 40,
    margin: 5,
  },

  text: {
    color: appTheme.colors.primary,
  },
});

export default BudgetHeader;
