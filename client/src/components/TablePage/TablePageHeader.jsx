import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Searchbar, Chip } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import SortMenu from './SortMenu';
import theme from '../../../theme';

const TablePageHeader = ({
  categories,
  searchQuery,
  setSearchQuery,
  type,
  setType,
  allButton,
  setAllButton,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);
  const onToggleSwitch = () => setType(type === 'Expenses' ? 'Income' : 'Expenses');

  useEffect(() => {
    setAllButton(true);
    setSelectedCategories((sl) => {
      const copyOfSelectedLookup = sl;
      Array.from(categories.keys()).forEach((category) => {
        copyOfSelectedLookup[category] = true;
      });
      return { ...copyOfSelectedLookup };
    });
  }, [categories, setAllButton, setSelectedCategories]);

  const allButtonPressLogic = () => {
    if (allButton) {
      setSelectedCategories(() => {
        const temp = {};
        Array.from(categories.keys()).forEach((category) => {
          temp[category] = false;
        });
        return { ...temp };
      });
      setAllButton(false);
    } else {
      setSelectedCategories(() => {
        const temp = {};
        Array.from(categories.keys()).forEach((category) => {
          temp[category] = true;
        });
        return { ...temp };
      });
      setAllButton(true);
    }
  };

  const categoryButtonPressLogic = (category) => {
    setSelectedCategories((s) => {
      const copyOfS = s;
      copyOfS[category] = !copyOfS[category];
      return { ...copyOfS };
    });
    setAllButton(Array.from(categories.keys()).every((item) => selectedCategories[item]));
  };

  const emptyIcon = () => null;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.typeContainer}>
        <SwitchSelector
          initial={0}
          onPress={() => onToggleSwitch()}
          textColor={theme.colors.primary}
          selectedColor={theme.colors.white}
          buttonColor={theme.colors.primary}
          borderColor={theme.colors.primary}
          fontSize={30}
          textStyle={{ fontWeight: '600' }}
          selectedTextStyle={{ fontWeight: '600' }}
          height={50}
          options={[
            { label: 'Expense', value: 'expenses' },
            { label: 'Income', value: 'income' },
          ]}
        />
      </View>
      <View style={styles.container}>
        <SortMenu />
        {searchBarVisible && (
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        )}
        <FontAwesome5
          name="search"
          size={24}
          style={styles.searchIcon}
          onPress={() => setSearchBarVisible(!searchBarVisible)}
        />
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.chipContainer}>
          <Chip
            style={[
              styles.chip,
              {
                backgroundColor: allButton ? theme.colors.primary : theme.colors.white,
                borderColor: theme.colors.white,
              },
            ]}
            icon={emptyIcon}
            selected={allButton}
            onPress={allButtonPressLogic}>
            <Text
              style={[
                styles.text,
                { color: allButton ? theme.colors.white : theme.colors.primary },
              ]}>
              All
            </Text>
          </Chip>
          {Array.from(categories.entries()).map((category) => (
            <Chip
              style={[
                styles.chip,
                {
                  backgroundColor: selectedCategories[category[0]]
                    ? category[1]
                    : theme.colors.white,
                },
              ]}
              icon={emptyIcon}
              key={category[0]}
              selected={selectedCategories[category[0]]}
              onPress={() => categoryButtonPressLogic(category[0])}>
              <Text
                style={[
                  {
                    color: selectedCategories[category[0]] ? theme.colors.white : category[1],
                  },
                ]}>
                {category[0]}
              </Text>
            </Chip>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.primary,
  },
  typeContainer: {
    marginTop: 40,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    marginTop: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chip: {
    marginHorizontal: 5,
    paddingRight: 5,
  },
  chipContainer: {
    paddingBottom: 15,
  },
  searchBar: {
    shadowOpacity: 0.1,
    width: Dimensions.get('window').width - 65,
    height: 40,
    marginRight: 10,
    borderRadius: 15,
  },
  searchIcon: {
    marginRight: 20,
    color: theme.colors.white,
    marginTop: 5,
  },
});

export default TablePageHeader;
