import React from 'react';
import { Text, TextInput, View } from 'react-native';


class SizeChooser extends React.Component {

    onChangeHeight = (height) => {
        if (!isNaN(height) && height != "") {
            height = parseInt(height);    
            if (height >= 3) {
                this.props.changeHandler({
                    width: this.props.width,
                    height: height
                });
            }
        }
    }

    onChangeWidth = (width) => {   
        if (!isNaN(width) && width != "") {
            if (width >= 3) {
                width = parseInt(width);    
                this.props.changeHandler({
                    width: width,
                    height: this.props.height
                });
            }
        }
    }

    render = () => {
        return (
            <View>
                <Text>
                    Höhe:
                </Text>
                <TextInput
                    onChangeText={ this.onChangeHeight }
                    defaultValue={ this.props.height }
                    placeholder="Höhe"
                    keyboardType="numeric"
                />
                <Text>
                    Breite:
                </Text>
                <TextInput
                    onChangeText={ this.onChangeWidth }
                    defaultValue={ this.props.width }
                    placeholder="Breite"
                    keyboardType="numeric"
                />
            </View>
        );
    }

}

export default SizeChooser;