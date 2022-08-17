import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";

import StartGameSceen from "./screens/StartGameSceen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameOver, setGameOver] = useState(true);
  const [guessRound, setGuessRound] = useState(0);

  useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const selectedNumberHandle = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameOver(true);
    setGuessRound(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRound(0);
  };

  let screen = <StartGameSceen onPickNumber={selectedNumberHandle} />;
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={userNumber}
        userNumber={guessRound}
        onStartNewGame={startNewGameHandler}
      />
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.accent500, Colors.primary700]}
        style={styles.rootContainer}
      >
        <ImageBackground
          source={require("./assets/images/unsplash.jpg")}
          resizeMode="cover"
          style={styles.rootContainer}
          imageStyle={styles.imageContainer}
        >
          <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageContainer: {
    opacity: 0.2,
  },
});
