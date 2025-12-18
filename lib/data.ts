// Shared data for the application

export const cardGradients = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
  'from-cyan-500 to-cyan-600',
  'from-teal-500 to-teal-600',
  'from-emerald-500 to-emerald-600',
  'from-violet-500 to-violet-600',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-amber-600',
  'from-orange-500 to-orange-600',
  'from-lime-500 to-lime-600',
  'from-sky-500 to-sky-600',
  'from-fuchsia-500 to-fuchsia-600',
  'from-red-500 to-red-600',
  'from-green-500 to-green-600',
  'from-yellow-500 to-yellow-600',
  'from-blue-400 to-purple-500',
]

export type SubjectKey =
  | 'medicine'
  | 'law'
  | 'engineering'
  | 'education'
  | 'accounting'
  | 'it'
  | 'electricity'
  | 'chef'

export const SUBJECTS: SubjectKey[] = [
  'medicine',
  'law',
  'engineering',
  'education',
  'accounting',
  'it',
  'electricity',
  'chef',
]

export const subjectLabels: Record<'ka' | 'en', Record<SubjectKey, string>> = {
  ka: {
    medicine: 'მედიცინა',
    law: 'სამართალი',
    engineering: 'ინჟინერია',
    education: 'სამასწავლებლო',
    accounting: 'ბუღალტერია',
    it: 'IT',
    electricity: 'ელექტროობა',
    chef: 'მზარეული',
  },
  en: {
    medicine: 'Medicine',
    law: 'Law',
    engineering: 'Engineering',
    education: 'Education',
    accounting: 'Accounting',
    it: 'IT',
    electricity: 'Electricity',
    chef: 'Chef',
  },
}

export const ALL_SUBJECTS = 'all' as const
export type AllSubjects = typeof ALL_SUBJECTS

export function getSubjectLabel(key: SubjectKey, lang: 'ka' | 'en') {
  return subjectLabels[lang][key]
}

export function subjectKeyFor(id: number): SubjectKey {
  return SUBJECTS[(Math.abs(id) - 1) % SUBJECTS.length]
}

export type Tutor = {
  id: number
  name: string
  subject: string
  price: number
  experience: number
  phone: string
}

type RawTutor = Omit<Tutor, 'subject'>

const rawTutors: RawTutor[] = [
  { id: 1, name: 'ნინო გელაშვილი', price: 35, experience: 8, phone: '+995 599 123 456' },
  { id: 2, name: 'გიორგი მამედოვი', price: 55, experience: 7, phone: '+995 592 234 567' },
  { id: 3, name: 'სალომე ბერიძე', price: 30, experience: 5, phone: '+995 598 345 678' },
  { id: 4, name: 'ლუკა ჩხაიძე', price: 40, experience: 9, phone: '+995 551 456 789' },
  { id: 5, name: 'მარიამი კვარაცხელია', price: 45, experience: 6, phone: '+995 595 567 890' },
  { id: 6, name: 'ანა მელაძე', price: 28, experience: 4, phone: '+995 599 678 901' },
  { id: 7, name: 'დავით ნადარაია', price: 65, experience: 10, phone: '+995 592 789 012' },
  { id: 8, name: 'თეკლა ჯაფარიძე', price: 32, experience: 3, phone: '+995 598 890 123' },
  { id: 9, name: 'ლაშა ხარაძე', price: 42, experience: 7, phone: '+995 551 901 234' },
  { id: 10, name: 'თამარ კაპანაძე', price: 27, experience: 2, phone: '+995 595 012 345' },
  { id: 11, name: 'ნიკა გოგიძე', price: 58, experience: 9, phone: '+995 599 123 789' },
  { id: 12, name: 'ელენე ბერიძე', price: 25, experience: 3, phone: '+995 592 234 890' },
  { id: 13, name: 'თორნიკე მიქაძე', price: 38, experience: 5, phone: '+995 598 345 901' },
  { id: 14, name: 'ლილე კვარაცხელია', price: 33, experience: 4, phone: '+995 551 456 012' },
  { id: 15, name: 'ალექსანდრე ჩხაიძე', price: 50, experience: 8, phone: '+995 595 567 123' },
  { id: 16, name: 'ანასტასია გელაშვილი', price: 48, experience: 6, phone: '+995 599 678 234' },
  { id: 17, name: 'ირაკლი ხარაძე', price: 52, experience: 7, phone: '+995 592 789 345' },
  { id: 18, name: 'ეკატერინე მიქაძე', price: 36, experience: 4, phone: '+995 598 890 456' },
]

