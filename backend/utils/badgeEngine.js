export const checkBadges = async (user, species) => {
  const count = user.speciesStats.get(species) || 0;

  // Badge: Species Specialist (5 catches of same species)
  if (count === 5) {
    awardBadge(user, `${capitalize(species)} Specialist`);
  }

  // Badge: Species Master (20 catches)
  if (count === 20) {
    awardBadge(user, `${capitalize(species)} Master`);
  }

  // Badge: Multi-Species Angler (5 different species)
  if (user.speciesStats.size >= 5) {
    awardBadge(user, "Multi-Species Angler");
  }

  // Badge: Elite Angler (100 total catches)
  const total = [...user.speciesStats.values()].reduce((a, b) => a + b, 0);
  if (total === 100) {
    awardBadge(user, "Elite Angler");
  }
};

const awardBadge = (user, badgeName) => {
  const alreadyHas = user.badges.some((b) => b.name === badgeName);
  if (!alreadyHas) {
    user.badges.push({ name: badgeName });
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
