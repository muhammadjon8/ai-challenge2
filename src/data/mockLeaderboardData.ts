import type { ListUser, Activity } from '../components/LeaderboardList';

const firstNamesMen = [
  "Alexander", "Dmitry", "Ivan", "Sergey", "Mikhail", "Andrey", "Pavel", "Alexey",
  "James", "Michael", "Robert", "David", "William", "Richard", "Joseph", "Thomas",
  "Artem", "Nikita", "Vladimir", "Igor", "Maxim", "Denis", "Yury", "Kirill"
];

const firstNamesWomen = [
  "Elena", "Maria", "Olga", "Tatiana", "Natalya", "Svetlana", "Anna", "Irina",
  "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Susan", "Jessica", "Sarah",
  "Victoria", "Anastasia", "Ksenia", "Daria", "Yulia", "Ekaterina", "Alina", "Polina"
];

const lastNames = [
  "Ivanov", "Petrov", "Sidorov", "Smith", "Johnson", "Williams", "Brown", "Jones",
  "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor",
  "Kuznetsov", "Popov", "Sokolov", "Lebedev", "Kozlov", "Novikov", "Morozov", "Volkov",
  "Solovyov", "Vasiliev", "Zaytsev", "Pavlov", "Semenov", "Golubev", "Vinogradov", "Bogdanov"
];

const titles = [
  "Senior Software Engineer", "Group Manager", "Lead QA Engineer", "Software Engineer",
  "Senior QA Engineer", "Project Manager", "Delivery Manager", "Lead Software Engineer",
  "Solutions Architect", "DevOps Engineer", "UI/UX Designer", "Business Analyst"
];

const departments = [
  "Entertainment", "Software Quality", "Data Analytics", "Cloud Infrastructure",
  "Product Design", "Mobile Development", "Platform Services", "Customer Success",
  "Research & Innovation", "Security Operations"
];

const activityTemplates = [
  { name: "Coached new team members in ", category: "Education", points: 64 },
  { name: "Led workshop on ", category: "Education", points: 16 },
  { name: "Guest lecture at ", category: "University Partnership", points: 32 },
  { name: "Presented findings on ", category: "Public Speaking", points: 24 },
  { name: "Hosted knowledge session: ", category: "Public Speaking", points: 12 },
  { name: "Organized open day at ", category: "University Partnership", points: 20 }
];

const generateMockData = (count: number): ListUser[] => {
  const users: ListUser[] = [];
  
  for (let i = 1; i <= count; i++) {
    const isMan = Math.random() > 0.5;
    const firstName = isMan 
      ? firstNamesMen[Math.floor(Math.random() * firstNamesMen.length)]
      : firstNamesWomen[Math.floor(Math.random() * firstNamesWomen.length)];
    const lastNameBase = lastNames[Math.floor(Math.random() * lastNames.length)];
    // Append 'a' for women if it's a Russian-style name
    const lastName = (!isMan && (lastNameBase.endsWith('ov') || lastNameBase.endsWith('in') || lastNameBase.endsWith('ev'))) 
      ? lastNameBase + 'a' 
      : lastNameBase;
    const name = `${firstName} ${lastName}`;
    
    const avatarNum = Math.floor(Math.random() * 99) + 1;
    const gender = isMan ? "men" : "women";
    const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${avatarNum}.jpg`;
    
    const numActivities = Math.floor(Math.random() * 5) + 1; // 1 to 5 activities
    const userActivities: Activity[] = [];
    let totalScore = 0;
    
    const months = [
      { name: "Jan", q: "Q1" }, { name: "Feb", q: "Q1" }, { name: "Mar", q: "Q1" },
      { name: "Apr", q: "Q2" }, { name: "May", q: "Q2" }, { name: "Jun", q: "Q2" },
      { name: "Jul", q: "Q3" }, { name: "Aug", q: "Q3" }, { name: "Sep", q: "Q3" },
      { name: "Oct", q: "Q4" }, { name: "Nov", q: "Q4" }, { name: "Dec", q: "Q4" }
    ];

    for (let j = 0; j < numActivities; j++) {
      const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
      const monthObj = months[Math.floor(Math.random() * months.length)];
      const activity: Activity = {
        id: `a-${i}-${j}`,
        name: `${template.name} ${template.category === "Education" ? "newcomers" : "session " + (j + 1)}`,
        category: template.category,
        date: `${Math.floor(Math.random() * 28) + 1}-${monthObj.name}-2025`,
        quarter: monthObj.q,
        points: template.points
      };
      userActivities.push(activity);
      totalScore += activity.points;
    }

    // Derive counts directly from the actual activities
    const eduCount = userActivities.filter(a => a.category === "Education").length;
    const speakCount = userActivities.filter(a => a.category === "Public Speaking").length;
    const uniCount = userActivities.filter(a => a.category === "University Partnership").length;
    
    users.push({
      id: i.toString(),
      rank: i, // Will sort later
      name,
      title: `${titles[Math.floor(Math.random() * titles.length)]} — ${departments[Math.floor(Math.random() * departments.length)]}`,
      avatarUrl,
      initials: firstName[0] + lastName[0],
      score: totalScore,
      educationCount: eduCount > 0 ? eduCount : undefined,
      presentationCount: speakCount > 0 ? speakCount : undefined,
      smileCount: uniCount > 0 ? uniCount : undefined,
      activities: userActivities
    });
  }
  
  // Sort by score descending and assign rank
  return users.sort((a, b) => b.score - a.score).map((user, index) => ({
    ...user,
    rank: index + 1
  }));
};

export const mockLeaderboardData = generateMockData(150);
