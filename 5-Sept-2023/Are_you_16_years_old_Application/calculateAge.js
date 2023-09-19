function calculateAge(month, day, year) {
  const today = new Date();
  // Subtract 1 from the month because months are zero-indexed
  const birthDate = new Date(year, month - 1, day);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

module.exports = {
  calculateAge,
};