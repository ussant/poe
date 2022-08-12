import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

type RewardPoint = {
  rewardStyle: ViewStyle;
};

export const RewardPointComponent = ({
  rewardStyle,
}: RewardPoint): JSX.Element => {
  return <Animated.View style={[rewardStyle, styles.reward]} />;
};

const styles = StyleSheet.create({
  reward: {
    backgroundColor: '#d3d31f',
  },
});
