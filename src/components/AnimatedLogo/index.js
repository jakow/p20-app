// @flow

import React from 'react';
import { Animated } from 'react-native';
import { Svg } from 'expo';

import { paths, background } from './paths';

interface AnimatedLogoProps {
  height: number;
  show: boolean;
  onAnimationFinish?: () => void;
}

interface AnimatedLogoState {
  values: Animated.Value[];
  backgroundValue: Animated.Value[];
}

const Path = Animated.createAnimatedComponent(Svg.Path);

const aspectRatio = 373.768 / 430.135;

const DURATION = 200;
const STAGGER = 15;

export default class AnimatedLogo extends React.Component<AnimatedLogoProps, AnimatedLogoState> {
  static defaultProps = {
    height: 100,
    show: true,
  };

  constructor(props: AnimatedLogoProps) {
    super(props);
    this.state = {
      values: paths.map(() => new Animated.Value(0)),
      backgroundValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animate(this.props.show);
  }

  componentWillReceiveProps(newProps: AnimatedLogoProps) {
    if (newProps.show !== this.props.show) {
      // start animation
      this.animate(newProps.show);
    }
  }

  onAnimationFinish = () => {
    this.anmation = undefined;
    if (this.props.onAnimationFinish) {
      this.props.onAnimationFinish();
    }
  }

  animate(showState: boolean) {
    const toValue = showState ? 1 : 0;
    const pathAnimations = Animated.stagger(
      STAGGER,
      this.state.values.map(v => Animated.timing(v, {
        toValue,
        duration: DURATION,
      })),
    );

    const backgroundAnimation = Animated.timing(
      this.state.backgroundValue,
      {
        toValue,
        duration: 150,
      },
    );

    const animationSequence = [pathAnimations, backgroundAnimation];
    if (!showState) {
      animationSequence.reverse();
    }
    // stop existing animation
    if (this.animation) {
      this.animation.stop();
    }
    this.animation = Animated.sequence(animationSequence);
    this.animation.start(this.onAnimationFinish);
  }

  renderPaths() {
    return paths.map((p, idx) => (
      <Path
        key={idx}
        d={p.path}
        fill={p.fill}
        fillOpacity={this.state.values[idx]}
      />));
  }

  render() {
    const { height } = this.props;
    return (<Svg width={aspectRatio * height} height={height} viewBox="0 0 373.768 430.135">
      <Path d={background.path} fill={background.fill} fillOpacity={this.state.backgroundValue} />
      { this.renderPaths() }
    </Svg>);
  }
}
