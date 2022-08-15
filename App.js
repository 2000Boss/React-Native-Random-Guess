import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameSceen from "./screens/StartGameSceen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameOver, setGameOver] = useState(true);

  const selectedNumberHandle = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };

  const gameOverHandler = () => {
    setGameOver(true);
  };

  let screen = <StartGameSceen onPickNumber={selectedNumberHandle} />;
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameOver && userNumber) {
    screen = <GameOverScreen />;
  }
  return (
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
