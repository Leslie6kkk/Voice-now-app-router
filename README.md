# Voting App - VoiceNow!

## Overview

This Voting App allows users to create and participate in voting events. The app ensures secure user authentication, allows users to vote based on a unique event link or ID, and provides real-time voting results. It is designed with simplicity, focusing on core functionalities while ensuring a smooth user experience.

## Features

- **User Authentication**:
  - Users can sign up and log in with an email and password.
  - Session management ensures users remain logged in across sessions.

- **Poll Creation**:
  - Users can create a poll with a name, description, and multiple choices.

- **Voting System**:
  - Users can vote on a poll using a unique link or event ID.
  - Each user can vote only once per event.

- **Real-time Voting Results**:
  - Results are displayed immediately after a vote is cast.

- **Basic Dashboard**:
  - Users can view polls they have created or participated in.

### Bonus Features (Not Implemented)
- Customized voting events with options for:
  - Shuffle choices.
  - Set vote ending time.
  - Restrict voting to selected participants.
  - Support for single-choice and multiple-choice polls.
  - Selection vs. comment-based polls.
- Email notifications to event participants once voting ends.
- Google account signup and login integration.
- Containerization and deployment using Docker/Kubernetes.

## Tech Stack

- **Frontend/Backend**: [Next.js](https://nextjs.org/)
  - Used both as the frontend framework and for handling API routes.
  - **App Router**:
    - Chosen for its support for nested routes, layouts, and server-side components.

- **Database**: [PostgreSQL](https://www.postgresql.org/)
  - PostgreSQL was chosen for its scalability and performance.
  - Managed via [Prisma](https://www.prisma.io/) ORM for simplified database queries and migrations.

- **ORM**: [Prisma](https://www.prisma.io/)
  - Prisma was used as the ORM to manage the database schema and handle interactions with PostgreSQL.

