# Life Cycle – Track Your Time – Product Description & Feature Bible

**Developer**: Sleep Cycle AB / Northcube  
**Platforms**: iOS (with Apple Watch support)  
**Core Identity**: An automatic time-and-location tracker that presents your life sorted into colorful “slices.” It shows your daily activities, the places you go, and who you spend time with — with almost no manual effort.  
**Tagline essence**: Your life, automatically sorted into slices. Start each week with a look back.

Life Cycle is a **passive, automatic** time-tracking and place-logging app. Unlike explicit check-in apps, it runs quietly in the background and reconstructs where you were and how you spent your time. Its signature magic is the ability to open the app after months of inactivity and still see a complete, categorized history of the intervening period. It visualizes everything primarily through beautiful donut / pie charts (“slices of life”) and weekly journals.

---

## Core User Experience & Mental Model

You install Life Cycle, grant location and Health permissions, and then largely forget about it. It works while the phone is in your pocket. When you open it, you are greeted with a clear visual summary of how you spent your time — today, this week, this month, or this year — broken into colored slices.

The dominant UI metaphor is the **donut / pie chart**:
- Large, colorful rings or pies showing percentage and absolute time spent in categories (Home, Work, Sleep, specific places, transport, etc.).
- Center or labels show total hours or key insights.
- Calendar views with multiple daily donuts.
- Ability to dig deeper into slices that have many sub-pieces.

Secondary views include weekly journals (with auto-attached photos), trend graphs (premium), place detail screens, and lists of unknown locations waiting for you to name them.

The app feels like a quiet, insightful companion that already knows your life and is ready to show it to you in an aesthetically pleasing, non-judgmental way.

---

## Automatic Tracking Magic (The Key Differentiator)

**How it tracks without destroying battery**:
- Explicitly does **not** use continuous background GPS.
- Relies primarily on **cell-tower and Wi-Fi** location signals.
- Critically leverages **iOS Significant Locations** (System Services). The operating system itself maintains a history of significant places you visit; Life Cycle reads and processes this data.
- Detects stays (Visits), motion/transitions (walking, driving, etc.), and duration at places.
- Battery impact claimed at **less than 1% per day** when running in the background.
- Requirements for good results: phone must be carried, Wi-Fi preferably enabled, background refresh / location permissions granted, Significant Locations enabled in iOS settings.

**The “open after 6 months and it still knows everything” experience** (exactly matching the user’s description):
Because the underlying data (iOS Significant Locations + the app’s own visit logs) continues to accumulate even when the app is not actively opened or in the foreground for long periods, reopening after months of inactivity still yields a rich, categorized history. The app can effectively import/backfill and reconstruct places visited, time spent, and patterns across those months. This is the feature users find most impressive and “magical.”

Internal data structures (from reverse-engineering notes) include rich tables for LocationEvents, Visits, Motion classifications, and Activities — confirming it stores detailed historical observations.

---

## Categorization & Place Knowledge

Life Cycle learns and categorizes automatically over time:

- **Frequent long-stay places** become Home, Work, etc., based on patterns (time of day, duration, frequency).
- **Sleep** is imported from Apple Health (Sleep Analysis) and appears as a major slice.
- **Transport / commute** is detected via motion (walking, driving) and can be shown or disabled.
- **Specific venues**: When the app detects a new stay, it prompts the user to give it a friendly name and an activity/category (e.g., “Bob’s Park”, “Italian dinner”, “Gym / workout”, “Hang-out with friends”, “Shopping”, “Doctor”, “Lunch”, etc.).
- Once named and categorized a few times, future visits to the same location are auto-tagged with the same label and activity.
- Users can merge categories, edit slices (especially transport and flights on premium), recolor categories for visual preference, and correct mistakes.
- Unknown or new locations appear in a list at the bottom of views, waiting for assignment.

This produces the categories the user admires: Home, Sleep, Work, hang-out, dinner, lunch, workout, specific restaurants or parks, etc. The app builds a personal ontology of the user’s places and activities.

