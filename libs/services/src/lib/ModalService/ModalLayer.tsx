import { ModalAnimationOptions, ModalAnimationType } from '@expense-tracker/shared-types'
import React from 'react'
import { Animated, Dimensions, Easing, StyleSheet, ViewProps } from 'react-native'

const { height } = Dimensions.get('window')

interface IProps {
  children: React.ReactElement<any>;
  animationOptions?: ModalAnimationOptions;
  backgroundRef?: React.ReactElement<any>
}

export class ModalLayer extends React.Component<IProps> {
  private readonly animatedValue: Animated.Value
  private readonly animatedOpacity: Animated.Value

  constructor(props: IProps) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.animatedOpacity = new Animated.Value(1)
  }

  componentDidMount() {
    if (this.props.animationOptions?.isOpenAnimationEnabled) {
      this.animateAppearance()
    }
  }

  public animateAppearance(): void {
    switch (this.props.animationOptions?.animationType) {
      case ModalAnimationType.Fade:
        this.animatedOpacity.setValue(0)
        Animated.timing(this.animatedOpacity, {
          toValue: 1,
          easing: Easing.out(Easing.cubic),
          duration: 400,
          useNativeDriver: true,
        }).start()
        break
      default:
        this.animatedValue.setValue(height)
        Animated.timing(this.animatedValue, {
          toValue: 0,
          easing: Easing.out(Easing.cubic),
          duration: 400,
          useNativeDriver: true,
        }).start()
    }
  }

  public animateClosing = (): Promise<boolean> => {
    return new Promise((res) => {
      switch (this.props.animationOptions?.animationType) {
        case ModalAnimationType.Fade:
          this.animatedOpacity.setValue(1)
          Animated.timing(this.animatedOpacity, {
            toValue: 0,
            easing: Easing.out(Easing.cubic),
            duration: 400,
            useNativeDriver: true,
          }).start(({ finished }) => (res(finished)))
          break
        default:
          this.animatedValue.setValue(0)
          Animated.timing(this.animatedValue, {
            toValue: height,
            easing: Easing.out(Easing.cubic),
            duration: 400,
            useNativeDriver: true,
          }).start(({ finished }) => (res(finished)))
      }
    })
  }

  public render(): React.ReactElement<ViewProps> | null {
    const { children, backgroundRef } = this.props
    return (
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject,  transform: [{ translateY: this.animatedValue }], opacity: this.animatedOpacity  }}
        pointerEvents='box-none'
      >
        { React.cloneElement(children, { backgroundRef }) }
      </Animated.View>
    )
  }
}
