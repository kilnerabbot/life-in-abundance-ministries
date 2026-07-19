// content.ts
// Single source of truth for all site copy. Edit here to update the site —
// no other file should hold hardcoded church content.

export const site = {
  name: "Life in Abundance Ministries",
  shortName: "LIAM",
  city: "Johannesburg",
  country: "South Africa",
  tagline: "Abundance to the Full, Abundance Till it Overflows",
  anchorVerseText:
    "I have come that they may have life, and have it to the full.",
  anchorVerseRef: "John 10:10",
  url: "https://liam-church.vercel.app",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Programmes", href: "#programmes" },
  { label: "About", href: "#about" },
  { label: "Give", href: "#give" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "From Darkness to Light",
  headline: "Life in Abundance",
  subline: `${site.tagline} — ${site.anchorVerseRef}`,
};

export const promise = {
  heading: "The Promise",
  statement:
    "To Cause People to See, Experience and Walk in the Abundant Life that Jesus Came to Give Us.",
};

export const programmes = [
  {
    day: "SUNDAY",
    title: "Divine Service",
    time: "8:00 AM – 10:00 AM",
  },
  {
    day: "WEDNESDAY",
    title: "Healing & Bible Study",
    time: "6:30 PM – 7:30 PM",
  },
  {
    day: "FRIDAYS",
    title: "Holy Ghost Baptism",
    time: "6:30 PM – 7:30 PM",
  },
];

export const shepherd = {
  heading: "The Shepherd",
  name: "Rev. Elijah Takyi Hansen",
  role: "Senior Pastor, Life in Abundance Ministries",
  // NOTE: swap the SVG silhouette avatar in components/Shepherd.tsx for a
  // real photograph when one becomes available. Keep the same dimensions.
  welcome:
    "Welcome home. I believe with everything in me that Jesus did not save us to leave us empty — He came so that we could live full, overflowing lives in Him. Every week I open the Word with you, I am reminded that abundance is not a distant promise but a present inheritance. Whatever season you are walking through, there is a place for you here among a family that will pray with you, grow with you, and celebrate with you. I cannot wait to welcome you in person on Sunday.",
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
    text: "Blessed is the man who trusts in the Lord... He is like a tree planted by water, that sends out its roots by the stream.",
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

export const services = [
  { day: 0, label: "Sunday", name: "Divine Service", start: "08:00", end: "10:00" },
  { day: 3, label: "Wednesday", name: "Healing & Bible Study", start: "18:30", end: "19:30" },
  { day: 5, label: "Friday", name: "Holy Ghost Baptism", start: "18:30", end: "19:30" },
] as const;

export const give = {
  heading: "Sow Into the Ministry",
  intro:
    "Your giving fuels the work of the Gospel in Johannesburg and beyond. Thank you for sowing into abundant life.",
  bank: {
    bankName: "[BANK NAME]",
    accountName: "[ACCOUNT NAME]",
    accountNumber: "[ACCOUNT NUMBER]",
    branchCode: "[BRANCH CODE]",
  },
  whatsappNumber: "27734095254",
  whatsappMessage:
    "Hi Life in Abundance Ministries, I have just made a giving/offering transfer and would like to confirm it. My name is: ",
};

export const contact = {
  heading: "Find Us / Join Us",
  address: "[STREET ADDRESS], Johannesburg",
  phones: ["+27814003228", "+27734095254"],
  whatsappNumber: "27734095254",
  whatsappMessage: "Hi Life in Abundance Ministries, I would like to know more about the church.",
  invitation: "You Are Invited to Join Us for Our Sunday Services.",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Johannesburg,South+Africa&output=embed",
};

export const footer = {
  credit: "Website by Elonhub Tech",
};
