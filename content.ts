// content.ts
// Single source of truth for all site copy. Edit here to update the site —
// no other file should hold hardcoded church content.

export const site = {
  name: "Life in Abundance Ministries",
  shortName: "Life in Abundance",
  city: "Johannesburg",
  country: "South Africa",
  tagline: "Abundance to the Full, Abundance Till it Overflows",
  anchorVerseText:
    "I have come that they may have life, and have it to the full.",
  anchorVerseRef: "John 10:10",
  url: "https://life-in-abundance-ministries.vercel.app",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "From Darkness to Light",
  headline: "Life in Abundance",
  subline: `${site.tagline} — ${site.anchorVerseRef}`,
  cta: { label: "Plan Your Visit", href: "/contact" },
  ctaSecondary: { label: "Service Times", href: "/programmes" },
};

export const mission = {
  heading: "The Promise",
  // Wording matches the church's physical signage exactly ("Walk on", not
  // "Walk in") — confirmed by the pastor. Do not "correct" this.
  statement:
    "To Cause People to See, Experience and Walk on the Abundant Life that Jesus Came to Give Us.",
  body: "Abundance is not a reward reserved for a distant day. It is the life Jesus purchased and handed to us now — in our homes, our work, our health, our relationships and our hope. Everything we do here exists to help you see that life clearly, taste it personally, and then walk in it daily.",
};

export const homeIntro = {
  eyebrow: "Welcome",
  heading: "A Church Family in the Heart of Johannesburg",
  body: "We are an ordinary congregation serving an extraordinary God. Whether you have walked with Jesus for forty years or have never opened a Bible, there is a seat here with your name on it. Come as you are — you will not be a stranger for long.",
};

// `schemaDay`, `startTime` and `endTime` feed the JSON-LD in app/layout.tsx;
// `day` and `time` are the human-facing labels shown on the signboard.
export const programmes = [
  {
    slug: "divine-service",
    day: "SUNDAY",
    schemaDay: "Sunday",
    startTime: "08:00",
    endTime: "10:00",
    title: "Divine Service",
    time: "8:00 AM – 10:00 AM",
    summary: "Our main gathering — worship, the Word, and communion as a family.",
    detail:
      "Sunday is the heartbeat of our week. We gather to worship openly, to sit under the preaching of the Word, and to be sent out strengthened. Expect lively praise, honest teaching you can carry into Monday, and prayer for anyone who needs it. Children are welcome in the service, and someone will always be at the door to help you find your feet.",
  },
  {
    slug: "healing-and-bible-study",
    day: "WEDNESDAY",
    schemaDay: "Wednesday",
    startTime: "18:30",
    endTime: "19:30",
    title: "Healing & Bible Study",
    time: "6:30 PM – 7:30 PM",
    summary: "Midweek teaching and prayer for healing — body, mind and spirit.",
    detail:
      "Midweek we slow down and go deeper. We work through Scripture together, ask real questions, and then pray specifically for healing and restoration. Many in our church point back to a Wednesday evening as the night something shifted. Bring your Bible, bring your burdens, and bring a friend.",
  },
  {
    slug: "holy-ghost-baptism",
    day: "FRIDAYS",
    schemaDay: "Friday",
    startTime: "18:30",
    endTime: "19:30",
    title: "Holy Ghost Baptism",
    time: "6:30 PM – 7:30 PM",
    summary: "Waiting on the Holy Spirit — for power, boldness and renewal.",
    detail:
      "Friday nights are set apart for the Holy Spirit. We worship, we wait, and we make room for God to fill and empower His people. If you are hungry for more of God, longing for the baptism of the Holy Spirit, or simply worn thin and needing to be refilled, this is the service for you.",
  },
];

export const whatToExpect = [
  {
    title: "You Will Be Welcomed",
    body: "Someone will greet you at the door, help you find a seat, and point you to tea afterwards. No pressure, no spotlight.",
  },
  {
    title: "Come As You Are",
    body: "Some dress up, some dress down. God is not checking your outfit and neither are we. Wear what you are comfortable in.",
  },
  {
    title: "Bring the Children",
    body: "Little ones are part of the family, not a distraction from it. You will not be the only parent with a restless toddler.",
  },
  {
    title: "About Ninety Minutes",
    body: "Sunday runs 8:00 to 10:00 with worship, the Word and prayer. Stay for tea afterwards if you can — that is where friendships start.",
  },
];

export const beliefs = [
  {
    title: "The Word of God",
    body: "We believe the Bible is the inspired, trustworthy Word of God and the final authority for what we believe and how we live.",
  },
  {
    title: "Jesus Christ",
    body: "We believe Jesus is the Son of God, crucified for our sin, risen from the dead, and returning again. Salvation is found in Him alone.",
  },
  {
    title: "The Holy Spirit",
    body: "We believe the Holy Spirit fills, gifts and empowers believers today, just as He did in the book of Acts.",
  },
  {
    title: "Healing & Wholeness",
    body: "We believe God still heals — bodies, minds, marriages and futures — and we pray boldly and expectantly for it.",
  },
  {
    title: "The Abundant Life",
    body: "We believe John 10:10 is a present-tense promise. Christ came so that His people would live full, overflowing lives.",
  },
  {
    title: "The Local Church",
    body: "We believe every believer belongs in a family. Faith is not meant to be carried alone, and neither is hardship.",
  },
];

