import React, { use } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { Extrapolate, interpolate, interpolateColor, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";


type Props = {
    index: number;
    x: SharedValue<number>;
};
const Dot = ({index, x}: Props) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const animatedDotStyle = useAnimatedStyle(()=>{
        const widthAnimation = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
    
            [10, 20, 10],
            Extrapolate.CLAMP
        )
         const opacityAnimation = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
    
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        )
        return{
            width: widthAnimation,
            opacity: opacityAnimation,
            
        };

    });
    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
            ["#005b4f", "#1e2169", "#f15937"],
          
        );
        return {
            backgroundColor: backgroundColor,
        };
    })
return (
    <Animated.View style={[styles.dot,animatedDotStyle, animatedColor]}/>

  

)

}
export default Dot
const styles = StyleSheet.create({
    dot:{
       
        height: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    }


});