import React, { useEffect, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated'

export interface SwitchItem<ValueType> {
  label: string;
  value: ValueType;
}

export interface MultipleSwitcherProps<ValueType> {
  items: Array<SwitchItem<ValueType>>;
  value: ValueType;
  onChange: (value: ValueType) => void;
  disabled?: boolean;
  mediumHeight?: boolean;
  bigHeight?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  sliderStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 1,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
}

export const MultipleSwitcher = <ValueType,>(props: MultipleSwitcherProps<ValueType>) => {
  type SpecificSwitchItem = SwitchItem<ValueType>;

  const { width } = useWindowDimensions()
  const [items] = useState(props.items)
  const [elements, setElements] = useState<{ id: SpecificSwitchItem['value']; value: number }[]>([])
  const [active, setActive] = useState(props.value)

  const translateX = useSharedValue(-width)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (elements.length === props.items.length) {
      const position = elements.find((el) => el.id === props.value)
      if (position) {
        translateX.value = position.value
        opacity.value = withTiming(1, { duration: 100 })
      }
    }
  }, [elements])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    }
  })

  const getContainerStyle = () => {
    return [
      styles.container,
      props.containerStyle,
      props.mediumHeight ? styles.mediumHeight : {},
      props.bigHeight ? styles.bigHeight : {},
      props.disabled ? styles.containerDisabled : {},
    ]
  }

  const getSliderStyle = () => {
    return [
      styles.slider,
      { width: `${100 / props.items.length}%` as `${number}%` },
      props.sliderStyle,
      props.disabled ? styles.sliderDisabled : {},
    ]
  }

  const startAnimation = (newVal: ValueType) => {
    const position = elements.find((el) => el.id === newVal)
    if (!position) return

    translateX.value = withSpring(position.value, springConfig)
    setActive(newVal)

    const oldPosition = elements.find((el) => el.id === props.value)
    if (!oldPosition) {
      opacity.value = withTiming(1, { duration: 100 })
    }

    props.onChange(newVal)
  }

  return (
    <View style={getContainerStyle()}>
      <Animated.View style={[getSliderStyle(), animatedStyle]} />
      {items.map((item: SpecificSwitchItem) => (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.item,
            { width: `${100 / props.items.length}%` },
          ]}
          onPress={() => startAnimation(item.value)}
          key={item.value as string}
          onLayout={(e) =>
            setElements([
              ...elements,
              { id: item.value, value: e.nativeEvent.layout.x + -borderWidth },
            ])
          }
          disabled={props.disabled}
        >
          <Text
            style={[
              styles.itemText,
              props.textStyle,
              active === item.value && props.activeTextStyle,
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const backgroundColor = '#FFF'
const selectedColor = '#efefef'
const backgroundColorDisabled = '#636363'
const selectedColorDisabled = '#787878'
const colorText = '#575757'
const borderWidth = 2

const styles = StyleSheet.create({
  container: {
    // width: '60%',
    alignSelf: 'center',
    borderColor: selectedColor,
    borderWidth,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 42,
    backgroundColor: backgroundColor,
    overflow: 'hidden',
  },
  slider: {
    position: 'absolute',
    height: '100%',
    backgroundColor: selectedColor,
  },
  item: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colorText,
    textTransform: 'capitalize',
  },
  containerDisabled: {
    backgroundColor: backgroundColorDisabled,
  },
  sliderDisabled: {
    backgroundColor: selectedColorDisabled,
  },
  mediumHeight: {
    height: 40,
  },
  bigHeight: {
    height: 50,
  },
})