export const shepherd = {
  heading: "The Shepherd",
  name: "Rev. Elijah Takyi Hansen",
  role: "Senior Pastor",
  // Swap in a real photograph when one becomes available — see
  // components/Shepherd.tsx for the placeholder silhouette.
  welcome:
    "Welcome home. I believe with everything in me that Jesus did not save us to leave us empty — He came so that we could live full, overflowing lives in Him. Every week I open the Word with you, I am reminded that abundance is not a distant promise but a present inheritance. Whatever season you are walking through, there is a place for you here among a family that will pray with you, grow with you, and celebrate with you. I cannot wait to welcome you in person on Sunday.",
  bio: "Rev. Elijah Takyi Hansen has given his life to pastoral ministry, teaching the Word and praying for the sick. He carries a deep conviction that the abundant life of John 10:10 is meant to be seen and experienced by ordinary people, and he leads Life in Abundance Ministries with that single aim. He preaches plainly, prays expectantly, and is known for staying long after the service to sit with whoever still needs a word.",
};

export const story = {
  heading: "Our Story",
  body: [
    "Life in Abundance Ministries was planted in Johannesburg with one conviction: that the life Jesus promised in John 10:10 was never meant to stay on the page. It was meant to be seen, experienced, and walked in by real people carrying real burdens.",
    "What began as a small gathering of believers has grown into a church family drawn from across the city — different backgrounds, different languages, one table. We are not a large ministry, and we have never tried to be. We are a family that worships honestly, prays specifically, and shows up for one another.",
    "Our doors are open three times a week, and they are open to you.",
  ],
};

export type Verse = { text: string; ref: string };

export const verses: Verse[] = [
  {
    text: "I have come that they may have life, and have it to the full.",
    ref: "John 10:10",
  },
  {
    text: "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it abundantly.",
    ref: "John 10:10 (AMP)",
  },
  {
    text: "Beloved, I pray that you may prosper in every way and that your body may keep well, even as I know that your soul keeps well and prospers.",
    ref: "3 John 1:2",
  },
  {
    text: "And my God will supply every need of yours according to his riches in glory in Christ Jesus.",
    ref: "Philippians 4:19",
  },
  {
    text: "Give, and it will be given to you. Good measure, pressed down, shaken together, running over, will be put into your lap.",
    ref: "Luke 6:38",
  },
  {
    text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.",
    ref: "Lamentations 3:22-23",
  },
  {
    text: "You make known to me the path of life; in your presence there is fullness of joy; at your right hand are pleasures forevermore.",
    ref: "Psalm 16:11",
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    ref: "Jeremiah 29:11",
  },
  {
    text: "Now to him who is able to do far more abundantly than all that we ask or think, according to the power at work within us.",
    ref: "Ephesians 3:20",
  },
  {
    text: "Blessed is the man who trusts in the Lord. He is like a tree planted by water, that sends out its roots by the stream.",
    ref: "Jeremiah 17:7-8",
  },
  {
    text: "Delight yourself in the Lord, and he will give you the desires of your heart.",
    ref: "Psalm 37:4",
  },
  {
    text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.",
    ref: "Psalm 23:1-2",
  },
  {
    text: "Every good gift and every perfect gift is from above, coming down from the Father of lights.",
    ref: "James 1:17",
  },
  {
    text: "He who did not spare his own Son but gave him up for us all, how will he not also with him graciously give us all things?",
    ref: "Romans 8:32",
  },
];

// Service schedule used by the live countdown. `day` is JS getDay():
// 0 = Sunday, 3 = Wednesday, 5 = Friday. Times are SAST (UTC+2).
export const services = [
  { day: 0, label: "Sunday", name: "Divine Service", start: "08:00", end: "10:00" },
  { day: 3, label: "Wednesday", name: "Healing & Bible Study", start: "18:30", end: "19:30" },
  { day: 5, label: "Friday", name: "Holy Ghost Baptism", start: "18:30", end: "19:30" },
] as const;

export const give = {
  heading: "Sow Into the Ministry",
  intro:
    "Every service we hold, every person we pray for, and every family we support is made possible by believers who give. Thank you for sowing into the work of the Gospel in Johannesburg.",
  reasons: [
    {
      title: "Worship, Not Transaction",
      body: "We give because God first gave. Giving is an act of worship and trust, never a payment or a price of entry.",
    },
    {
      title: "It Stays Close to Home",
      body: "Your giving keeps the doors open, the lights on, and the ministry running three nights a week for this city.",
    },
    {
      title: "Give Freely",
      body: "Give what you have purposed in your heart. No amount is too small, and nobody here is counting but God.",
    },
  ],
  bank: {
    bankName: "[BANK NAME]",
    accountName: "[ACCOUNT NAME]",
    accountNumber: "[ACCOUNT NUMBER]",
    branchCode: "[BRANCH CODE]",
  },
  reference: "Use your name and 'Offering' or 'Tithe' as the payment reference.",
  whatsappNumber: "27734095254",
  whatsappMessage:
    "Hello Life in Abundance Ministries. I have made a giving transfer and would like to confirm it. My name is: ",
};

export const contact = {
  heading: "Find Us / Join Us",
  address: "[STREET ADDRESS], Johannesburg",
  addressNote: "Full street address coming soon — call or WhatsApp us and we will guide you in.",
  phones: [
    { display: "081 400 3228", tel: "+27814003228" },
    { display: "073 409 5254", tel: "+27734095254" },
  ],
  whatsappNumber: "27734095254",
  whatsappMessage:
    "Hello Life in Abundance Ministries. I would like to know more about the church and plan a visit.",
  invitation: "You Are Invited to Join Us for Our Sunday Services.",
  mapEmbedSrc: "https://www.google.com/maps?q=Johannesburg,South+Africa&output=embed",
};

export const footer = {
  blurb:
    "A church family in Johannesburg helping people see, experience and walk on the abundant life Jesus came to give.",
  credit: "Website by Elonhub Tech",
};
