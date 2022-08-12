import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {RewardPointComponent} from './RewardPointComponent';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const defaultRewardSize = 20;
const increasedRewardSize = 40;
const inactiveRewardTransition = 0;
const activeRewardTransition = 1;

type RewardPointProps = {
  animationInProgress: boolean;
  setAnimationInProgress: (animationInProgress: boolean) => void;
  index: number;
  isLast: boolean;
};

export const RewardPoint = ({
  animationInProgress,
  setAnimationInProgress,
  index,
  isLast,
}: RewardPointProps) => {
  const rewardSize = useSharedValue(defaultRewardSize);
  const rewardTransition = useSharedValue(inactiveRewardTransition);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (animationInProgress) {
      changeSize();
    }
  }, [animationInProgress]);

  const changeSize = () => {
    setIsHidden(false);
    rewardSize.value = withSpring(increasedRewardSize);
    setTimeout(() => {
      rewardSize.value = withSpring(defaultRewardSize);
      setTimeout(() => {
        startPointsTransition();
      }, 100 * index + 1);
    }, 1000);
  };

  const startPointsTransition = () => {
    rewardTransition.value = withSpring(
      activeRewardTransition,
      undefined,
      finished => {
        if (finished) {
          runOnJS(setIsHidden)(true);
        }
      },
    );
    setTimeout(() => {
      rewardTransition.value = withSpring(inactiveRewardTransition);
      if (isLast) {
        setAnimationInProgress(false);
      }
    }, 1000);
  };

  const rewardStyle = useAnimatedStyle(() => {
    return {
      height: rewardSize.value,
      width: rewardSize.value,
      borderRadius: interpolate(
        rewardSize.value,
        [defaultRewardSize, increasedRewardSize],
        [10, 20],
        Extrapolation.CLAMP,
      ),
      position: 'absolute',
      top: -40,
      display: isHidden ? 'none' : 'flex',
      transform: [
        {
          translateX: interpolate(
            rewardTransition.value,
            [0, 0.3, 0.6, 1],
            [0, width / 12.5, width / 10, width / 2.75],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            rewardTransition.value,
            [0, 1],
            [0, -height * 0.709],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  return <RewardPointComponent rewardStyle={rewardStyle} />;
};
