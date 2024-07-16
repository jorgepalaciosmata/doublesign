
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

function calculateCompatibility(dobPrimary: Date, dobSecondary: Date) {

  const primary = calculateDoubleSign(dobPrimary);
  const secondary = calculateDoubleSign(dobSecondary);
  const primaryWesternIndex = westernIndexMapping[primary?.western as keyof typeof westernIndexMapping]; 
  const secondaryWesternIndex = westernIndexMapping[secondary?.western as keyof typeof westernIndexMapping];
  const primaryChineseIndex = chineseIndexMapping[primary?.chinese as keyof typeof chineseIndexMapping];
  const secondaryChineseIndex = chineseIndexMapping[secondary?.chinese as keyof typeof chineseIndexMapping];

  const westernScore = westernCompatibility[primaryWesternIndex][secondaryWesternIndex];
  const chineseScore = chineseCompatibility[primaryChineseIndex][secondaryChineseIndex];

  const combinedScore = (0.25 * westernScore) + (0.75 * chineseScore);
  return combinedScore;
}

const westernIndexMapping = 
{
    "aries": 0,
    "taurus": 1,
    "gemini": 2,
    "cancer": 3,
    "leo": 4,
    "virgo": 5,
    "libra": 6,
    "scorpio": 7,
    "sagittarius": 8,
    "capricorn": 9,
    "aquarius": 10,
    "pisces": 11,
}

const chineseIndexMapping = 
{
    "rat": 0,
    "ox": 1,
    "tiger": 2,
    "rabbit": 3,
    "dragon": 4,
    "snake": 5,
    "horse": 6,
    "goat": 7,
    "monkey": 8,
    "rooster": 9,
    "dog": 10,
    "pig": 11,
}

export function calculateDoubleSign(dob: Date) {
  if (!dob) {
      alert('Please enter your date of birth.');
      return;
  }

  const westernZodiac = getWesternZodiac(dob);
  const chineseZodiac = getChineseZodiac(dob);
  return { western: westernZodiac, chinese: chineseZodiac };
}

function getWesternZodiac(date: Date) {
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

function getChineseZodiac(date: Date) {
  const year = date.getFullYear();
  const zodiacSigns = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  return zodiacSigns[(year - 4) % 12];
}
