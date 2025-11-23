/**
 * Calcula a distância entre duas coordenadas geográficas usando a fórmula de Haversine
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calcula o score de compatibilidade entre habilidades
 */
export function calculateSkillMatch(
  userSkills: string[],
  requiredSkills: string[]
): number {
  if (!requiredSkills || requiredSkills.length === 0) return 100;
  if (!userSkills || userSkills.length === 0) return 0;

  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase().trim());
  const normalizedRequiredSkills = requiredSkills.map((s) =>
    s.toLowerCase().trim()
  );

  const matches = normalizedRequiredSkills.filter((skill) =>
    normalizedUserSkills.includes(skill)
  ).length;

  return (matches / normalizedRequiredSkills.length) * 100;
}

/**
 * Calcula o score de compatibilidade de horários
 */
export function calculateScheduleMatch(
  userAvailability: string[],
  opportunitySchedule: string[]
): number {
  if (!opportunitySchedule || opportunitySchedule.length === 0) return 100;
  if (!userAvailability || userAvailability.length === 0) return 0;

  const normalizedUserAvailability = userAvailability.map((s) =>
    s.toLowerCase().trim()
  );
  const normalizedSchedule = opportunitySchedule.map((s) =>
    s.toLowerCase().trim()
  );

  const matches = normalizedSchedule.filter((schedule) =>
    normalizedUserAvailability.includes(schedule)
  ).length;

  return (matches / normalizedSchedule.length) * 100;
}
