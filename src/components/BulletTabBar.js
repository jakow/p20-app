// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

type BulletTabberProps = {
  selectedTab: number,
  numberOfTabs: number,
  selectedColor?: string,
  emptyColor?: string,
};

const BULLET_SIZE = 12;
const BULLET_SPACING = 10;

const style = StyleSheet.create({
  bullets: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: BULLET_SPACING,
  },
  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
    marginHorizontal: BULLET_SPACING / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.333)',
  },
  active: {
    backgroundColor: '#ffffff',
  },
});

export default class BulletTabBar extends React.Component<
void,
BulletTabberProps,
void> {
  bulletStyle(index: number) {
    const active = index === this.props.selectedTab;
    return [
      style.bullet,
      this.props.emptyColor && {
        backgroundColor: this.props.emptyColor,
      },
      active && style.active,
      active && this.props.selectedColor && {
        backgroundColor: this.props.selectedColor,
      },
    ];
  }

  renderBullets() {
    const bullets = [];
    for (let i = 0; i < this.props.numberOfTabs; i += 1) {
      bullets.push(<View key={i} style={this.bulletStyle(i)} />);
    }
    return bullets;
  }

  render() {
    return (
      <View style={style.bullets}>
        {this.renderBullets()}
      </View>
    );
  }
}
