/* =====================================================================
   WEDDING DETAILS — edit this file to update the website.
   ---------------------------------------------------------------------
   Everything guests see that is likely to change (names, schedule,
   announcements, FAQ, travel agent info) lives here. Save, commit,
   and push — GitHub Pages republishes in a minute or two.

   Tips:
   - Keep the quotes and commas exactly as they are around your text.
   - Leave a value as "" (empty) to hide that item on the site.
   ===================================================================== */

window.WEDDING = {
  // ---- The two of you -------------------------------------------------
  couple: {
    one: "Tanner Bessinger",
    two: "Madison Parenti",
  },

  // Ceremony start, in resort local time. Quintana Roo is UTC-5 all year
  // (no daylight saving), so keep the "-06:00" on the end.
  ceremonyStart: "2028-04-13T17:00:00-06:00",
  dateText: "Thursday, April 13, 2028",
  hashtag: "",                   // e.g. "#SaidYesInXpuHa" — leave "" to hide

  // ---- Announcements (newest first) -----------------------------------
  // These show in the "Latest Updates" section. Add a new entry at the top.
  updates: [
    {
      date: "2026-11-14",
      title: "Our wedding website is live!",
      text: "Bookmark this page — we'll post schedule changes, room-block details, and reminders here as the big day gets closer.",
    },
  ],

  // ---- Schedule -------------------------------------------------------
  // Times are drafts. Set tentative: false once something is confirmed.
  schedule: [
    /*{
      day: "Wednesday, April 12, 2028",
      label: "Arrival Day",
      events: [
        { time: "3:00 PM", title: "Resort Check-In", place: "Barceló Maya Riviera lobby", note: "Standard check-in time. Early check-in is subject to availability.", tentative: false },
        { time: "7:00 PM", title: "Welcome Drinks", place: "Location TBA", note: "Casual and relaxed — come say hi after your travels!", tentative: true },
      ],
    },*/
    {
      day: "Thursday, April 13, 2028",
      label: "Wedding Day",
      highlight: true,
      events: [
        { time: "5:00 PM", title: "Ceremony", place: "Beachfront gazebo (TBA)", note: "Please arrive 15 minutes early. Sunset is around 7:30 PM.", tentative: true },
        { time: "5:45 PM", title: "Private Dinner Reception & Open Bar", place: "Banquet Room (TBA)", note: "", tentative: true },
        //{ time: "7:00 PM", title: "Dinner & Reception", place: "Location TBA", note: "Dinner, toasts, and dancing under the stars.", tentative: true },
      ],
    },
    /*{
      day: "Friday, April 14, 2028",
      label: "The Morning After",
      events: [
        { time: "10:00 AM", title: "Farewell Brunch", place: "Location TBA", note: "Optional — one last hangout before folks start heading home.", tentative: true },
      ],
    },*/
  ],

  // ---- Travel agent ---------------------------------------------------
  agent: {
    name: "Mandy Kester",
    company: "Magnolia Travel Destinations",
    email: "tripswithmandy@gmail.com",
    phone: "",                   // TODO: e.g. "(555) 123-4567" — the Call button appears once filled in
    website: "https://magnoliatraveldestinations.godaddysites.com",
    bookBy: "",                  // e.g. "October 1, 2027" — room-block deadline, leave "" to hide
    blurb: "Mandy is handling our room block and can help with flights, airport transfers, and any excursions you want to add on. Booking through her is the easiest way to make sure you're in our group and get the group rate.",
  },

  // ---- RSVP -----------------------------------------------------------
  rsvp: {
    deadline: "",                // e.g. "January 15, 2028"
    link: "",                    // e.g. a Google Form URL — the RSVP button appears once filled in
  },

  // ---- FAQ ------------------------------------------------------------
  faq: [
    { q: "Can I bring my kids?", a: "Barceló Maya Riviera is an adults-only resort, so all guests staying there must be 18 or older. We love your little ones, but this one is a grown-ups' getaway!" },
    { q: "Do I need a passport?", a: "Yes. You'll need a valid passport to fly to Mexico. Check that yours doesn't expire before your trip — and if you need a new one, apply early, as processing can take months." },
    { q: "Which airport do I fly into?", a: "Cancún International Airport (CUN). The resort is about 80 km (50 miles) south, roughly a 1 hour 15 minute drive. Mandy can arrange airport transfers for you." },
    { q: "What should I wear?", a: "Beach formal / tropical cocktail attire. Think light fabrics and bright colors — sundresses, linen shirts and slacks. The ceremony is on the sand, so skip the stilettos!" },
    { q: "What's the weather like in April?", a: "Warm and sunny — typically highs in the mid-80s °F (around 30 °C) and lows in the low 70s. Bring sunscreen (reef-safe is best), sunglasses, and a light layer for the evening." },
    { q: "Do I need to bring cash?", a: "The resort is all-inclusive, so food and drinks are covered. A little cash (US dollars or Mexican pesos) is handy for tips, excursions, and shopping." },
    { q: "Do I have to stay at the resort?", a: "In order to attend and have access to the wedding, you will need to book a stay at either the Barceló Maya Riviera or the Barceló Maya Palace." },
  ],

  // ---- Our Story page (our-story.html) --------------------------------
  story: {
    secondsPerPhoto: 3,
    // The slideshow plays these in order, then loops back to the first.
    // To add a photo: resize it and put it in images/story/, then add a line.
    // (Don't link the originals in images/ — they're huge and contain GPS data.)
    photos: [
      "images/story/IMG_0081.jpg",
      "images/story/IMG_0622.jpg",
      "images/story/IMG_0702.jpg",
      "images/story/IMG_1575.jpg",
      "images/story/IMG_1576.jpg",
      "images/story/IMG_1679.jpg",
      "images/story/IMG_1934.jpg",
      "images/story/IMG_2083.jpg",
      "images/story/IMG_2144.jpg",
      "images/story/IMG_2714.jpg",
      "images/story/IMG_3475.jpg",
      "images/story/IMG_4148.jpg",
      "images/story/IMG_4529.jpg",
      "images/story/IMG_5622.jpg",
      "images/story/IMG_7305.jpg",
      "images/story/IMG_7842.jpg",
      "images/story/IMG_7893.jpg",
      "images/story/IMG_8047.jpg",
      "images/story/IMG_8662.jpg",
      "images/story/IMG_9005.jpg",
      "images/story/IMG_9041.jpg",
      "images/story/IMG_9932.jpg",
    ],
    // Your story — each "..." is its own paragraph. Add as many as you like.
    paragraphs: [
      "Our story is coming soon! Check back to read how we met, our first date, and how the proposal happened.",
    ],
  },
};
