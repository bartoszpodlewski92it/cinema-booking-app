# DevCinema - Cinema Seat Booking Application

A web application built with Next.js 15 (App Router), React, and Tailwind CSS for booking cinema seats.

## Technical Stack
- Framework: Next.js 15 (App Router) with TypeScript
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useEffect, useMemo)

## Features
- Dynamic Routing: URL-based state transfer using nested routes (/booking/[movieId]/[showTime]/checkout).
- Interactive Seat Grid: Theater map with real-time seat status selection (Available, Selected, Occupied).
- Data Sanitation: Centralized utility function (formatShowtime) to handle showtime decoding between URLs and UI layers.
- Form Validation: Client-side validation with regex pattern matching for user name and email input fields.
- Success State: Custom feedback view handled by internal component state upon successful form submission.

## Project Structure
```text
├── app/
│   ├── booking/
│   │   └── [movieId]/
│   │       └── [showTime]/
│   │           ├── checkout/
│   │           │   └── page.tsx      # Checkout page component
│   │           └── page.tsx          # Seat selection page component
│   ├── data/
│   │   └── movies.ts                 # Mock database file
│   ├── utils/
│   │   └── format.ts                 # Showtime formatting utility
│   ├── layout.tsx
│   └── page.tsx                      # Main movie catalog dashboard
└── components/                       # Reusable UI components
    ├── BookingHeader.tsx
    ├── CheckoutForm.tsx
    ├── Legend.tsx
    ├── LoadingState.tsx
    ├── OrderSummary.tsx
    ├── Screen.tsx
    ├── SeatButton.tsx
    ├── SeatGrid.tsx
    └── SummaryBar.tsx
```

## Installation and Setup

1. Clone the repository:
git clone <repository-url>

2. Install dependencies:
npm install

3. Run the development server:
npm run dev