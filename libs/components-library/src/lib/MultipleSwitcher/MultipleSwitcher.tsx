import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions
} from 'react-native'

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

export const MultipleSwitcher = <ValueType,>(props: MultipleSwitcherProps<ValueType>) => {
  type SpecificSwitchItem = SwitchItem<ValueType>;

  const { width } = useWindowDimensions()
  const [items, setItems] = useState(props.items)
  const [elements, setElements] = useState<{ id: SpecificSwitchItem['value']; value: number }[]>([])
  const [active, setActive] = useState(props.value)
  const animatedValue = useRef(new Animated.Value(0)).current
  const opacityValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setItems(props.items)
    setElements([])
  }, [width])

  useEffect(() => {
    if (elements.length === props.items.length) {
      const position = elements.find((el) => el.id === props.value)
      Animated.timing(animatedValue, {
        toValue: position ? position.value : -width,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        if (!position) return
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()
      })
    }
  }, [elements])

  const getContainerStyle = () => {
    return [
      styles.container,
      props.containerStyle,
      props.mediumHeight ? styles.mediumHeight : {},
      props.bigHeight ? styles.bigHeight : {},
      props.disabled ? styles.containerDisabled : {},
    ]
  }

  const getSliderStyle = (): Animated.WithAnimatedObject<ViewStyle> => {
    return [
      styles.slider,
      { width: `${100 / props.items.length}%` },
      { transform: [{ translateX: animatedValue }] },
      { opacity: opacityValue },
      props.sliderStyle ? props.sliderStyle : {},
      props.disabled ? styles.sliderDisabled : {},
    ] as Animated.WithAnimatedObject<ViewStyle>
  }

  const startAnimation = (newVal: ValueType) => {
    const position = elements.find((el) => el.id === newVal)
    if (!position) {
      return
    }
    Animated.timing(animatedValue, {
      toValue: position.value,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setActive(newVal)

      const oldPosition = elements.find(function (el) {
        return el.id === props.value
      })

      if (oldPosition) return

      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    })
    props.onChange(newVal)
  }

  return (
    <View style={getContainerStyle()}>
      <Animated.View style={getSliderStyle()} />
      {items.map((item: SpecificSwitchItem) => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.item,
            { width: `${100 / props.items.length}%` },
          ]}
          onPress={() => {
            startAnimation(item.value)
          }}
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
    width: '60%',
    alignSelf: 'center',
    borderColor: selectedColor,
    borderWidth,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
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
