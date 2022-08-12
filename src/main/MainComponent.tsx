import React, {RefObject} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {RewardPoint} from '../rewardPoint/RewardPointContainer';

const width = Dimensions.get('window').width;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type MainComponentProps = {
  reward: number;
  headerRef: RefObject<TextInput>;
  footerRef: RefObject<TextInput>;
  headerTextStyle: TextStyle;
  onVotePress: () => void;
  animationInProgress: boolean;
  setAnimationInProgress: (animationInProgress: boolean) => void;
};

export const MainComponent = ({
  reward,
  headerRef,
  footerRef,
  headerTextStyle,
  onVotePress,
  setAnimationInProgress,
  animationInProgress,
}: MainComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerPoe} />
        <View style={styles.headerTextContainer}>
          <AnimatedTextInput
            style={headerTextStyle}
            ref={headerRef}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.rewardsContainer}>
          {[...new Array(reward > 10 ? 10 : reward)].map((v, i) => (
            <RewardPoint
              key={i}
              index={i}
              animationInProgress={animationInProgress}
              setAnimationInProgress={setAnimationInProgress}
              isLast={i === (reward > 10 ? 10 : reward) - 1}
            />
          ))}
          <View style={styles.footerPoe} />
          <View style={styles.footerPoints}>
            <TextInput style={styles.white} ref={footerRef} editable={false} />
          </View>
        </View>
        <TouchableOpacity
          onPress={onVotePress}
          style={styles.button}
          disabled={animationInProgress}>
          <Text style={styles.buttonText}>Vote</Text>
        </TouchableOpacity>
      </View>
      <View />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  white: {
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#393965',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerPoe: {
    height: 20,
    width: 20,
    marginRight: 10,
    backgroundColor: '#d3d31f',
    borderRadius: 10,
  },
  headerTextContainer: {
    height: 20,
    width: 40,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rewardsContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    backgroundColor: '#393965',
    alignSelf: 'flex-start',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    width: width - 20,
    backgroundColor: '#393965',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 23,
  },
  footerPoe: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#d3d31f',
  },
  footerPoints: {
    marginLeft: 10,
    alignItems: 'center',
  },
});
