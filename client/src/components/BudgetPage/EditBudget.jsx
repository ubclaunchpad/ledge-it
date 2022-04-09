import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import theme from '../../../theme';
import axios from '../../providers/axios';
import EditModal from './EditModal';
import { MONTHS } from '../../utils/constants';

export default function EditBudget({ month, year, setShowTable, setShowEdit }) {
  const [categoryData, setCategoryData] = useState([]);
  const [totalBudgetAmount, setTotalBudgetAmount] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const updateCategories = async () => {
      const budgetResponse = await axios.get(`${process.env.SERVER_URL}/budget/category/all`, {
        params: { month, year },
      });
      const { data } = budgetResponse;
      const colorResponse = await axios.get(`${process.env.SERVER_URL}/expense_categories`);
      const lookup = colorResponse.data.map((obj) => ({ name: obj.name, color: obj.color }));
      const categoriesWithColor = data.map((obj) => ({
        ...obj,
        color: lookup.filter((category) => category.name === obj.category)[0].color,
      }));
      setCategoryData(categoriesWithColor);
      const budgetAmountResponse = await axios.get(`${process.env.SERVER_URL}/budget`, {
        params: { month, year },
      });
      setTotalBudgetAmount(budgetAmountResponse.data.value);
    };

    updateCategories();
  }, [editModal, month, year]);

  return (
    <SafeAreaView>
      <ScrollView style={{ margin: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setShowEdit(false);
              setShowTable(true);
            }}
          >
            <Ionicons name="arrow-back-outline" color={theme.colors.primaryDark} size={35} />
          </Pressable>
          <Text style={styles.titleText}>{MONTHS[month - 1]} Budget</Text>
        </View>
        <View style={styles.customRow}>
          <Text style={styles.categoryText}>Total Budget</Text>
          <Feather
            name="edit"
            size={24}
            color="black"
            onPress={() => {
              setSelectedCategory('total');
              setEditModal(true);
            }}
          />
        </View>
        <View style={[styles.customRow, { marginBottom: 50 }]}>
          <ProgressBar
            progress={0.7}
            color={theme.colors.primary}
            style={[styles.pbar, { height: 20 }]}
          />
          <Text style={styles.amountText}>${totalBudgetAmount}</Text>
        </View>
        {categoryData.map(({ category, value, color }) => {
          return (
            <View key={category} style={{ marginVertical: 15 }}>
              <View style={styles.customRow}>
                <Text style={styles.categoryText}>{category}</Text>
                <Feather
                  name="edit"
                  size={24}
                  color="black"
                  onPress={() => {
                    setSelectedCategory(category);
                    setEditModal(true);
                  }}
                />
              </View>
              <View style={styles.customRow}>
                <ProgressBar progress={0.7} color={color} style={styles.pbar} />
                <Text style={styles.amountText}>${value}</Text>
              </View>
            </View>
          );
        })}
        {editModal && (
          <EditModal
            editModal={editModal}
            setEditModal={setEditModal}
            month={month}
            year={year}
            category={selectedCategory}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryText: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pbar: {
    height: 15,
    borderRadius: 5,
    marginRight: 15,
    width: Dimensions.get('window').width * 0.65,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
});
