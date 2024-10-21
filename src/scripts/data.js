export const connectTexts = [
  { Text: "Establishing data-link .........", delay: 0 },
  { Text: "Signal received. Calibrating .........", delay: 40 },
  { Text: "Calibrating .........", delay: 100 },
  { Text: "Data protocols aligned!", delay: 130 },
  { Text: "Uplink stabilizing .........", delay: 170 },
  { Text: "Uplink stabilized.", delay: 200 },
  { Text: "Connection established!", delay: 230 },
  { Text: "Establishing secure encryption cipher .........", delay: 270 },
  {
    Text: "Cipher confirmed. Proceeding with verification .........",
    delay: 300,
  },
  { Text: "Authorization in progress .........", delay: 330 },
  { Text: "Verifying identity markers .........", delay: 370 },
  { Text: "Gene-code and clearance level detected .........", delay: 400 },
  { Text: "Identity confirmed. Sanctity of protocol preserved!", delay: 1150 },
  { Text: "Authorization complete!", delay: 1200 },
  {
    Text: "Access granted to mission briefing. Loading data .........",
    delay: 1600,
  },
  { Text: "Data fully retrieved!", delay: 2200 },
];

export const questions = [
  {
    question:
      "Who is the spiritual and political leader of the Imperium of Man?",
    answers: [
      "The Emperor of Mankind",
      "The Fabricator General",
      "The High Lord of Terra",
      "The Warmaster",
    ],
    correct: "The Emperor of Mankind",
  },
  {
    question:
      "Which organization serves as the secret police, hunting heretics and xenos threats?",
    answers: [
      "Adeptus Custodes",
      "Adeptus Arbites",
      "Inquisition",
      "Astra Militarum",
    ],
    correct: "Inquisition",
  },
  {
    question: "What is the purpose of the Astronomican?",
    answers: [
      "To train new Space Marines",
      "To provide a psychic beacon for Imperial ships in the warp",
      "To monitor the Imperium's resources",
      "To coordinate battles on Terra",
    ],
    correct: "To provide a psychic beacon for Imperial ships in the warp",
  },
  {
    question: "What is the Adeptus Mechanicus primarily known for?",
    answers: [
      "Maintaining and developing Imperial technology",
      "Overseeing the military operations of the Astra Militarum",
      "Training Imperial Psykers",
      "Protecting the Emperor on Terra",
    ],
    correct: "Maintaining and developing Imperial technology",
  },
  {
    question: "What is an STC, and why is it significant?",
    answers: [
      "A Sacred Text Codex, used by the Ecclesiarchy",
      "A Synthetic Technology Core, powering the Astronomican",
      "A Standard Template Construct, containing ancient technology blueprints",
      "A Shielded Tactical Chassis for Space Marines",
    ],
    correct:
      "A Standard Template Construct, containing ancient technology blueprints",
  },
  {
    question: "Which world is the home of the Adeptus Mechanicus?",
    answers: ["Terra", "Mars", "Cadia", "Fenris"],
    correct: "Mars",
  },
  {
    question: "What is the primary goal of the Orks in the galaxy?",
    answers: [
      "To conquer Terra",
      "To accumulate wealth",
      "To have fun and engage in combat",
      "To eradicate the Eldar",
    ],
    correct: "To have fun and engage in combat",
  },
  {
    question:
      "Which faction is known for its advanced psychic powers and ancient knowledge?",
    answers: [
      "Tau Empire",
      "Aeldari (Eldar)",
      "Necrons",
      "Chaos Space Marines",
    ],
    correct: "Aeldari (Eldar)",
  },
  {
    question: "Who protects the Emperor in the Imperial Palace?",
    answers: [
      "Adeptus Astartes",
      "Adeptus Custodes",
      "Astra Militarum",
      "Inquisition",
    ],
    correct: "Adeptus Custodes",
  },
  {
    question: "What is the Adeptus Astartes also known as?",
    answers: [
      "The Inquisition",
      "The Imperial Guard",
      "The Space Marines",
      "The Schola Progenium",
    ],
    correct: "The Space Marines",
  },
  {
    question: "What is the primary function of the Ecclesiarchy?",
    answers: [
      "To command the Imperial Guard",
      "To enforce the worship of the Emperor across the Imperium",
      "To train Tech-Priests",
      "To protect the Emperor on Terra",
    ],
    correct: "To enforce the worship of the Emperor across the Imperium",
  },
  {
    question: "What is the Black Library, and who guards it?",
    answers: [
      "A repository of psychic knowledge, guarded by the Harlequins",
      "A library of STCs, guarded by the Adeptus Mechanicus",
      "The training center for Imperial Assassins, guarded by the Officio Assassinorum",
      "A hall of sacred relics, guarded by the Adeptus Custodes",
    ],
    correct: "A repository of psychic knowledge, guarded by the Harlequins",
  },
];

export const successMessage = [
  "Purity confirmed. Your loyalty to the Imperium is unwavering. Proceed with your duties, loyal servant",
  "Purity verified. You are deemed loyal to the Emperor and the Imperium. Continue your service with honor.",
  "Imperial loyalty confirmed. Access to all duties and responsibilities granted. Serve the Emperor faithfully.",
  "Loyalty secured. Your allegiance to the Imperium remains unblemished. Proceed with your assigned missions.",
  "Service approval granted. Your dedication to the Imperium is unquestioned. Continue your endeavors in service of the Emperor.",
];

export const failureMessage = [
  "You have failed the test. Initiating servitor reconditioning protocols. Await further instructions.",
  "Failure detected. You are hereby reassigned to servile duties. Proceed to the nearest labor bay.",
  "Test failed. You are declared a heretic and excommunicated from the Imperium. Prepare for punitive measures.",
  "Failure confirmed. Inquisition directives activated. Await immediate processing for purging.",
  "You have failed the assessment. Prepare for confinement in a penal colony. Report to the nearest transit hub.",
];
