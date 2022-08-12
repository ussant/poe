import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {MainComponent} from './MainComponent';

const reward = 1000;

let interval: number | null = null;

let rewards = 1000;

let userPoints = 0;

export const MainContainer = () => {
  const headerRef = useRef<TextInput>(null);
  const footerRef = useRef<TextInput>(null);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const headerSize = useSharedValue(16);

  const editText = () => {
    if (rewards > 0) {
      headerRef?.current?.setNativeProps({text: `${userPoints++}`});
      footerRef?.current?.setNativeProps({text: `${rewards--}`});
    }
  };

  useEffect(() => {
    headerRef?.current?.setNativeProps({text: `${userPoints}`});
  }, [headerRef]);

  useEffect(() => {
    footerRef?.current?.setNativeProps({text: `${rewards}`});
  }, [headerRef]);

  const headerTextStyle = useAnimatedStyle(() => {
    return {
      color: '#ffffff',
      textDecorationColor: '#ffffff',
      fontSize: headerSize.value,
      textAlign: 'center',
    };
  });

  const onVotePress = () => {
    setAnimationInProgress(true);

    setTimeout(() => {
      headerSize.value = withSpring(20);

      interval = setInterval(() => {
        editText();
      }, 1);

      setTimeout(() => {
        headerSize.value = withSpring(14);
        clearInterval(interval!);
        headerRef?.current?.setNativeProps({text: `${rewards + userPoints}`});
        footerRef?.current?.setNativeProps({text: '0'});
      }, (reward > 10 ? 10 : reward) * 100);
    }, 1000);
  };

  return (
    <MainComponent
      reward={reward}
      headerRef={headerRef}
      footerRef={footerRef}
      onVotePress={onVotePress}
      headerTextStyle={headerTextStyle}
      animationInProgress={animationInProgress}
      setAnimationInProgress={setAnimationInProgress}
    />
  );
};
