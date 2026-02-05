/**
 * Safely extracts moodleID from either a primitive ID or a nested object
 * Handles both serializer formats: { moodleID: 123 } and primitive 123
 * @param {number|string|object} value - The ID value (could be primitive or object)
 * @returns {string} - Normalized string ID for comparison
 */
function normalizeId(value) {
  if (value == null) return '';
  
  // If it's an object, extract moodleID
  if (typeof value === 'object') {
    return String(value.moodleID ?? value.id ?? '').trim();
  }
  
  // Otherwise, convert to string
  return String(value).trim();
}

/**
 * Safely checks if a user is a member of a team (either leader or member)
 * Handles both serializer formats:
 * - Primitive: leader: 24102018, members: [24102019]
 * - Nested: leader: { moodleID: 24102018 }, members: [{ moodleID: 24102019 }]
 * 
 * @param {object} team - The team object
 * @param {object} user - The user object (must have moodleID)
 * @returns {boolean} - True if user is leader or member, false otherwise
 */
export function isUserInTeam(team, user) {
  // Defensive checks
  if (!team || !user) return false;
  if (!user.moodleID) return false;

  const userIdStr = String(user.moodleID).trim();

  // Check if user is leader
  const normalizedLeader = normalizeId(team.leader);
  if (normalizedLeader === userIdStr) return true;

  // Check if user is in members array
  if (Array.isArray(team.members)) {
    for (const member of team.members) {
      const normalizedMember = normalizeId(member);
      if (normalizedMember === userIdStr) return true;
    }
  }

  return false;
}

/**
 * Checks if a user is already in any team for a specific event
 * @param {array} userTeams - Array of teams the user is part of
 * @param {string} eventSlug - The event slug to check
 * @param {object} user - The user object
 * @returns {boolean} - True if user is in any team for this event
 */
export function isUserInTeamForEvent(userTeams, eventSlug, user) {
  if (!Array.isArray(userTeams) || !user) return false;

  return userTeams.some(team => {
    // Check if team is for this event
    if (String(team.event_slug) !== String(eventSlug)) return false;
    
    // Check if user is part of this team
    return isUserInTeam(team, user);
  });
}
