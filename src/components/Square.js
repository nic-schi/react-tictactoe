import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

class SquareRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={ styles.squareContainer }>
                { this.props.squares }
            </View>
        );
    }

}

class Square extends React.Component {

    render = () => {
        let wonStyle = null;
        if (this.props.won) {
            wonStyle = styles.won;
        }

        return (
            <Pressable onPress={() => this.props.clickHandler(this.props.ID) }>
                <View style={ [styles.square, wonStyle] }>
                    <Text style={ styles.squareText }>
                        { this.props.symbol }
                    </Text>
                </View>
            </Pressable>
        );
    }

}

const size = 75;

const styles = StyleSheet.create({
    squareContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    square: {
        backgroundColor: "#ECECEC",
        color: "white",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        minWidth: size,
        minHeight: size,
        maxHeight: size,
        maxWidth: size,
        justifyContent: 'center',
        alignItems: 'center',
    },
    won: {
        backgroundColor: "lightgreen"
    },
    squareText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: (size / 2)
    },
    squareRow: {
        display: 'flex',
    }
});

export {
  Square,
  SquareRow,
}