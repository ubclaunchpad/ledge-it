import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FontAwesome5 } from '@expo/vector-icons';
import SortMenu from './SortMenu';
import { theme } from '../../../theme';

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
      categories.forEach((category) => {
        copyOfSelectedLookup[category] = true;
      });
      return { ...copyOfSelectedLookup };
    });
  }, [categories, setAllButton, setSelectedCategories]);

  const allButtonPressLogic = () => {
    if (allButton) {
      setSelectedCategories(() => {
        const temp = {};
        categories.forEach((category) => {
          temp[category] = false;
        });
        return { ...temp };
      });
      setAllButton(false);
    } else {
      setSelectedCategories(() => {
        const temp = {};
        categories.forEach((category) => {
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
    setAllButton(categories.every((item) => selectedCategories[item]));
  };

  const emptyIcon = () => null;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => onToggleSwitch()}
          activeOpacity={0.8}>
          <Text style={styles.toggleButtonText}>{type}</Text>
          <FontAwesomeIcon icon={faChevronRight} color={theme.colors.white} size={24} />
        </TouchableOpacity>
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
              { backgroundColor: allButton ? theme.colors.primary : theme.colors.primaryLight },
            ]}
            icon={emptyIcon}
            selected={allButton}
            onPress={allButtonPressLogic}>
            <Text style={styles.text}>All</Text>
          </Chip>
          {categories.map((category) => (
            <Chip
              style={[
                styles.chip,
                {
                  backgroundColor: selectedCategories[category]
                    ? theme.colors.primary
                    : theme.colors.primaryLight,
                },
              ]}
              icon={emptyIcon}
              key={category}
              selected={selectedCategories[category]}
              onPress={() => categoryButtonPressLogic(category)}>
              <Text style={styles.text}>{category}</Text>
            </Chip>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.primaryDark,
  },
  toggleButton: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  toggleButtonText: {
    paddingVertical: 10,
    marginRight: 10,
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  m10: {
    margin: 10,
  },
  container: {
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chip: {
    marginHorizontal: 5,
    paddingRight: 5,
  },
  chipContainer: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  text: {
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  searchBar: {
    shadowOpacity: 0.1,
    width: Dimensions.get('window').width - 150,
    height: 38,
    marginRight: 10,
    borderRadius: 15,
  },
  searchIcon: {
    marginRight: 20,
    color: theme.colors.primary,
    marginTop: 5,
  },
});

export default TablePageHeader;
