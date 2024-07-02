import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182b3a",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const westernCompatibility = [
  [7, 6, 4, 6, 8, 1, 6, 1, 8, 5, 6, 6], // Aries
  [7, 6, 3, 6, 6, 8, 1, 6, 1, 8, 3, 5], // Taurus
  [4, 4, 6, 4, 4, 3, 8, 1, 6, 1, 8, 7], // Gemini
  [6, 6, 4, 7, 7, 6, 3, 8, 1, 6, 1, 8], // Cancer
  [8, 6, 6, 6, 6, 7, 6, 6, 8, 1, 6, 1], // Leo
  [1, 8, 4, 6, 6, 7, 3, 4, 3, 8, 1, 6], // Virgo
  [6, 1, 8, 3, 3, 3, 7, 7, 4, 5, 8, 1], // Libra
  [1, 6, 1, 8, 8, 6, 7, 7, 4, 4, 5, 6], // Scorpio
  [8, 8, 6, 7, 7, 8, 7, 7, 8, 5, 7, 8], // Sagittarius
  [5, 6, 1, 6, 1, 8, 5, 4, 8, 8, 5, 7], // Capricorn
  [6, 3, 8, 1, 6, 1, 8, 5, 7, 5, 8, 8], // Aquarius
  [6, 5, 7, 8, 1, 6, 1, 6, 8, 6, 5, 5], // Pisces
];

const chineseCompatibility = [
  [7, 7, 4, 6, 8, 1, 6, 1, 8, 5, 6, 6], // Rat
  [6, 7, 6, 3, 7, 7, 8, 1, 8, 8, 3, 6], // Ox
  [3, 3, 6, 4, 8, 6, 6, 1, 8, 5, 6, 8], // Tiger
  [7, 6, 6, 7, 4, 7, 3, 8, 1, 7, 6, 3], // Rabbit
  [7, 6, 6, 7, 8, 8, 6, 6, 6, 1, 3, 8], // Dragon
  [1, 7, 6, 7, 3, 3, 8, 4, 8, 8, 8, 5], // Snake
  [6, 8, 4, 6, 6, 7, 7, 7, 1, 6, 6, 8], // Horse
  [1, 8, 4, 8, 1, 3, 7, 7, 4, 4, 5, 6], // Goat
  [8, 8, 6, 7, 7, 8, 7, 7, 8, 5, 7, 8], // Monkey
  [5, 6, 1, 6, 1, 8, 5, 4, 8, 8, 5, 7], // Rooster
  [6, 3, 8, 1, 6, 1, 8, 5, 7, 5, 8, 8], // Dog
  [6, 5, 7, 8, 1, 6, 1, 6, 8, 6, 5, 5], // Pig
];

function calculateCompatibility() {
  const western1 = document.getElementById('western1').selectedIndex;
  const chinese1 = document.getElementById('chinese1').selectedIndex;
  const western2 = document.getElementById('western2').selectedIndex;
  const chinese2 = document.getElementById('chinese2').selectedIndex;
 
  if (western1 === 0 || chinese1 === 0 || western2 === 0 || chinese2 === 0) {
      alert('Please select all signs.');
      return;
  }

  const westernScore = westernCompatibility[western1 - 1][western2 - 1];
  const chineseScore = chineseCompatibility[chinese1 - 1][chinese2 - 1];
 
  const combinedScore = (0.25 * westernScore) + (0.75 * chineseScore);
  document.getElementById('compatibilityScore').textContent = combinedScore.toFixed(2) + '%';
}

function calculateDoubleSign() {
  const dob = new Date(document.getElementById('dob').value);
  if (!dob) {
      alert('Please enter your date of birth.');
      return;
  }

  const westernZodiac = getWesternZodiac(dob);
  const chineseZodiac = getChineseZodiac(dob);
 
  document.getElementById('doubleSignOutput').textContent = `${chineseZodiac}/${westernZodiac}`;
}

function getWesternZodiac(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio';
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Sagittarius';
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'Capricorn';
}

function getChineseZodiac(date) {
  const year = date.getFullYear();
  const zodiacSigns = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  return zodiacSigns[(year - 4) % 12];
}

