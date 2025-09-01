type Grade = "A" | "B" | "C" | "D" | "E" | "F";

interface Student {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
  students: number[];
  grades: Grade[];
}

const students: Student[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  {
    id: 4,
    name: "David",
  },
  {
    id: 5,
    name: "Lina",
  },
];

const subjects: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    students: [1, 2],
    grades: ["A", "B", "F", "A", "A", "A", "A"],
  },
  {
    id: 2,
    name: "English",
    students: [2],
    grades: ["A"],
  },
  {
    id: 3,
    name: "History",
    students: [1, 3],
    grades: [],
  },
];

const addStudent = (student: Student) => {
  students.push(student);
};

// addStudent({
//   id: 1,
//   name: "test"
// })

const addSubject = (
  subject: Pick<Subject, "name">,
  students: number[],
  grades: Grade[] = []
) => {
  const subjectData: Subject = {
    id: subjects.length + 1,
    name: subject.name,
    students,
    grades,
  };
  subjects.push(subjectData);
};

const getGradeDistribution = (subjects: Subject[]) => {
  const gradeNumbers = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  for (const subject of subjects) {
    for (const grade of subject.grades) {
      gradeNumbers[grade]++;
    }
  }

  return (
    `Grade Distribution:` +
    Object.entries(gradeNumbers)
      .map(([grade, count]) => `  ${grade}: ${count}`)
      .join("")
  );
};

addStudent({ id: 6, name: "Eve" });
addSubject({ name: "Biology" }, [1, 2, 3, 4, 5, 6]);

console.log(getGradeDistribution(subjects));