export const mockTutors: Tutor[] = rawTutors.map((tutor) => ({
  ...tutor,
  subject: subjectLabels.ka[subjectKeyFor(tutor.id)],
}))

export type Student = {
  id: number
  name: string
  subject: string
  goal: string
  phone: string
}

type RawStudent = Omit<Student, 'subject'>

const rawStudents: RawStudent[] = [
  { id: 1, name: 'ლუკა მელაძე', goal: 'მინდა გავიუმჯობესო მათემატიკაში და მოვემზადო ერთიანი ეროვნული გამოცდისთვის', phone: '+995 599 111 222' },
  { id: 2, name: 'ანა ბერიძე', goal: 'საჭიროა ინგლისურის შესწავლა IELTS გამოცდისთვის', phone: '+995 592 222 333' },
  { id: 3, name: 'ნიკა ხარაძე', goal: 'მინდა ვისწავლო Python პროგრამირება დასაწყისიდან', phone: '+995 598 333 444' },
  { id: 4, name: 'მარიამი გელაშვილი', goal: 'საჭიროა დახმარება ფიზიკის საშინაო დავალებებში', phone: '+995 551 444 555' },
  { id: 5, name: 'დავით კვარაცხელია', goal: 'მინდა გავიუმჯობესო ქიმიაში და მოვემზადო უნივერსიტეტისთვის', phone: '+995 595 555 666' },
  { id: 6, name: 'თამარ მამედოვი', goal: 'საჭიროა დახმარება ბიოლოგიის სასკოლო პროგრამაში', phone: '+995 599 666 777' },
  { id: 7, name: 'ნათია სიგუა', goal: 'ვემზადები სამართლის უნარ-ჩვევების შესასწავლად', phone: '+995 599 777 888' },
  { id: 8, name: 'დემნა წიკლაური', goal: 'მინდა დავხვეწო კულინარიული ტექნიკები და უსაფრთხოების სტანდარტები', phone: '+995 592 123 456' },
]

export const mockStudents: Student[] = rawStudents.map((student) => ({
  ...student,
  subject: subjectLabels.ka[subjectKeyFor(student.id)],
}))

export const subjectStudentGoals: Record<'ka' | 'en', Record<SubjectKey, string>> = {
  ka: {
    medicine: 'მინდა მოვემზადო მედიცინის შესავლისთვის და კლინიკური აზროვნებისთვის.',
    law: 'ვემზადები სამართლის საბაზისო კურსებისთვის და კეისების ანალიზისთვის.',
    engineering: 'მჭირდება ინჟინერიაში პროექტზე მუშაობის მხარდაჭერა და პრობლემების გადაჭრის უნარები.',
    education: 'ვამზადებ სასწავლო გეგმას და მინდა ეფექტური სწავლების მეთოდები.',
    accounting: 'მინდა საფუძვლიანად ვისწავლო ბუღალტერია და ფინანსური ანგარიშგება.',
    it: 'ვიწყებ IT მიმართულებით და მჭირდება პრაქტიკული დავალებები და კარიერული რჩევები.',
    electricity: 'ელექტროობის საბაზისო სქემები და უსაფრთხოების წესები მინდა კარგად ავითვისო.',
    chef: 'ვარ ინტერესებული მზარეულობაში და მსურს რეცეპტების, ტექნიკების და ჰიგიენის სწავლა.',
  },
  en: {
    medicine: 'I want to prepare for introductory medicine and clinical reasoning.',
    law: 'I am preparing for foundational law courses and case analysis.',
    engineering: 'I need support for an engineering project and problem-solving skills.',
    education: 'I am building a lesson plan and want effective teaching methods.',
    accounting: 'I want a solid base in accounting and financial reporting.',
    it: 'I am starting in IT and need practical tasks plus career guidance.',
    electricity: 'I want to master basic electrical circuits and safety.',
    chef: 'I am passionate about cooking and want recipes, techniques, and hygiene best practices.',
  },
}

