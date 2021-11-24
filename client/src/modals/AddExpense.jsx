import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';

const postExpenseEndpoint = '';

const AddExpense = ({ setModalVisible }) => {
  const currency = 'CAD';
  const [amount, setAmount] = useState(undefined);
  const [merchant, setMerchant] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const categories = [
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Housing', value: 'Housing' },
    { label: 'Restaurants', value: 'Restaurants' },
  ];
  const [tag, setTag] = useState(undefined);
  const [description, setDesc] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  const submitExpense = async () => {
    fetch(`${postExpenseEndpoint}/expense/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: merchant,
        description,
        date: date.replace('.', '-').replace('.', '-'),
        price: amount,
        currency,
        exchange_rate: 0,
        location,
        category,
        sub_category: tag,
      }),
    })
      .then((res) => {
        if (Math.floor(res.status / 100) === 2) {
          {
            setBanner({ bannerVisible: true, bannerColor: 'green', bannerMessage: 'Done!' });
          }
        } else {
          {
            setBanner({
              bannerVisible: true,
              bannerColor: 'red',
              bannerMessage: 'Try entering the text fields.',
            });
          }
        }
      })
      .catch((err) => {
        setBanner({
          bannerVisible: true,
          bannerColor: 'red',
          bannerMessage: 'There was a server error.',
        });
      });
  };
  const [{ bannerVisible, bannerColor, bannerMessage }, setBanner] = useState({
    bannerVisible: false,
    bannerColor: null,
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropTransitionOutTiming={0}
        isVisible={bannerVisible}
        onBackdropPress={() => setBanner({ bannerVisible: false })}
        onRequestClose={() => {
          setBanner({ bannerVisible: !bannerVisible });
        }}
        style={styles.modal}>
        <View style={[styles.container, { backgroundColor: bannerColor }]}>
          <ScrollView>
            <View style={styles.content}>
              <Text style={styles.modalText}>{bannerMessage}</Text>
              <PaperButton
                icon="check"
                color="#24838F"
                mode="contained"
                style={styles.paperButton}
                onPress={() => {
                  setBanner({ bannerVisible: false });
                }}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
      <AmountBox
        boxWidth={110}
        textMargin={10}
        fields={[
          amount || 0.0,
          merchant || '',
          date,
          category || 'Select a Category',
          tag,
          description,
          location,
        ]}
      />
      <StyledTextInput
        onChange={setAmount}
        keyboardType="numeric"
        label="Amount"
        placeholder="$$$"
      />
      <StyledTextInput
        onChange={setMerchant}
        keyboardType="default"
        label="Merchant"
        placeholder="McDonalds"
      />
      <StyledTextInput
        onChange={setDate}
        keyboardType="numeric"
        label="Date"
        placeholder="MM/DD/YY"
      />
      <DropDownPicker
        style={styles.categorySelect}
        open={categoryDropdownVisible}
        value={category}
        items={categories}
        setOpen={setCategoryDropdownVisible}
        setValue={setCategory}
      />
      <StyledTextInput
        onChange={setTag}
        keyboardType="default"
        label="Tag"
        placeholder="optional..."
      />
      <StyledTextInput
        onChange={setDesc}
        keyboardType="default"
        label="Description"
        placeholder="optional..."
      />
      <StyledTextInput
        onChange={setLocation}
        keyboardType="default"
        label="Location"
        placeholder="optional..."
      />
      <StyledButton label="done" onTap={submitExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
    display: 'flex',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    padding: 10,
  },
  categorySelect: {
    width: Dimensions.get('window').width * 0.89,
    height: 40,
    borderColor: '#6D6868',
    color: '#6D6868',
    alignSelf: 'center',
  },
  ck: {
    width: Dimensions.get('screen').width * 2,
    height: Dimensions.get('screen').height,
    zIndex: Number.MAX_VALUE,
    position: 'absolute',
    opacity: 0.25,
    top: -100,
    right: -100,
    backgroundColor: 'green',
  },
  closeButton: {},
  modal: {
    flex: 1,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    height: Dimensions.get('window').height * 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  content: {
    marginLeft: 0,
    marginBottom: 15,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  paperButton: {
    borderRadius: 20,
    width: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  modalText: { alignSelf: 'flex-end', color: 'white', fontSize: 24, margin: 10 },
});

export default AddExpense;
