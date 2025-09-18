export interface Lesson {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  code: string
  expectedTime: number // in minutes
  concepts: string[]
}

export interface LanguageTrack {
  language: string
  languageName: string
  lessons: Lesson[]
}

export interface UserStats {
  language: string
  lessonId: string
  wpm: number
  accuracy: number
  timeSpent: number
  completedAt: Date
  mistakes: number
  symbolsMissed: string[]
}

export const languageTracks: LanguageTrack[] = [
  {
    language: 'python',
    languageName: 'Python',
    lessons: [
      {
        id: 'python-basics-1',
        title: 'Hello World & Variables',
        description: 'Learn basic Python syntax with print statements and variable assignments',
        difficulty: 'beginner',
        code: `# Hello World in Python
print("Hello, World!")

# Variables and basic data types
name = "Alice"
age = 25
height = 5.6
is_student = True

# String formatting
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")`,
        expectedTime: 5,
        concepts: ['print statements', 'variables', 'data types', 'f-strings']
      },
      {
        id: 'python-basics-2',
        title: 'Lists and Loops',
        description: 'Master Python lists and basic loop structures',
        difficulty: 'beginner',
        code: `# Creating and manipulating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Adding items to lists
fruits.append("grape")
numbers.insert(0, 0)

# For loops
for fruit in fruits:
    print(f"I like {fruit}")

# List comprehensions
squared_numbers = [x**2 for x in numbers]
print(squared_numbers)

# While loops
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1`,
        expectedTime: 8,
        concepts: ['lists', 'for loops', 'while loops', 'list comprehensions']
      },
      {
        id: 'python-intermediate-1',
        title: 'Functions and Conditionals',
        description: 'Create reusable functions and implement conditional logic',
        difficulty: 'intermediate',
        code: `def calculate_grade(score):
    """Calculate letter grade based on score"""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

def process_students(student_scores):
    """Process a list of student scores"""
    results = []
    for name, score in student_scores.items():
        grade = calculate_grade(score)
        results.append(f"{name}: {score} -> {grade}")
    return results

# Example usage
students = {"Alice": 95, "Bob": 78, "Charlie": 82}
grades = process_students(students)
for grade in grades:
    print(grade)`,
        expectedTime: 10,
        concepts: ['functions', 'conditionals', 'dictionaries', 'docstrings']
      },
      {
        id: 'python-intermediate-2',
        title: 'Error Handling and Imports',
        description: 'Handle errors gracefully and work with external modules',
        difficulty: 'intermediate',
        code: `import math
from datetime import datetime, timedelta

def safe_divide(a, b):
    """Safely divide two numbers with error handling"""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Invalid input types")
        return None

def calculate_circle_area(radius):
    """Calculate circle area with input validation"""
    try:
        if radius < 0:
            raise ValueError("Radius cannot be negative")
        return math.pi * radius ** 2
    except ValueError as e:
        print(f"Value error: {e}")
        return None

# Working with dates
now = datetime.now()
future_date = now + timedelta(days=30)
print(f"Today: {now.strftime('%Y-%m-%d')}")
print(f"30 days from now: {future_date.strftime('%Y-%m-%d')}")`,
        expectedTime: 12,
        concepts: ['try-except', 'imports', 'datetime', 'input validation']
      },
      {
        id: 'python-advanced-1',
        title: 'Classes and Objects',
        description: 'Object-oriented programming with classes and inheritance',
        difficulty: 'advanced',
        code: `class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.energy = 100
    
    def eat(self, food_amount):
        self.energy += food_amount
        print(f"{self.name} ate and gained {food_amount} energy")
    
    def make_sound(self):
        return "Some generic animal sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Canine")
        self.breed = breed
    
    def make_sound(self):
        return "Woof!"
    
    def fetch(self):
        if self.energy >= 20:
            self.energy -= 20
            return f"{self.name} fetched the ball!"
        else:
            return f"{self.name} is too tired to fetch"

# Usage
my_dog = Dog("Buddy", "Golden Retriever")
print(my_dog.make_sound())
print(my_dog.fetch())`,
        expectedTime: 15,
        concepts: ['classes', 'inheritance', 'super()', 'method overriding']
      }
    ]
  },
  {
    language: 'javascript',
    languageName: 'JavaScript',
    lessons: [
      {
        id: 'js-basics-1',
        title: 'Variables and Console',
        description: 'Learn JavaScript basics with variables and console output',
        difficulty: 'beginner',
        code: `// Variables in JavaScript
let name = "Alice";
const age = 25;
var city = "New York";

// Console output
console.log("Hello, World!");
console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);
console.log(\`City: \${city}\`);

// Data types
let isStudent = true;
let score = 95.5;
let hobbies = ["reading", "coding", "gaming"];

console.log(typeof name);    // string
console.log(typeof age);     // number
console.log(typeof isStudent); // boolean`,
        expectedTime: 6,
        concepts: ['variables', 'console.log', 'template literals', 'data types']
      },
      {
        id: 'js-basics-2',
        title: 'Arrays and Loops',
        description: 'Work with arrays and different loop types',
        difficulty: 'beginner',
        code: `// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];

// Array methods
fruits.push("grape");
numbers.unshift(0);

// For loops
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// For...of loop
for (let fruit of fruits) {
    console.log(\`I like \${fruit}\`);
}

// Array methods
let doubled = numbers.map(num => num * 2);
let evens = numbers.filter(num => num % 2 === 0);

console.log("Doubled:", doubled);
console.log("Even numbers:", evens);`,
        expectedTime: 8,
        concepts: ['arrays', 'for loops', 'array methods', 'arrow functions']
      },
      {
        id: 'js-intermediate-1',
        title: 'Functions and Objects',
        description: 'Create functions and work with objects',
        difficulty: 'intermediate',
        code: `// Function declarations
function greet(name, age) {
    return \`Hello, \${name}! You are \${age} years old.\`;
}

// Arrow functions
const calculateArea = (width, height) => {
    return width * height;
};

// Objects
const person = {
    name: "Alice",
    age: 30,
    city: "San Francisco",
    greet: function() {
        return \`Hi, I'm \${this.name}\`;
    }
};

// Object methods
person.introduce = function() {
    return \`I'm \${this.name}, \${this.age} years old, from \${this.city}\`;
};

// Usage
console.log(greet("Bob", 25));
console.log(calculateArea(10, 5));
console.log(person.greet());
console.log(person.introduce());`,
        expectedTime: 10,
        concepts: ['functions', 'arrow functions', 'objects', 'methods']
      },
      {
        id: 'js-intermediate-2',
        title: 'Async/Await and Promises',
        description: 'Handle asynchronous operations with modern JavaScript',
        difficulty: 'intermediate',
        code: `// Promise-based function
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "John Doe",
                    email: "john@example.com"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// Async/await usage
async function getUserInfo(userId) {
    try {
        console.log("Fetching user data...");
        const user = await fetchUserData(userId);
        console.log("User found:", user);
        return user;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

// Multiple async operations
async function processUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    try {
        const users = await Promise.all(promises);
        console.log("All users:", users);
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}`,
        expectedTime: 12,
        concepts: ['promises', 'async/await', 'error handling', 'Promise.all']
      },
      {
        id: 'js-advanced-1',
        title: 'Classes and Modules',
        description: 'Object-oriented programming and module patterns',
        difficulty: 'advanced',
        code: `// ES6 Classes
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
    
    getInfo() {
        return {
            name: this.name,
            email: this.email,
            memberSince: this.createdAt.getFullYear()
        };
    }
}

class Admin extends User {
    constructor(name, email, permissions) {
        super(name, email);
        this.permissions = permissions;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}, an admin\`;
    }
    
    hasPermission(permission) {
        return this.permissions.includes(permission);
    }
}

// Usage
const admin = new Admin("Alice", "alice@admin.com", ["read", "write", "delete"]);
console.log(admin.greet());
console.log(admin.hasPermission("delete"));`,
        expectedTime: 15,
        concepts: ['classes', 'inheritance', 'super()', 'ES6 modules']
      }
    ]
  }
]

export const getLanguageTrack = (language: string): LanguageTrack | undefined => {
  return languageTracks.find(track => track.language === language)
}

export const getLesson = (language: string, lessonId: string): Lesson | undefined => {
  const track = getLanguageTrack(language)
  return track?.lessons.find(lesson => lesson.id === lessonId)
}

export const getLessonsByDifficulty = (language: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Lesson[] => {
  const track = getLanguageTrack(language)
  return track?.lessons.filter(lesson => lesson.difficulty === difficulty) || []
}
