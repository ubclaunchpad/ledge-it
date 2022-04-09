import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import theme from '../../../theme';
import StyledButton from '../StyledButton';
import ChangeCategoryColors from './ChangeCategoryColors';
import DeleteCategories from './DeleteCategories';
import AddCategories from './AddCategories';

const CategoriesSetting = ({ state, setState }) => {
  const [isChangeColorsOpen, setIsChangeColorsOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={state.isCategoriesModalOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}
      onRequestClose={() => {
        setState({ isCategoriesModalOpen: false });
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <StyledButton
            customStyles={{
              pressable: {
                position: 'absolute',
                left: 5,
                top: -10,
              },
              background: {
                padding: 20,
              },
            }}
            onTap={() => setState({ isCategoryModalOpen: false })}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Categories</Text>
        </View>
        <ScrollView style={styles.content}>
          <Pressable onPress={() => setIsChangeColorsOpen(true)}>
            <View style={styles.setSettingOptions}>
              <Text style={styles.optionText}>Change Colors Open</Text>
              <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />
            </View>
          </Pressable>
          <Pressable onPress={() => setIsDeleteCategoryOpen(true)}>
            <View style={styles.setSettingOptions}>
              <Text style={styles.optionText}>Delete Categories</Text>
              <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />
            </View>
          </Pressable>
          <Pressable onPress={() => setIsAddCategoryOpen(true)}>
            <View style={styles.setSettingOptionsBottom}>
              <Text style={styles.optionText}>Add Categories</Text>
              <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />
            </View>
          </Pressable>
          {isChangeColorsOpen && (
            <ChangeCategoryColors
              isChangeColorsOpen={isChangeColorsOpen}
              setIsChangeColorsOpen={setIsChangeColorsOpen}
            />
          )}
          {isDeleteCategoryOpen && (
            <DeleteCategories
              isDeleteCategoryOpen={isDeleteCategoryOpen}
              setIsDeleteCategoryOpen={setIsDeleteCategoryOpen}
            />
          )}
          {isAddCategoryOpen && (
            <AddCategories
              isAddCategoryOpen={isAddCategoryOpen}
              setIsAddCategoryOpen={setIsAddCategoryOpen}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  content: {
    display: 'flex',
    marginTop: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  setSettingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  setSettingOptionsBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: theme.colors.primary,
  },
});

export default CategoriesSetting;
