# Screens

## Login

As a primarily self-hosted app (similar to Immich), people will need to begin by submitting a URL (or QR code). This will dispatch a login request to that URL and prompt a user to sign-up if nothing comes back.

### Registraion

If Login fails or if someone is sent an invite link, should auto-open this app with a registration flow.

## Profile

Summarize data, access other data:

- Access / Summarize Streaks
- Access Pie Charts
- Access Friends
- Summarize by State (seemed popular in 4sq/swarm subreddits)
- Mayorships

## Settings

- Weekly Recap (Sun/Mon)
- Log Out

## Friends

Simple list of friends. Maybe a summary of what's being shared with them.

## Friend Profile

Unclear to what extend this can reuse User's profile screens.

Needs to be able to manage what's shared with friends. i.e. only share Restaurant visits.

Any desire to add friends to lists? i.e. maybe wife/kids can see more than parents can see, who can see less than close friends can see.

## Add Friend

Likely by QR Code or Link. Won't have great insight into users on other federated servers. Unclear how apps like Mastadon handle Friend Requests of people on other servers than you.

Should include or reuse a "Share Data" screen so users can control what they're sharing with whom. Default minimal/no data sharing. Should be difficult to opt-in to everything. Only sharing check-ins. Lifecycle and pathing data should not be shared (but shouldn't be precluded from being shared in the future).

## Check-in History

Timeline of their (and friends') check-ins. Includes suggested check-ins if we detect they stopped somewhere but forgot to check in.

## Location History

Might be mixing this with a Fullscreen version of the Map. Or some kind of Lifecycle display of how time is spent on some arbitrary timeline. Swarms' 2 timeline views were always a bit confusing. One looked personal and one was 'Social,' didn't make much sense. Profile view exists. Could use user feedback on this.

# Components/Features

## Map

- Check-in history (lifetime)
- Check-in history (filtered to time i.e. "this past week")
- Movement history (with pathing)
- Heat Map (longer stays = warmer, vs pop-in or drive-through visits)

## Check-in

Grabs an immediate ping and tries to reverse-lookup where someone is. If that location is wrong, that'll be harder to track. Also needs to be able to backdate check-ins.

## Backdated Checks-ins (snapshot GPS when off-grid for later check-in)

## Streaks

- 6 weeks at Fast Food restaurants

## Stickers ($)

Might be a bit on-the-nose for copying Swarm. Monetization opportunity?

## Leaderboards / Coins

A coin check-in system is a fun part of the gamification of Swarm but has some issues. It would likely _have_ to be controlled by the backend, but users can crank up or customize how coins are distributed in their self-hosted app. There's also the case where powerusers _always_ win the leaderboard by simply using the app, disincentivizing others (who always lose) to use it.

## Robust Search

One of the issues I've always had is finding a specific check-in is a nightmare. Once or twice a _year_ I want to find a specific date I checked in to some location and it's effectively impossible to search for. By far the most successful method of searching is to pull up the map and find the place then I'll have access to all visit there. But if I don't recall where on the map it was and only recall it was "Summer 2015" then good luck finding it.

# Data

## Check-ins

Check-ins or proposed check-ins should be saved to their own table. This would include: Confirmed Check-ins, Suggested Check-ins (we detected they puased somewhere), and Offline Check-ins (snapshot GeoLocation).

## Check-in Confirmations

- "You haven't been here since January 1970"

## Pathing / Movements

Should be able to recreate movement history, such as for a weekly recap of movements.

## Ingestion

Should be able to import Swarm, Lifecycle, Google Maps data to backdate location history.

# Backend Considerations

- Login Flow/Registration Flow
- Gamification control over Coins
- Data Upload/Ingestion to parse Swarm/Yelp/LifeCycle/Google Maps/Facebookd data

# Approach

Multiple screens have been laid out here. As a rough approximation, let's try to determine what units of work we can begin on:

1. Boilerplate a bottom NavBar + Check-in Button
1. Check-in Page (Rough) (Create)

- Confirm Check-in Screen (Coins, Streaks, Similar Visits, Last Visit, etc)

1. Check-ins List Page (Read)
1. Delete Check-in (Delete)
1. Profile View
