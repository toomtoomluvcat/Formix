
//คำตอบที่ส่งมา
const userList = [
  { id: 1, type: "text", answer: ["Red"] },
  { id: 3, type: "check", answer: ["Reading"] },
  { id: 50, type: "number", answer: ["15"] },
  { id: 4, type: "dropdown", answer: ["Banana,apple"] },
  { id: 5, type: "radio", answer: ["Cat"] },
  { id: 6, type: "dropdown", answer: ["Car"] },
  { id: 7, type: "check", answer: ["Java", "Python"] },
  { id: 8, type: "number", answer: ["1554"] },
  { id: 9, type: "radio", answer: ["Yes"] },
  { id: 10, type: "radio", answer: ["Drama"] },
  { id: 11, type: "text", answer: ["toom"] },
  { id: 12, type: "text", answer: ["kritsada.ba@kkumail.com"] },
  { id: 13, type: "radio", answer: ["Yes, please"] },
  { id: 14, type: "check", answer: ["France"] },
  { id: 15, type: "number", answer: ["12544"] },
  { id: 16, type: "radio", answer: ["Tennis"] },
  { id: 17, type: "check", answer: ["Twitter", "LinkedIn"] },
  { id: 18, type: "dropdown", answer: ["High School"] },
  { id: 19, type: "number", answer: ["45456456"] },
  { id: 20, type: "radio", answer: ["Definitely"] },
];

