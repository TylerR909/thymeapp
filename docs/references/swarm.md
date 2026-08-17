# Foursquare Swarm – Product Description & Feature Bible

**Developer**: Foursquare Labs  
**Platforms**: iOS, Android (with Apple Watch / widget support)  
**Core Identity**: The original check-in and travel app that turns your daily journeys into a personal location history, social map, and travel journal you’ll actually love using.  
**Tagline essence**: Check in anywhere. Find amazing places. Save favorites. See your life on a map.

Swarm is a **lifelogging** app centered on explicit, intentional check-ins to places. It is not a passive continuous tracker; the user (or smart suggestions) decides to log a visit. The result is a rich, searchable, visual, and social personal history of everywhere you’ve been, enhanced by heavy gamification and a strong sense of “knowledge” about your patterns.

---

## Core User Experience & Mental Model

Opening Swarm feels like opening a living map + timeline of *your* life. The primary actions revolve around:

1. **Checking in** quickly when you arrive somewhere (or later via suggestions).
2. Looking back at your personal timeline and map of pins.
3. Collecting stickers, competing for mayorships, and earning coins.
4. Seeing what friends are up to and interacting with their check-ins.
5. Discovering new places or revisiting your own history.

The app is powered by Foursquare’s massive, verified global Points-of-Interest (POI) database — the same data used by many major mapping and recommendation services. Every place has rich metadata: category, address, tips, photos, events, subvenues, ratings, etc.

Privacy is first-class: every check-in can be public (visible to friends / optionally broader) or “Off the Grid” (private, only for your own history and some rewards).

---

## Check-In Flow (The Heart of the App)

**One-tap / quick check-in** is the signature interaction:

- A prominent “+” or check-in button.
- App suggests nearby places based on current location (list ranked by relevance/distance, powered by Foursquare).
- Tap a place → done (or add more).
- Optional enrichments in the compose screen:
  - Photos (camera or library; photo share extension exists so you can start a check-in from any photo).
  - Tag / @mention friends who are with you.
  - Stickers (see Gamification).
  - Short note / “shout”.
  - Privacy toggle.
- Can also create a new venue if the place doesn’t exist, or attach to an event happening at a venue.
- After check-in: immediate feedback (coins earned, sticker progress, mayorship status, insights).

**Missed / backfill check-ins** (key feature matching the user’s interest):
- Smart suggestions appear in your history/timeline for places the app believes you visited but didn’t check into.
- On-device photo library scanning (private, no uploads): “Scan Photo” CTA generates check-in suggestions from photos you’ve taken at places.
- Historical location-based suggestions.
- User can confirm, edit, or dismiss. This creates a deliberate “attempt to backfill check-ins you may have missed” experience so your personal history stays complete even if you forgot to log in the moment.

Smart notifications prompt you when you arrive at a new or favorite place: “Check in here?” to keep streaks and stickers alive.

---

## Personal History, Timeline & Maps

**Your Life Timeline**:
- Chronological feed of every check-in.
- Scrollable across days, weeks, months, years.
- Searchable: by place name, city, category, friends tagged, events, attractions, date (jump-to-date picker).
- Each entry shows time, place details, photos, stickers, friends, notes, and insights.

**Personal Map (“You” map / Swarm Map)**:
- Interactive map with pins for all past check-ins.
- Zoom, pan, cluster.
- Tap a pin → details (when, with whom, photos, notes, how many times you’ve been there).
- Filter / hide places you’ve been, lists, etc.
- Shareable personalized map of your travels.

**Explore Map** (redesigned with multiple modes):
- **Discover**: Personalized places nearby.
- **Events**: Things happening.
- **Swarming Now**: Real-time trending / active check-ins.
- **You**: Your own check-ins and saved spots.

Additional map/list features: lists & bookmarks (create “Best Pizza”, “Tokyo Trip”, “Weekend Spots”), subvenues, venue pages with tips, ratings, reservation/delivery links in some cases.

**Stats & Knowledge**:
- Lifetime check-ins count.
- Unique categories visited.
- Most-visited spots.
- Streaks (daily / consecutive).
- City / country exploration progress.
- The app “knows” your history deeply — you can ask “where have I been?” and get rich answers via search and map.

