import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import StyledButton from '../StyledButton';
import theme from '../../../theme';

const GraphFooter = ({
  viewing,
  setViewing,
  categories,
  selectedCategories,
  setSelectedCategories,
  allSelected,
  setAllSelected,
}) => {
  useEffect(() => {
    setSelectedCategories(categories);
  }, [viewing, categories, setSelectedCategories]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <StyledButton
          customStyles={viewing === 'Expenses' ? buttonSelectedStyle : buttonUnselectedStyle}
          label="Expenses"
          onTap={() => {
            if (viewing !== 'Expenses') {
              setViewing('Expenses');
              setSelectedCategories([]);
              setAllSelected(true);
            }
          }}
        />
        <StyledButton
          customStyles={viewing === 'Income' ? buttonSelectedStyle : buttonUnselectedStyle}
          label="Income"
          onTap={() => {
            if (viewing !== 'Income') {
              setViewing('Income');
              setSelectedCategories([]);
              setAllSelected(true);
            }
          }}
        />
      </View>
      <View style={styles.categorySelectionArea}>
        <StyledButton
          key="all"
          label="All"
          customStyles={allSelected ? buttonSelectedStyle : buttonUnselectedStyle}
          onTap={() => {
            if (allSelected) {
              setSelectedCategories([]);
              setAllSelected(false);
            } else {
              setSelectedCategories(categories);
              setAllSelected(true);
            }
          }}
        />
        {Array.isArray(categories) &&
          categories.map((categoryName) => {
            const categoryIsSelected = Array.isArray(selectedCategories)
              ? selectedCategories.includes(categoryName)
              : false;
            const btnStyle = categoryIsSelected ? buttonSelectedStyle : buttonUnselectedStyle;
            return (
              <StyledButton
                key={categoryName}
                label={categoryName}
                customStyles={btnStyle}
                onTap={() => {
                  if (allSelected) {
                    setAllSelected(false);
                  }
                  if (categoryIsSelected) {
                    setSelectedCategories(selectedCategories.filter((c) => c !== categoryName));
                  } else {
                    setSelectedCategories(
                      selectedCategories.concat(categoryName),
                      selectedCategories.length === categories.length - 1
                        ? setAllSelected(true)
                        : null,
                    );
                  }
                }}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    alignSelf: 'flex-end',
    width: Dimensions.get('window').width,
  },

  topRow: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categorySelectionArea: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
  },
});

const buttonSelectedStyle = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    display: 'flex',
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  text: {
    color: theme.colors.textLight,
    fontWeight: 'bold',
  },
  highlightStyle: {},
});

const buttonUnselectedStyle = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.white,
    padding: 10,
    display: 'flex',
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  text: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  highlightStyle: {},
});

export default GraphFooter;
