# BrushOff
BrushOff is a social drawing app for both iOS and Android. Play with your friends
to find out who's the best artist!

How to play:
With a minimum of 3 players, enter your names into the fields on the lobby screen.
Each round, one of you will be assigned as a judge and you can choose a new
category. Everyone who isn't a judge for that round gets to draw the given
prompt. The judge will decide which drawing is the best, and the winner Will
earn a point. Keep playing as many rounds as you want and whoever gets the
most points wins!

To install:
1. Install Node.js -> https://nodejs.org/en/download/
2. Install the Expo app on your mobile device
3. Install Yarn -> https://yarnpkg.com/lang/en/docs/install/#windows-stable
4. Install expo-cli using npm in your command line:
    npm install -g expo-cli
    (If this command doesn't work, try - yarn global add expo-cli)
5. Fork and clone our project:
    https://github.com/afoster1029/BrushOff
6. In your command line, cd to the BrushOff project folder
7. Install the following dependencies using these commands:
  - yarn add expo-pixi
  - yarn add colorsys
  - yarn add react-native-modal
  - yarn add react-native-timer
  - yarn add react-native-swiper
  - yarn add react-native-timer-mixin
  - yarn add react-navigation@2.17.0 #Important that it is v2 not v3
  (If you are having issues with yarn, instead of yarn add try npm install --save)
8. Enter the command based on your phone type:
   iOS: npm start
   android: expo start
9. Follow the instructions in the command line to open the project on
your phone. (Cannot use QR code on iOS)
  - Note: If you are on internet that does not allow local networks you can
    use your phone's mobile hotspot
10. Enjoy the game!

Future goals
 - Implementation of networking
   - Everyone can vote
   - Accounts
   - Stats
   - Using node.js
 - More drawing features
   - Eraser
   - Color wheel
   - Adjust color brightness
   - Save colors
 - New game modes
 - Better prompts
 - More customizability
 - Fix bugs
 