import React from "react";
import { StyleSheet } from "react-native";
import StyledButton from "../StyledButton";
import theme from "../../../theme";

export default BackArrow = ({ onPress }) => {
  return (
    <StyledButton
      iconName='chevron-with-circle-left'
      iconColor={theme.colors.primary}
      iconSize={50}
      customStyles={styles}
      onTap={onPress}
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
});