export const chatbotResponses: { [key: string]: string } = {
  'გამარჯობა': 'გამარჯობა! როგორ შემიძლია დაგეხმაროთ მასწავლებლის პოვნაში?',
  'სალამი': 'გამარჯობა! მოხარული ვარ, რომ დაგეხმარებით. რა საგანში გჭირდებათ მასწავლებელი?',
  'მასწავლებელს': 'შეგიძლიათ დაუკავშირდეთ მასწავლებელს პირდაპირ მისი პროფილიდან "დაკავშირება" ღილაკით.',
  'დაუკავშირდე': 'შეგიძლიათ დაუკავშირდეთ მასწავლებელს პირდაპირ პროფილიდან "დაკავშირება" ღილაკით.',
  'როგორ': 'გამოიყენეთ ფილტრები ზემოთ, რათა იპოვოთ იდეალური მასწავლებელი. ასევე შეგიძლიათ დაუკავშირდეთ პირდაპირ პროფილიდან.',
  'ფასი': 'საშუალო ფასი არის ₾30-₾50 საათში. გამოიყენეთ ფასის სლაიდერი ზემოთ, რათა დარჩეთ ბიუჯეტში.',
  'საშუალო': 'საშუალო ფასი დაახლოებით ₾30-₾50 საათშია. თითოეულ მასწავლებელს განსხვავებული გამოცდილება და ტარისფი აქვს.',
  'გამოცდილება': 'ყველა ჩვენი მასწავლებელი გამოცდილი პროფესიონალია. გამოიყენეთ გამოცდილების ფილტრი საუკეთესო მატჩისთვის.',
  'მედიცინა': 'ჩვენ გვყავს გამოცდილ მედიკოს მენტორები, რომლებიც დაგეხმარებათ კლინიკურ აზროვნებაში.',
  'სამართალი': 'სამართლის მენტორები გაგიზიარებენ კეისების ანალიზის პრაქტიკას და გამოცდის სტრატეგიას.',
  'ინჟინერია': 'ინჟინერიის ტუტორები დაგეხმარებიან პროექტებში და ტექნიკურ დავალებებში.',
  'სამასწავლებლო': 'პედაგოგები გასწავლიან თანამედროვე სასწავლო მეთოდებს და გეგმების შექმნას.',
  'ბუღალტერია': 'ბუღალტერიაში ვთავაზობთ პრაქტიკულ სავარჯიშოებს და ფინანსური ანგარიშგების დახმარებას.',
  'IT': 'IT მიმართულებაში გვაქვს პროგრამირების და ქსელების მენტორები. უბრალოდ აირჩიეთ ფილტრში.',
  'ელექტროობა': 'ელექტროობის ტუტორები უსაფრთხოების წესებს და პრაქტიკულ ლაბებს გაგიზიარებენ.',
  'მზარეული': 'კულინარიის მენტორები რეცეპტებს, ტექნიკებს და ჰიგიენის სტანდარტებს გასწავლიან.',
  'დახმარება': 'შემიძლია დაგეხმაროთ საგნებზე, ფასებზე, გამოცდილებაზე ან უბრალოდ მოგესალმოთ!',
  'მადლობა': 'გთხოვთ! თუ რაიმე სხვა დახმარება დაგჭირდებათ, უბრალოდ მითხარით.',
  'გმადლობ': 'მოხარული ვარ, რომ დაგეხმარე! წარმატებებს გისურვებ სწავლაში!',
  'გმადლობთ': 'მოხარული ვარ, რომ დაგეხმარე! წარმატებებს გისურვებ სწავლაში!',
}

export const defaultResponse =
  'გთხოვთ, გამოიყენოთ ფილტრები ზემოთ მასწავლებლების მოსაძებნად. ასევე შემიძლია დაგეხმაროთ საგნებზე, ფასებზე, გამოცდილებაზე ან უბრალოდ მოგესალმოთ!'

export function getCardGradient(id: number): string {
  return cardGradients[id % cardGradients.length]
}

export function getInitials(name: string): string {
  const parts = name.split(' ')
  return parts.map((p) => p[0]).join('').toUpperCase()
}