**Place knowledge depth**:
- Time spent at each place / category.
- Visit frequency and history.
- Last visit dates (“you haven’t been here in a while”).
- Patterns by day of week, month, season.
- Top locations for particular activities.
- Correlations (premium) with sleep quality when linked to Sleep Cycle.

---

## Visualizations & Recaps

**Donut / Pie Charts (the signature)**:
- Daily donut of how the day was spent.
- Weekly, monthly, yearly aggregated donuts.
- Option to dig deeper when there are many slices.
- Color-customizable so “fun” activities stand out from routine ones.
- Calendar grid of daily donuts for visual scanning of patterns.

**Weekly Journal**:
- Personalized insights and clarity on the week that just passed.
- Automatically attaches relevant photos from the user’s iCloud / camera roll that were taken during the activities or at the places.
- Notes section.
- Start-of-week reflection ritual: “Remember where you’ve been and vision where you’re going.”

**Trends & Graphs (Premium)**:
- Line charts and deeper analysis beyond the donuts.
- Compare periods: “Are you sleeping less? Working more? Walking longer?”
- Week-over-week, month-over-month, year-over-year.
- Habit flags: continuing habits vs. returning habits (e.g., “you haven’t eaten out in a long time”).

**Other views**:
- Day / week / month / year switcher for all data.
- Place detail screens with visit logs, calendars of visits, averages by day of week.
- All-time stats and top lists.

These visualizations turn raw location history into immediately understandable life insights.

---

## Integrations

- **Apple Health**: Fully integrated. Imports activities, mindfulness minutes, steps, and especially Sleep Analysis. Sleep becomes a major, accurate slice of the day.
- **Sleep Cycle** (companion app from the same company): Basic connection via Health; Premium allows deeper linking to Sleep Cycle account for insights on how daily habits affect sleep quality scores.
- **Facebook friends** (historical/social feature): Can show who you spent time with (proximity-based or check-in style social layer).
- Photos: Automatic matching of camera-roll photos to times and places for the journal.
- Export: CSV export of data for personal analysis (mentioned by users).
- Backup: Premium cloud backup so history is not lost if the device is replaced.

---

## Editing, Accuracy & User Control

- New places require initial manual naming and activity assignment; thereafter automatic.
- Users commonly review and correct slices at the end of the day or week for higher accuracy.
- Pin locations themselves are largely driven by the device’s location services; limited ability to manually drag pins in some cases.
- Accuracy depends on Significant Locations being enabled, phone being carried, and Wi-Fi/cellular quality. Occasional delays or mis-categorizations are reported, but long-term users still find the overall picture highly valuable.
- Commutes and certain categories can be toggled or refined.
- Passcode option for privacy within the app.

---

## Privacy Notes

The app emphasizes local processing and low data sharing. Historical statements indicate data stays primarily on-device (with optional Premium backup). No advertising networks or heavy third-party tracking in the core experience. Users own and can export their logs. Significant Locations is an OS feature the user can control system-wide.

---

## Overall Feel & Design Philosophy

Life Cycle feels calm, insightful, and almost magical. There is almost no friction in daily use — it just works. Opening it after a long gap and seeing a complete, beautiful visualization of the last six months produces a strong “wow” reaction. The donut charts make abstract time tangible. The automatic photo journals turn raw data into something emotional and diary-like. Health integration (especially sleep) makes the picture of a day holistic.

It prioritizes:
- Extremely low user effort after initial setup.
- Beautiful, glanceable visualizations of time allocation.
- Long-term historical continuity (the backfill / reconstruction magic).
- Categorization that matches real life (Home / Work / Sleep / social / food / exercise).
- Gentle insights rather than aggressive notifications or gamification.

It is the gold-standard reference for “automatic location-based time tracking with pie-chart recaps, place categorization, Health integration, and the ability to reconstruct history after long periods of inactivity.”

---

*This document captures the product essence, tracking mechanics, visualizations, and user experience of Life Cycle so that references to “Lifecycle-like” or “Lifecycle-style automatic tracking and recaps” are unambiguous.*