//คำถามที่สร้างไว้
const quesionList = [
  {
    id: 1,
    title: "What is your favorite color?",
    type: "text",
    required: true,
  },
  {
    id: 3,
    title: "Select your hobbies",
    type: "check",
    required: false,
    options: [
      { labelChoice: "Reading", limitAns: null },
      { labelChoice: "Traveling", limitAns: null },
      { labelChoice: "Cooking", limitAns: null },
      { labelChoice: "Gaming", limitAns: null },
      { labelChoice: "Photography", limitAns: null },
    ],
  },
  {
    id: 50,
    title: "How old are you?",
    type: "number",
    required: true,
  },
  {
    id: 4,
    title: "Select your favorite fruit",
    type: "dropdown",
    required: false,
    options: [
      { labelChoice: "Apple", limitAns: null },
      { labelChoice: "Banana", limitAns: null },
      { labelChoice: "Orange", limitAns: null },
      { labelChoice: "Grapes", limitAns: null },
      { labelChoice: "Pineapple", limitAns: null },
    ],
  },
  {
    id: 5,
    title: "Choose your favorite pets",
    type: "radio",
    required: true,
    options: [
      { labelChoice: "Dog", limitAns: 1 },
      { labelChoice: "Cat", limitAns: 1 },
      { labelChoice: "Rabbit", limitAns: 1 },
      { labelChoice: "Hamster", limitAns: 1 },
      { labelChoice: "Bird", limitAns: 1 },
    ],
  },
  {
    id: 6,
    title: "What is your preferred mode of transport?",
    type: "dropdown",
    required: false,
    options: [
      { labelChoice: "Car", limitAns: null },
      { labelChoice: "Bicycle", limitAns: null },
      { labelChoice: "Bus", limitAns: null },
      { labelChoice: "Train", limitAns: null },
      { labelChoice: "Walk", limitAns: null },
    ],
  },
  {
    id: 7,
    title: "Which programming languages do you know?",
    type: "check",
    required: true,
    options: [
      { labelChoice: "JavaScript", limitAns: null },
      { labelChoice: "Python", limitAns: null },
      { labelChoice: "Java", limitAns: null },
      { labelChoice: "C++", limitAns: null },
      { labelChoice: "Go", limitAns: null },
    ],
  },
  {
    id: 8,
    title: "Rate your experience with our service",
    type: "number",
    required: true,
  },
  {
    id: 9,
    title: "Do you like our website design?",
    type: "radio",
    required: true,
    options: [
      { labelChoice: "Yes", limitAns: 1 },
      { labelChoice: "No", limitAns: 1 },
    ],
  },
  {
    id: 10,
    title: "What kind of movies do you prefer?",
    type: "radio",
    required: false,
    options: [
      { labelChoice: "Action", limitAns: null },
      { labelChoice: "Comedy", limitAns: null },
      { labelChoice: "Drama", limitAns: null },
      { labelChoice: "Horror", limitAns: null },
      { labelChoice: "Romance", limitAns: null },
      { labelChoice: "Sci-Fi", limitAns: null },
    ],
  },
  {
    id: 11,
    title: "What is your full name?",
    type: "text",
    required: true,
  },
  {
    id: 12,
    title: "What is your email address?",
    type: "text",
    required: true,
  },
  {
    id: 13,
    title: "Would you like to receive our newsletter?",
    type: "radio",
    required: false,
    options: [
      { labelChoice: "Yes, please", limitAns: 1 },
      { labelChoice: "No, thanks", limitAns: 1 },
    ],
  },
  {
    id: 14,
    title: "Select the countries you have visited",
    type: "check",
    required: false,
    options: [
      { labelChoice: "USA", limitAns: null },
      { labelChoice: "France", limitAns: null },
      { labelChoice: "Japan", limitAns: null },
      { labelChoice: "Italy", limitAns: null },
      { labelChoice: "Thailand", limitAns: null },
      { labelChoice: "India", limitAns: null },
    ],
  },
  {
    id: 15,
    title: "How satisfied are you with our product?",
    type: "number",
    required: true,
  },
  {
    id: 16,
    title: "What is your favorite sport?",
    type: "radio",
    required: true,
    options: [
      { labelChoice: "Football", limitAns: 1 },
      { labelChoice: "Basketball", limitAns: 1 },
      { labelChoice: "Tennis", limitAns: 1 },
      { labelChoice: "Swimming", limitAns: 1 },
      { labelChoice: "Running", limitAns: 1 },
    ],
  },
  {
    id: 17,
    title: "Which social media platforms do you use?",
    type: "check",
    required: false,
    options: [
      { labelChoice: "Facebook", limitAns: null },
      { labelChoice: "Instagram", limitAns: 7 },
      { labelChoice: "Twitter", limitAns: 6 },
      { labelChoice: "LinkedIn", limitAns: null },
      { labelChoice: "TikTok", limitAns: null },
    ],
  },
  {
    id: 18,
    title: "What is your highest level of education?",
    type: "dropdown",
    required: true,
    options: [
      { labelChoice: "High School", limitAns: 5 },
      { labelChoice: "Bachelor's Degree", limitAns: 8 },
      { labelChoice: "Master's Degree", limitAns: 9 },
      { labelChoice: "PhD", limitAns: null },
      { labelChoice: "Other", limitAns: null },
    ],
  },
  {
    id: 19,
    title: "How many hours do you spend online per day?",
    type: "number",
    required: true,
  },
  {
    id: 20,
    title: "Would you recommend our service to others?",
    type: "radio",
    required: true,
    options: [
      { labelChoice: "Definitely", limitAns: 1 },
      { labelChoice: "Maybe", limitAns: 1 },
      { labelChoice: "Not sure", limitAns: 1 },
      { labelChoice: "No", limitAns: 1 },
    ],
  },
];

//สร้าง dic ที่มี key เป็น id จะได้ตรงกับคำถามทั้งคำตอบ
const answerVisualList = Object.fromEntries(
  quesionList
    .filter((item) => item.options)
    .map((item) => [
      item.id,
      item.options?.map((choice) => {
        return { name: choice.labelChoice, value: 0 };
      }),
    ])
);

//ตัดช้อย  text กับ number ออกไปตรงนี้นะจ้ะ
const responeList = userList.filter(
  (item) => item.type !== "number" && item.type !== "text"
);

//เอาคำตอบมาเพิ่มในคำถาม
for (let i = 0; i < responeList.length; i++) {
  answerVisualList[responeList[i].id] = answerVisualList[responeList[i].id].map((item) => {
    return responeList[i].answer.includes(item.name)
      ? { ...item, value: item.value + 1 }
      : item;
  });
}

//create by toomtam 
console.log(answerVisualList);
