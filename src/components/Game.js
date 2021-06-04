import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SizeChooser from './SizeChooser';
import { Square, SquareRow } from './Square';

class Game extends React.Component {

    constructor(props) {
        super(props);

        let width = 3;
        let height = 3;

        this.state = {
            width: width,
            height: height,
            squares: Array(height * width).fill(null),
            playCount: 1
        };
        this.acceptedWins = this.getAcceptetWins();
    }

    getSymbol = () => {
        if (this.state.playCount % 2 === 0) {
            return "O";
        }
        return "X";
    }

    getAcceptetWins = () => {
        const width = this.state.width;
        const height = this.state.height;
        const acceptedWins = [];

        // Horizontals
        for (let y = 0; y < Math.pow(height, 2); y = y + height) {
            let horizontals = [];
            for (let x = 0; x < width; x++) {
                horizontals.push(y + x);
            }
            acceptedWins.push(horizontals);
        }

        // Verticals
        for (let x = 0; x < width; x++) {
            let verticals = [];
            for (let y = 0; y < height; y++) {
                verticals.push((y * width) + x);
            }
            acceptedWins.push(verticals);
        }

        // Diagonals
        if (height == width) {
            let diagonalsPos = [];
            let diagonalsNeg = [];

            let i = 0;
            for (let y = 0; y < Math.pow(height, 2); y = y + height) {
                diagonalsPos.push(y + i);
                diagonalsNeg.push((y + height - 1) - i);

                i++;
            }

            acceptedWins.push(diagonalsPos);
            acceptedWins.push(diagonalsNeg);
        }

        return acceptedWins;
    }

    isDraw = () => {
        const fieldSize = this.state.width * this.state.height;

        if (!this.getWinner() && this.state.playCount - 1 == fieldSize) {
            return true;
        }

        return false;
    }

    reset = () => {
        this.setState({
            squares: Array(this.state.height * this.state.width).fill(null),
            playCount: 1
        });
    }

    sizeChanged = (sizes) => {
        this.setState({
            width: sizes.width,
            height: sizes.height,
            squares: Array(sizes.height * sizes.width).fill(null),
            playCount: 1
        });
    }

    makeMove = (ID) => {
        const newSymbol = this.getSymbol();
        
        const newSquares = this.state.squares.slice();
        const oldSymbol = newSquares[ID];

        let gewinner = this.getWinner();

        if (oldSymbol === null && !gewinner && !this.isDraw()) {
            newSquares[ID] = newSymbol;

            this.setState({
                squares: newSquares,
                playCount: this.state.playCount + 1,
            });
        }
    }

    getWinner = () => {
        const acceptedWins = this.acceptedWins;
        
        let winner = {
            "symbol": null,
            "IDS": []
        };

        for (let i = 0; i < acceptedWins.length; i++) {
            const wins = acceptedWins[i];
            let lastSymbol = null;

            winsFor: for (let e = 0; e < wins.length; e++) {
                const ID = wins[e];
                const symbol = this.state.squares[ID];

                if (symbol === null) 
                    break winsFor;
             
                if (lastSymbol !== null && lastSymbol !== symbol)
                    break winsFor;

                lastSymbol = symbol;

                if (e === (wins.length - 1)) {
                    winner.symbol = symbol;
                    winner.IDS = wins;

                    return winner;
                }
            }
        }

        return false;
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        this.acceptedWins = this.getAcceptetWins();
        return true;
    }

    render = () => {
        let statusAusgabe = "";
        let gewinner = this.getWinner();

        if (gewinner) {
            statusAusgabe = (
                <Text>
                    <Text style={ styles.status }>{ gewinner.symbol } </Text>
                    hat gewonnen!
                </Text>
            );
        } else if (this.isDraw()) {
            statusAusgabe = (
                <Text>Unentschieden!</Text>
            );
        }

        const squaresToDisplay = [];

        let e = 0;
        for (let y = 0; y < this.state.height; y++) {
            let squaresToPush = [];

            for (let x = 0; x < this.state.width; x++) {
                let won = false;
                
                if (gewinner) {
                    if (gewinner.IDS.includes(e)) {
                        won = true;
                    }
                }

                let square = (
                    <Square
                        won={ won }
                        key={ "COL"+ e }
                        clickHandler={ this.makeMove } 
                        symbol={ this.state.squares[e] } 
                        ID={ e }
                    />
                );
                squaresToPush.push(square);

                e++;
            }
            squaresToDisplay.push(
                <SquareRow 
                    key={ "ROW"+ y }
                    ID={ y } 
                    squares={ squaresToPush }
                />
            );
        }

        return (
            <View>
                <Text style={ styles.h1 }>
                    TicTacToe
                </Text>

                <SizeChooser
                    changeHandler={ this.sizeChanged }
                    width={ this.state.width }
                    height={ this.state.height }
                />

                <Button onPress={ this.reset } title="Neues Spiel" />

                { squaresToDisplay }

                <Text style={ styles.h1 }>
                    Aktueller Zug: <Text style={ styles.status }>{ this.getSymbol() }</Text>
                </Text>

                <Text style={ styles.h1 }>
                    { statusAusgabe }
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "lightgray"
    },
    statusDisplay: {
        paddingTop: 10,
        fontSize: 20
    },
    status: {
        color: "red"
    }
});

export default Game;