This creates the feeling of a living digital library of your physical life.

---

## Gamification (The Addictive Layer)

Swarm’s personality comes from its game-like systems. They reward exploration, consistency, and social activity.

### Coins
- Earned on every check-in.
- Bonuses for: adding a photo, tagging friends, checking into a new place, continuing a streak, applying stickers, becoming mayor, etc.
- Used for weekly leaderboards against friends (Monday–Sunday competition).
- Visible progress and rankings among your social circle.

### Stickers & Collectible Categories
- Visual rewards unlocked by checking into different *categories* of places (restaurants of various types, museums, parks, bars, gyms, gas stations, etc.).
- Collectible system: unlock new stickers as you visit new categories or hit milestones within them.
- Apply stickers to a check-in for coin multipliers / bonuses.
- Sticker upgrades (higher multipliers) are limited (e.g., once per week, reset Sunday midnight).
- Share favorite stickers with friends.
- Sticker Book / collection view to see progress and what you’ve unlocked.
- This is one of the most loved “fun” elements — makes checking into ordinary places feel rewarding and encourages trying new categories (“Haven’t been to an art museum yet? Unlock the sticker!”).

### Mayorships
- Become the “Mayor” of a venue by having the most check-ins there in a rolling 30-day window.
- Only one check-in per day counts toward mayorship.
- Ties go to the current mayor.
- Progress bars show how close you are to taking the crown.
- Notifications when you gain or lose a mayorship.
- Friendly competition with the broader Swarm network (and especially friends).
- Visual crown icon on the venue and on your profile for places you mayor.

### Streaks, Badges & Milestones
- Daily check-in streaks.
- Badges for consecutive days, new cities, new places, exploration milestones.
- Celebrate and track progress (“Keep your streak alive”).
- Monthly recaps with redesigned visuals highlighting achievements.

### Insights & Recognitions
The app surfaces contextual knowledge after check-ins or in history:
- “Last time you checked in here was 3 weeks ago.”
- “Last time you checked into an Italian restaurant was 6 months ago.”
- “4th week in a row at the gym.”
- “First time with [friend] in X months.”
- Category exploration stats and progress toward stickers.
- Habit and pattern recognition that makes the history feel intelligent and personal.

These recognitions reinforce the “knowledge of where you’ve been” and encourage continued engagement.

---

## Social Features

- Live social map showing friends’ recent public check-ins.
- Nearby friends detection and alerts for spontaneous meetups.
- Tag friends in check-ins; @mentions in shouts and comments.
- Comment, react, and plan on check-ins.
- Friend activity feed.
- See friends’ mayorships, streaks, and stats (respecting privacy).
- Messaging (historical feature, may still exist in some form).
- Share check-ins or maps externally (Facebook, Twitter, etc.) if desired.
- Privacy controls so you can still lifelog privately while remaining social when you want.

Checking in with federated/ad-hoc friends (or tagging them) is a core social loop.

---

## Additional Notable Features

- Dark mode (system or manual).
- Home-screen widgets for quick check-ins and recaps.
- Photo share extension and “create venue from photo”.
- Opinionator / quick rating prompts for venues.
- Venue events creation and discovery.
- History search by events, categories, attractions.
- Lists visible on venue pages; followers of lists.
- Monthly Year-in-Review style recaps.
- Power-efficient location technology (though continuous GPS use by any app can drain battery; Swarm optimizes where possible).

---

## Overall Feel & Design Philosophy

Swarm feels playful, social, and personal. Checking in is fast and satisfying. Unlocking a new sticker or taking a mayorship gives a small dopamine hit. Looking at your map of pins or scrolling the timeline creates a strong sense of “this is my life, documented.” The combination of intentional logging + smart backfill suggestions + deep category knowledge + gamification makes the history feel complete and alive rather than sparse.

The UX prioritizes:
- Speed of logging.
- Visual richness (maps, stickers, photos, crowns).
- Social connection.
- Long-term personal value (searchable lifelog + stats).
- Exploration incentives.

It is the gold-standard reference for “check-in app with stickers, mayorships, personal map of life, and smart history.”

---

*This document captures the product essence, major UX flows, and feature set of Foursquare Swarm as of 2025–2026 so that references to “Swarm-like” behavior are unambiguous.*
