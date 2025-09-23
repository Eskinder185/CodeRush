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
  },
  {
    language: 'java',
    languageName: 'Java',
    lessons: [
      {
        id: 'java-basics-1',
        title: 'Hello World & Variables',
        description: 'Learn basic Java syntax with print statements and variable declarations',
        difficulty: 'beginner',
        code: `public class HelloWorld {
    public static void main(String[] args) {
        // Hello World in Java
        System.out.println("Hello, World!");
        
        // Variables and basic data types
        String name = "Alice";
        int age = 25;
        double height = 5.6;
        boolean isStudent = true;
        
        // String formatting
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " feet");
        System.out.println("Is student: " + isStudent);
    }
}`,
        expectedTime: 8,
        concepts: ['System.out.println', 'variables', 'data types', 'string concatenation']
      },
      {
        id: 'java-basics-2',
        title: 'Arrays and Loops',
        description: 'Master Java arrays and different loop structures',
        difficulty: 'beginner',
        code: `public class ArraysAndLoops {
    public static void main(String[] args) {
        // Creating arrays
        String[] fruits = {"apple", "banana", "orange"};
        int[] numbers = {1, 2, 3, 4, 5};
        
        // For loops
        for (int i = 0; i < fruits.length; i++) {
            System.out.println(fruits[i]);
        }
        
        // Enhanced for loop
        for (String fruit : fruits) {
            System.out.println("I like " + fruit);
        }
        
        // While loop
        int count = 0;
        while (count < 3) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // Array manipulation
        int[] doubled = new int[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            doubled[i] = numbers[i] * 2;
        }
        
        System.out.println("Doubled numbers:");
        for (int num : doubled) {
            System.out.print(num + " ");
        }
    }
}`,
        expectedTime: 10,
        concepts: ['arrays', 'for loops', 'enhanced for loops', 'while loops']
      },
      {
        id: 'java-intermediate-1',
        title: 'Methods and Classes',
        description: 'Create methods and basic class structures',
        difficulty: 'intermediate',
        code: `public class Calculator {
    // Instance variables
    private double result;
    
    // Constructor
    public Calculator() {
        this.result = 0.0;
    }
    
    // Methods
    public double add(double a, double b) {
        result = a + b;
        return result;
    }
    
    public double subtract(double a, double b) {
        result = a - b;
        return result;
    }
    
    public double multiply(double a, double b) {
        result = a * b;
        return result;
    }
    
    public double divide(double a, double b) {
        if (b != 0) {
            result = a / b;
            return result;
        } else {
            System.out.println("Error: Division by zero!");
            return 0;
        }
    }
    
    public double getResult() {
        return result;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println("Addition: " + calc.add(10, 5));
        System.out.println("Subtraction: " + calc.subtract(10, 5));
        System.out.println("Multiplication: " + calc.multiply(10, 5));
        System.out.println("Division: " + calc.divide(10, 5));
    }
}`,
        expectedTime: 12,
        concepts: ['methods', 'classes', 'constructors', 'instance variables']
      },
      {
        id: 'java-intermediate-2',
        title: 'Exception Handling',
        description: 'Handle errors gracefully with try-catch blocks',
        difficulty: 'intermediate',
        code: `import java.util.Scanner;
import java.util.InputMismatchException;

public class ExceptionHandling {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter a number: ");
            int number = scanner.nextInt();
            
            System.out.print("Enter divisor: ");
            int divisor = scanner.nextInt();
            
            double result = safeDivide(number, divisor);
            System.out.println("Result: " + result);
            
        } catch (InputMismatchException e) {
            System.out.println("Error: Please enter a valid number!");
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        } finally {
            scanner.close();
            System.out.println("Scanner closed successfully.");
        }
    }
    
    public static double safeDivide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero!");
        }
        return (double) a / b;
    }
}`,
        expectedTime: 10,
        concepts: ['try-catch', 'exception handling', 'Scanner', 'finally block']
      },
      {
        id: 'java-advanced-1',
        title: 'Inheritance and Polymorphism',
        description: 'Object-oriented programming with inheritance and method overriding',
        difficulty: 'advanced',
        code: `// Base class
class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Derived class
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }
    
    public void fetch() {
        System.out.println(name + " is fetching the ball!");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Breed: " + breed);
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Animal animal = new Animal("Generic", 5);
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        
        // Polymorphism
        Animal[] animals = {animal, dog};
        
        for (Animal a : animals) {
            a.makeSound(); // Calls appropriate method based on actual type
            a.displayInfo();
            System.out.println("---");
        }
        
        // Dog-specific method
        dog.fetch();
    }
}`,
        expectedTime: 15,
        concepts: ['inheritance', 'polymorphism', 'super()', 'method overriding']
      }
    ]
  },
  {
    language: 'cpp',
    languageName: 'C++',
    lessons: [
      {
        id: 'cpp-basics-1',
        title: 'Hello World & Variables',
        description: 'Learn basic C++ syntax with cout and variable declarations',
        difficulty: 'beginner',
        code: `#include <iostream>
using namespace std;

int main() {
    // Hello World in C++
    cout << "Hello, World!" << endl;
    
    // Variables and basic data types
    string name = "Alice";
    int age = 25;
    double height = 5.6;
    bool isStudent = true;
    
    // Output with cout
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << " feet" << endl;
    cout << "Is student: " << (isStudent ? "true" : "false") << endl;
    
    return 0;
}`,
        expectedTime: 8,
        concepts: ['#include', 'cout', 'variables', 'data types', 'endl']
      },
      {
        id: 'cpp-basics-2',
        title: 'Arrays and Loops',
        description: 'Master C++ arrays and different loop structures',
        difficulty: 'beginner',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Traditional arrays
    string fruits[] = {"apple", "banana", "orange"};
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    // For loops with traditional arrays
    for (int i = 0; i < 3; i++) {
        cout << fruits[i] << endl;
    }
    
    // Range-based for loop (C++11)
    for (const string& fruit : fruits) {
        cout << "I like " << fruit << endl;
    }
    
    // While loop
    int count = 0;
    while (count < 3) {
        cout << "Count: " << count << endl;
        count++;
    }
    
    // Vector (dynamic array)
    vector<int> doubled;
    for (int i = 0; i < size; i++) {
        doubled.push_back(numbers[i] * 2);
    }
    
    cout << "Doubled numbers: ";
    for (int num : doubled) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedTime: 10,
        concepts: ['arrays', 'vectors', 'for loops', 'range-based loops', 'while loops']
      },
      {
        id: 'cpp-intermediate-1',
        title: 'Functions and Classes',
        description: 'Create functions and basic class structures',
        difficulty: 'intermediate',
        code: `#include <iostream>
#include <string>
using namespace std;

class Calculator {
private:
    double result;
    
public:
    // Constructor
    Calculator() : result(0.0) {}
    
    // Methods
    double add(double a, double b) {
        result = a + b;
        return result;
    }
    
    double subtract(double a, double b) {
        result = a - b;
        return result;
    }
    
    double multiply(double a, double b) {
        result = a * b;
        return result;
    }
    
    double divide(double a, double b) {
        if (b != 0) {
            result = a / b;
            return result;
        } else {
            cout << "Error: Division by zero!" << endl;
            return 0;
        }
    }
    
    double getResult() const {
        return result;
    }
};

// Function outside class
void displayResult(const string& operation, double value) {
    cout << operation << ": " << value << endl;
}

int main() {
    Calculator calc;
    
    displayResult("Addition", calc.add(10, 5));
    displayResult("Subtraction", calc.subtract(10, 5));
    displayResult("Multiplication", calc.multiply(10, 5));
    displayResult("Division", calc.divide(10, 5));
    
    return 0;
}`,
        expectedTime: 12,
        concepts: ['classes', 'constructors', 'methods', 'const', 'function parameters']
      },
      {
        id: 'cpp-intermediate-2',
        title: 'Pointers and References',
        description: 'Work with pointers, references, and memory management',
        difficulty: 'intermediate',
        code: `#include <iostream>
#include <memory>
using namespace std;

void demonstratePointers() {
    int value = 42;
    int* ptr = &value;  // Pointer to value
    
    cout << "Value: " << value << endl;
    cout << "Address: " << &value << endl;
    cout << "Pointer value: " << ptr << endl;
    cout << "Dereferenced: " << *ptr << endl;
    
    // Modify through pointer
    *ptr = 100;
    cout << "New value: " << value << endl;
}

void demonstrateReferences() {
    int original = 50;
    int& ref = original;  // Reference to original
    
    cout << "Original: " << original << endl;
    cout << "Reference: " << ref << endl;
    
    // Modify through reference
    ref = 200;
    cout << "Modified original: " << original << endl;
}

void demonstrateSmartPointers() {
    // Smart pointer (C++11)
    unique_ptr<int> smartPtr = make_unique<int>(300);
    
    cout << "Smart pointer value: " << *smartPtr << endl;
    // Automatically deallocated when out of scope
}

int main() {
    cout << "=== Pointers ===" << endl;
    demonstratePointers();
    
    cout << "\n=== References ===" << endl;
    demonstrateReferences();
    
    cout << "\n=== Smart Pointers ===" << endl;
    demonstrateSmartPointers();
    
    return 0;
}`,
        expectedTime: 12,
        concepts: ['pointers', 'references', 'smart pointers', 'memory management']
      },
      {
        id: 'cpp-advanced-1',
        title: 'Templates and STL',
        description: 'Generic programming with templates and Standard Template Library',
        difficulty: 'advanced',
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

// Function template
template<typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template<typename T>
class Stack {
private:
    vector<T> elements;
    
public:
    void push(const T& element) {
        elements.push_back(element);
    }
    
    T pop() {
        if (elements.empty()) {
            throw runtime_error("Stack is empty!");
        }
        T element = elements.back();
        elements.pop_back();
        return element;
    }
    
    bool empty() const {
        return elements.empty();
    }
    
    size_t size() const {
        return elements.size();
    }
};

int main() {
    // Using function template
    cout << "Max of 10 and 20: " << getMax(10, 20) << endl;
    cout << "Max of 3.14 and 2.71: " << getMax(3.14, 2.71) << endl;
    cout << "Max of 'a' and 'z': " << getMax('a', 'z') << endl;
    
    // Using class template
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    
    cout << "Stack size: " << intStack.size() << endl;
    
    while (!intStack.empty()) {
        cout << "Popped: " << intStack.pop() << endl;
    }
    
    // STL algorithms
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    sort(numbers.begin(), numbers.end());
    
    cout << "Sorted numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
        expectedTime: 15,
        concepts: ['templates', 'STL', 'generic programming', 'algorithms']
      }
    ]
  },
  {
    language: 'html-css',
    languageName: 'HTML/CSS',
    lessons: [
      {
        id: 'html-css-basics-1',
        title: 'Basic HTML Structure',
        description: 'Learn fundamental HTML elements and document structure',
        difficulty: 'beginner',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the main content of my website.</p>
            <p>HTML provides the <strong>structure</strong> for web pages.</p>
        </section>
        
        <section id="about">
            <h2>About Section</h2>
            <p>Here's some information about me:</p>
            <ul>
                <li>Web Developer</li>
                <li>HTML Enthusiast</li>
                <li>CSS Lover</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`,
        expectedTime: 8,
        concepts: ['DOCTYPE', 'html structure', 'head', 'body', 'semantic elements']
      },
      {
        id: 'html-css-basics-2',
        title: 'CSS Styling Basics',
        description: 'Style HTML elements with CSS properties and selectors',
        difficulty: 'beginner',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Basics</title>
    <style>
        /* Element selectors */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        
        h1 {
            color: #333;
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        
        /* Class selectors */
        .highlight {
            background-color: yellow;
            padding: 2px 4px;
        }
        
        .card {
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* ID selectors */
        #special-text {
            color: #007bff;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        /* Pseudo-classes */
        a:hover {
            color: #0056b3;
            text-decoration: underline;
        }
        
        /* Multiple selectors */
        h2, h3 {
            color: #555;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>CSS Styling Examples</h1>
    
    <div class="card">
        <h2>Basic Styling</h2>
        <p>This paragraph has <span class="highlight">highlighted text</span> and demonstrates various CSS properties.</p>
        <p id="special-text">This text has special styling applied via ID selector.</p>
    </div>
    
    <div class="card">
        <h3>Links and Interactions</h3>
        <p>Hover over this <a href="#">link</a> to see the hover effect.</p>
    </div>
</body>
</html>`,
        expectedTime: 10,
        concepts: ['CSS selectors', 'properties', 'classes', 'IDs', 'pseudo-classes']
      },
      {
        id: 'html-css-intermediate-1',
        title: 'Flexbox Layout',
        description: 'Create flexible layouts using CSS Flexbox',
        difficulty: 'intermediate',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .container {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }
        
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .main-content {
            display: flex;
            flex: 1;
        }
        
        .sidebar {
            background-color: #34495e;
            color: white;
            padding: 20px;
            width: 250px;
            flex-shrink: 0;
        }
        
        .content {
            flex: 1;
            padding: 20px;
            background-color: #ecf0f1;
        }
        
        .card-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        
        .card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            flex: 1;
            min-width: 200px;
        }
        
        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .nav-list {
            list-style: none;
        }
        
        .nav-list li {
            margin: 10px 0;
        }
        
        .nav-list a {
            color: white;
            text-decoration: none;
            padding: 8px 12px;
            display: block;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .nav-list a:hover {
            background-color: #3498db;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Flexbox Layout Example</h1>
        </header>
        
        <div class="main-content">
            <aside class="sidebar">
                <h3>Navigation</h3>
                <ul class="nav-list">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </aside>
            
            <main class="content">
                <h2>Main Content Area</h2>
                <p>This layout uses CSS Flexbox to create a responsive design.</p>
                
                <div class="card-grid">
                    <div class="card">
                        <h3>Card 1</h3>
                        <p>This card demonstrates flexbox properties and responsive design.</p>
                    </div>
                    <div class="card">
                        <h3>Card 2</h3>
                        <p>Cards automatically adjust their width based on available space.</p>
                    </div>
                    <div class="card">
                        <h3>Card 3</h3>
                        <p>Flexbox makes it easy to create flexible layouts.</p>
                    </div>
                </div>
            </main>
        </div>
        
        <footer class="footer">
            <p>&copy; 2024 Flexbox Layout Example</p>
        </footer>
    </div>
</body>
</html>`,
        expectedTime: 12,
        concepts: ['flexbox', 'flex-direction', 'flex-wrap', 'responsive design', 'layout']
      },
      {
        id: 'html-css-intermediate-2',
        title: 'CSS Grid Layout',
        description: 'Create complex layouts using CSS Grid',
        difficulty: 'intermediate',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
                "header header header"
                "sidebar main aside"
                "footer footer footer";
            min-height: 100vh;
            gap: 20px;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .header {
            grid-area: header;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .sidebar {
            grid-area: sidebar;
            background-color: #343a40;
            color: white;
            padding: 20px;
            border-radius: 10px;
        }
        
        .main {
            grid-area: main;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .aside {
            grid-area: aside;
            background-color: #e9ecef;
            padding: 20px;
            border-radius: 10px;
        }
        
        .footer {
            grid-area: footer;
            background-color: #6c757d;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .nested-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .nested-item {
            background-color: #007bff;
            color: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
        }
        
        .nav-list {
            list-style: none;
        }
        
        .nav-list li {
            margin: 10px 0;
        }
        
        .nav-list a {
            color: white;
            text-decoration: none;
            padding: 8px 12px;
            display: block;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .nav-list a:hover {
            background-color: #495057;
        }
        
        @media (max-width: 768px) {
            .grid-container {
                grid-template-columns: 1fr;
                grid-template-areas: 
                    "header"
                    "main"
                    "sidebar"
                    "aside"
                    "footer";
            }
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <header class="header">
            <h1>CSS Grid Layout</h1>
            <p>Modern web layout with CSS Grid</p>
        </header>
        
        <aside class="sidebar">
            <h3>Navigation</h3>
            <ul class="nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </aside>
        
        <main class="main">
            <h2>Main Content</h2>
            <p>This is the main content area using CSS Grid layout. The grid system provides powerful control over positioning and sizing of elements.</p>
            
            <div class="nested-grid">
                <div class="nested-item">Item 1</div>
                <div class="nested-item">Item 2</div>
                <div class="nested-item">Item 3</div>
                <div class="nested-item">Item 4</div>
                <div class="nested-item">Item 5</div>
                <div class="nested-item">Item 6</div>
            </div>
        </main>
        
        <aside class="aside">
            <h3>Sidebar</h3>
            <p>Additional content and widgets can be placed here.</p>
            <ul>
                <li>Recent Posts</li>
                <li>Categories</li>
                <li>Tags</li>
                <li>Archives</li>
            </ul>
        </aside>
        
        <footer class="footer">
            <p>&copy; 2024 CSS Grid Layout Example. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`,
        expectedTime: 12,
        concepts: ['CSS Grid', 'grid-template-areas', 'responsive design', 'nested grids']
      },
      {
        id: 'html-css-advanced-1',
        title: 'CSS Animations and Transitions',
        description: 'Create engaging animations and smooth transitions',
        difficulty: 'advanced',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animations</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            text-align: center;
            color: white;
        }
        
        .animated-title {
            font-size: 3rem;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease-out;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            margin: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            animation: slideIn 0.8s ease-out;
        }
        
        .card:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .button:active {
            transform: translateY(0);
        }
        
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .button:hover::before {
            left: 100%;
        }
        
        .spinning-icon {
            display: inline-block;
            font-size: 2rem;
            animation: spin 2s linear infinite;
            margin: 1rem;
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .bounce {
            animation: bounce 1s infinite;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            overflow: hidden;
            margin: 1rem 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4ecdc4, #44a08d);
            border-radius: 10px;
            animation: progress 3s ease-in-out infinite;
        }
        
        @keyframes progress {
            0% {
                width: 0%;
            }
            50% {
                width: 100%;
            }
            100% {
                width: 0%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="animated-title">CSS Animations</h1>
        
        <div class="card">
            <h2>Interactive Elements</h2>
            <p>Hover over the button to see the animation effects!</p>
            <button class="button">Animated Button</button>
        </div>
        
        <div class="card">
            <h2>Icon Animations</h2>
            <div class="spinning-icon">⚡</div>
            <div class="pulse">💫</div>
            <div class="bounce">🎯</div>
        </div>
        
        <div class="card">
            <h2>Progress Animation</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>
</body>
</html>`,
        expectedTime: 15,
        concepts: ['CSS animations', 'transitions', 'keyframes', 'transforms', 'hover effects']
      }
    ]
  },
  {
    language: 'sql',
    languageName: 'SQL',
    lessons: [
      {
        id: 'sql-basics-1',
        title: 'Basic Queries and Tables',
        description: 'Learn fundamental SQL syntax with SELECT statements and table creation',
        difficulty: 'beginner',
        code: `-- Create a sample database table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE
);

-- Insert sample data
INSERT INTO employees (first_name, last_name, email, department, salary, hire_date) VALUES
('John', 'Doe', 'john.doe@company.com', 'Engineering', 75000.00, '2023-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 65000.00, '2023-02-20'),
('Bob', 'Johnson', 'bob.johnson@company.com', 'Engineering', 80000.00, '2022-11-10'),
('Alice', 'Brown', 'alice.brown@company.com', 'HR', 60000.00, '2023-03-05'),
('Charlie', 'Wilson', 'charlie.wilson@company.com', 'Engineering', 70000.00, '2023-01-30');

-- Basic SELECT queries
SELECT * FROM employees;

SELECT first_name, last_name, department 
FROM employees;

SELECT first_name, last_name, salary 
FROM employees 
WHERE salary > 70000;

SELECT department, COUNT(*) as employee_count
FROM employees 
GROUP BY department;`,
        expectedTime: 10,
        concepts: ['CREATE TABLE', 'INSERT', 'SELECT', 'WHERE', 'GROUP BY']
      },
      {
        id: 'sql-basics-2',
        title: 'Joins and Relationships',
        description: 'Master table relationships and JOIN operations',
        difficulty: 'beginner',
        code: `-- Create related tables
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    manager_id INT,
    budget DECIMAL(12, 2)
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Insert sample data
INSERT INTO departments (name, manager_id, budget) VALUES
('Engineering', 1, 500000.00),
('Marketing', 2, 200000.00),
('HR', 4, 100000.00);

INSERT INTO projects (name, department_id, start_date, end_date, budget) VALUES
('Website Redesign', 1, '2023-01-01', '2023-06-30', 50000.00),
('Mobile App', 1, '2023-02-01', '2023-08-31', 75000.00),
('Brand Campaign', 2, '2023-03-01', '2023-05-31', 30000.00),
('Employee Training', 3, '2023-04-01', '2023-07-31', 15000.00);

-- INNER JOIN
SELECT e.first_name, e.last_name, d.name as department_name
FROM employees e
INNER JOIN departments d ON e.department = d.name;

-- LEFT JOIN
SELECT d.name as department_name, p.name as project_name
FROM departments d
LEFT JOIN projects p ON d.id = p.department_id;

-- Multiple table JOIN
SELECT e.first_name, e.last_name, d.name as department, p.name as project
FROM employees e
INNER JOIN departments d ON e.department = d.name
LEFT JOIN projects p ON d.id = p.department_id;`,
        expectedTime: 12,
        concepts: ['FOREIGN KEY', 'INNER JOIN', 'LEFT JOIN', 'table relationships']
      },
      {
        id: 'sql-intermediate-1',
        title: 'Aggregate Functions and Subqueries',
        description: 'Use aggregate functions and nested queries for complex data analysis',
        difficulty: 'intermediate',
        code: `-- Aggregate functions
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as average_salary,
    MAX(salary) as highest_salary,
    MIN(salary) as lowest_salary,
    SUM(salary) as total_salary
FROM employees 
GROUP BY department
HAVING COUNT(*) > 1;

-- Subqueries
SELECT first_name, last_name, salary
FROM employees 
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);

-- EXISTS subquery
SELECT d.name as department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 
    FROM projects p 
    WHERE p.department_id = d.id
);

-- IN subquery
SELECT first_name, last_name
FROM employees
WHERE department IN (
    SELECT name 
    FROM departments 
    WHERE budget > 150000
);

-- Correlated subquery
SELECT e.first_name, e.last_name, e.salary
FROM employees e
WHERE e.salary = (
    SELECT MAX(salary)
    FROM employees e2
    WHERE e2.department = e.department
);`,
        expectedTime: 12,
        concepts: ['aggregate functions', 'subqueries', 'EXISTS', 'HAVING', 'correlated subqueries']
      },
      {
        id: 'sql-intermediate-2',
        title: 'Data Modification and Transactions',
        description: 'Update, delete data and manage database transactions',
        difficulty: 'intermediate',
        code: `-- UPDATE statements
UPDATE employees 
SET salary = salary * 1.1 
WHERE department = 'Engineering';

UPDATE employees 
SET email = CONCAT(LOWER(first_name), '.', LOWER(last_name), '@company.com')
WHERE email IS NULL;

-- DELETE statements
DELETE FROM projects 
WHERE end_date < '2023-01-01';

-- Transactions
START TRANSACTION;

INSERT INTO employees (first_name, last_name, email, department, salary, hire_date) 
VALUES ('New', 'Employee', 'new.employee@company.com', 'Engineering', 65000.00, '2023-12-01');

UPDATE departments 
SET budget = budget - 65000 
WHERE name = 'Engineering';

-- Rollback if needed (uncomment to test)
-- ROLLBACK;

-- Commit the transaction
COMMIT;

-- Conditional updates with CASE
UPDATE employees 
SET salary = CASE 
    WHEN department = 'Engineering' THEN salary * 1.15
    WHEN department = 'Marketing' THEN salary * 1.10
    ELSE salary * 1.05
END;

-- Safe DELETE with JOIN
DELETE e FROM employees e
LEFT JOIN projects p ON e.department = (
    SELECT name FROM departments WHERE id = p.department_id
)
WHERE p.id IS NULL AND e.hire_date < '2022-01-01';`,
        expectedTime: 10,
        concepts: ['UPDATE', 'DELETE', 'transactions', 'COMMIT', 'ROLLBACK', 'CASE statements']
      },
      {
        id: 'sql-advanced-1',
        title: 'Advanced Queries and Window Functions',
        description: 'Complex queries with window functions and advanced SQL features',
        difficulty: 'advanced',
        code: `-- Window functions
SELECT 
    first_name,
    last_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
    RANK() OVER (ORDER BY salary DESC) as overall_rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank,
    LAG(salary, 1) OVER (PARTITION BY department ORDER BY salary) as prev_salary,
    LEAD(salary, 1) OVER (PARTITION BY department ORDER BY salary) as next_salary,
    AVG(salary) OVER (PARTITION BY department) as dept_avg_salary
FROM employees;

-- Common Table Expressions (CTEs)
WITH department_stats AS (
    SELECT 
        department,
        COUNT(*) as emp_count,
        AVG(salary) as avg_salary
    FROM employees
    GROUP BY department
),
high_performers AS (
    SELECT e.*, ds.avg_salary
    FROM employees e
    JOIN department_stats ds ON e.department = ds.department
    WHERE e.salary > ds.avg_salary * 1.2
)
SELECT 
    hp.first_name,
    hp.last_name,
    hp.department,
    hp.salary,
    hp.avg_salary,
    ROUND((hp.salary - hp.avg_salary) / hp.avg_salary * 100, 2) as salary_premium_pct
FROM high_performers hp;

-- Recursive CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: employees with no manager
    SELECT id, first_name, last_name, 0 as level
    FROM employees 
    WHERE id IN (SELECT manager_id FROM departments WHERE manager_id IS NOT NULL)
    
    UNION ALL
    
    -- Recursive case: employees reporting to managers
    SELECT e.id, e.first_name, e.last_name, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.id = eh.id
    WHERE eh.level < 3
)
SELECT * FROM employee_hierarchy ORDER BY level, last_name;`,
        expectedTime: 15,
        concepts: ['window functions', 'CTEs', 'recursive queries', 'ROW_NUMBER', 'RANK', 'LAG/LEAD']
      }
    ]
  },
  {
    language: 'bash',
    languageName: 'Bash',
    lessons: [
      {
        id: 'bash-basics-1',
        title: 'Basic Commands and Variables',
        description: 'Learn fundamental bash commands and variable usage',
        difficulty: 'beginner',
        code: `#!/bin/bash

# Basic commands and variables
echo "Hello, World!"

# Variables
name="Alice"
age=25
city="New York"

echo "Name: \$name"
echo "Age: \$age"
echo "City: \$city"

# Command substitution
current_date=\$(date)
echo "Current date: \$current_date"

# Environment variables
echo "User: \$USER"
echo "Home directory: \$HOME"
echo "Current directory: \$PWD"

# Basic file operations
echo "Creating a test file..."
echo "This is a test file" > test.txt
echo "File created successfully"

# List files
echo "Files in current directory:"
ls -la

# Remove test file
rm test.txt
echo "Test file removed"`,
        expectedTime: 8,
        concepts: ['echo', 'variables', 'command substitution', 'environment variables', 'file operations']
      },
      {
        id: 'bash-basics-2',
        title: 'Loops and Conditionals',
        description: 'Master bash loops and conditional statements',
        difficulty: 'beginner',
        code: `#!/bin/bash

# For loops
echo "=== For Loop Examples ==="
for i in {1..5}; do
    echo "Number: \$i"
done

# For loop with array
fruits=("apple" "banana" "orange" "grape")
echo "Fruits:"
for fruit in "\${fruits[@]}"; do
    echo "  - \$fruit"
done

# While loop
echo "=== While Loop Example ==="
count=1
while [ \$count -le 3 ]; do
    echo "Count: \$count"
    count=\$((count + 1))
done

# If-else statements
echo "=== Conditional Examples ==="
number=10

if [ \$number -gt 5 ]; then
    echo "\$number is greater than 5"
elif [ \$number -eq 5 ]; then
    echo "\$number equals 5"
else
    echo "\$number is less than 5"
fi

# String comparison
name="Alice"
if [ "\$name" = "Alice" ]; then
    echo "Hello, Alice!"
else
    echo "Hello, stranger!"
fi

# File existence check
if [ -f "test.txt" ]; then
    echo "test.txt exists"
else
    echo "test.txt does not exist"
fi`,
        expectedTime: 10,
        concepts: ['for loops', 'while loops', 'if-else', 'comparisons', 'arrays']
      },
      {
        id: 'bash-intermediate-1',
        title: 'Functions and Parameters',
        description: 'Create reusable functions and handle command-line parameters',
        difficulty: 'intermediate',
        code: `#!/bin/bash

# Function definition
greet() {
    local name=\$1
    local time_of_day=\$2
    echo "Good \$time_of_day, \$name!"
}

# Function with return value
calculate_sum() {
    local num1=\$1
    local num2=\$2
    local sum=\$((num1 + num2))
    echo \$sum
}

# Function with multiple parameters
create_user_info() {
    local username=\$1
    local email=\$2
    local department=\$3
    
    echo "=== User Information ==="
    echo "Username: \$username"
    echo "Email: \$email"
    echo "Department: \$department"
    echo "Created: \$(date)"
}

# Function that checks if a number is even
is_even() {
    local num=\$1
    if [ \$((num % 2)) -eq 0 ]; then
        return 0  # true
    else
        return 1  # false
    fi
}

# Main script
echo "=== Function Examples ==="

# Call functions
greet "Alice" "morning"
greet "Bob" "evening"

# Use function return value
result=\$(calculate_sum 15 25)
echo "Sum of 15 and 25: \$result"

# Create user info
create_user_info "john_doe" "john@company.com" "Engineering"

# Check if number is even
number=8
if is_even \$number; then
    echo "\$number is even"
else
    echo "\$number is odd"
fi

# Command line parameters
echo "=== Command Line Parameters ==="
echo "Script name: \$0"
echo "Number of arguments: \$#"
echo "All arguments: \$@"

if [ \$# -gt 0 ]; then
    echo "First argument: \$1"
    echo "Second argument: \$2"
fi`,
        expectedTime: 12,
        concepts: ['functions', 'parameters', 'return values', 'local variables', 'command line args']
      },
      {
        id: 'bash-intermediate-2',
        title: 'File Operations and Text Processing',
        description: 'Advanced file operations and text manipulation',
        difficulty: 'intermediate',
        code: `#!/bin/bash

# Create sample files for demonstration
echo "Creating sample files..."
echo -e "apple\\nbanana\\norange\\ngrape\\nkiwi" > fruits.txt
echo -e "John,25,Engineer\\nJane,30,Designer\\nBob,28,Manager" > employees.csv

# File reading and processing
echo "=== File Operations ==="

# Read file line by line
echo "Fruits from file:"
while IFS= read -r line; do
    echo "  - \$line"
done < fruits.txt

# Count lines in file
line_count=\$(wc -l < fruits.txt)
echo "Number of fruits: \$line_count"

# Search and replace in file
echo "=== Text Processing ==="
echo "Original fruits:"
cat fruits.txt

# Add prefix to each line
sed 's/^/Fruit: /' fruits.txt > fruits_with_prefix.txt
echo "Fruits with prefix:"
cat fruits_with_prefix.txt

# Extract specific columns from CSV
echo "=== CSV Processing ==="
echo "Employee names:"
cut -d',' -f1 employees.csv

echo "Employee ages:"
cut -d',' -f2 employees.csv

# Filter lines containing specific text
echo "Fruits containing 'a':"
grep 'a' fruits.txt

# Sort and unique
echo "Sorted unique fruits:"
sort fruits.txt | uniq

# File permissions and ownership
echo "=== File Management ==="
echo "Setting file permissions..."
chmod 644 fruits.txt
chmod 755 employees.csv

echo "File permissions:"
ls -l fruits.txt employees.csv

# Create directory and move files
mkdir -p backup
cp fruits.txt backup/
cp employees.csv backup/
echo "Files backed up to backup/ directory"

# Cleanup
rm fruits.txt employees.csv fruits_with_prefix.txt
rm -rf backup
echo "Cleanup completed"`,
        expectedTime: 12,
        concepts: ['file reading', 'text processing', 'sed', 'grep', 'cut', 'file permissions']
      },
      {
        id: 'bash-advanced-1',
        title: 'Advanced Scripting and Error Handling',
        description: 'Advanced bash features including error handling and process management',
        difficulty: 'advanced',
        code: `#!/bin/bash

# Error handling
set -e  # Exit on any error
set -u  # Exit on undefined variables
set -o pipefail  # Exit on pipe failures

# Custom error handling function
handle_error() {
    echo "Error occurred in line \$1"
    echo "Error code: \$2"
    exit 1
}

# Set error trap
trap 'handle_error \$LINENO \$?' ERR

# Logging function
log() {
    echo "[\$(date '+%Y-%m-%d %H:%M:%S')] \$1" | tee -a script.log
}

# Function to check if command exists
command_exists() {
    command -v "\$1" >/dev/null 2>&1
}

# Function to backup files with error handling
backup_files() {
    local source_dir=\$1
    local backup_dir=\$2
    
    if [ ! -d "\$source_dir" ]; then
        log "ERROR: Source directory \$source_dir does not exist"
        return 1
    fi
    
    # Create backup directory if it doesn't exist
    mkdir -p "\$backup_dir"
    
    # Create timestamped backup
    local timestamp=\$(date +%Y%m%d_%H%M%S)
    local backup_path="\$backup_dir/backup_\$timestamp"
    
    log "Starting backup from \$source_dir to \$backup_path"
    
    if cp -r "\$source_dir" "\$backup_path"; then
        log "Backup completed successfully: \$backup_path"
        return 0
    else
        log "ERROR: Backup failed"
        return 1
    fi
}

# Function to monitor system resources
monitor_system() {
    log "=== System Monitoring ==="
    
    # Check disk usage
    log "Disk usage:"
    df -h | grep -E '^/dev/' | while read line; do
        log "  \$line"
    done
    
    # Check memory usage
    log "Memory usage:"
    free -h | while read line; do
        log "  \$line"
    done
    
    # Check running processes
    log "Top 5 processes by CPU usage:"
    ps aux --sort=-%cpu | head -6 | while read line; do
        log "  \$line"
    done
}

# Function to send email notification (simulated)
send_notification() {
    local message=\$1
    local recipient=\${2:-"admin@company.com"}
    
    log "Sending notification to \$recipient: \$message"
    # In real scenario, you would use mail command or curl to send email
    echo "Email notification: \$message" >> notifications.log
}

# Main execution
main() {
    log "Script started"
    
    # Check required commands
    if ! command_exists "ps"; then
        log "ERROR: ps command not found"
        exit 1
    fi
    
    # Monitor system
    monitor_system
    
    # Create test directory and files
    test_dir="/tmp/bash_test_\$\$"
    mkdir -p "\$test_dir"
    echo "Test file 1" > "\$test_dir/file1.txt"
    echo "Test file 2" > "\$test_dir/file2.txt"
    
    # Backup test directory
    if backup_files "\$test_dir" "/tmp/backups"; then
        send_notification "Backup completed successfully"
    else
        send_notification "Backup failed" "admin@company.com"
    fi
    
    # Cleanup
    rm -rf "\$test_dir"
    log "Script completed successfully"
}

# Run main function
main "\$@"`,
        expectedTime: 15,
        concepts: ['error handling', 'logging', 'process monitoring', 'system commands', 'traps']
      }
    ]
  },
  {
    language: 'typescript',
    languageName: 'TypeScript',
    lessons: [
      {
        id: 'typescript-basics-1',
        title: 'Types and Interfaces',
        description: 'Learn TypeScript type system and interface definitions',
        difficulty: 'beginner',
        code: `// Basic types
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "coding", "gaming"];

// Interface definition
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  isActive: boolean;
}

// Using the interface
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  isActive: true
};

// Function with typed parameters
function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age || 'unknown'} years old.\`;
}

// Union types
type Status = "pending" | "approved" | "rejected";
let currentStatus: Status = "pending";

// Generic types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: user,
  status: 200,
  message: "Success"
};

console.log(greetUser(user));
console.log("Current status:", currentStatus);`,
        expectedTime: 10,
        concepts: ['types', 'interfaces', 'optional properties', 'union types', 'generics']
      },
      {
        id: 'typescript-basics-2',
        title: 'Classes and Inheritance',
        description: 'Object-oriented programming with TypeScript classes',
        difficulty: 'beginner',
        code: `// Base class
class Animal {
  protected name: string;
  protected age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  public makeSound(): string {
    return "Some generic animal sound";
  }
  
  public getInfo(): string {
    return \`\${this.name} is \${this.age} years old\`;
  }
}

// Derived class
class Dog extends Animal {
  private breed: string;
  
  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }
  
  public makeSound(): string {
    return "Woof! Woof!";
  }
  
  public fetch(): string {
    return \`\${this.name} is fetching the ball!\`;
  }
  
  public getBreed(): string {
    return this.breed;
  }
}

// Abstract class
abstract class Shape {
  protected color: string;
  
  constructor(color: string) {
    this.color = color;
  }
  
  abstract getArea(): number;
  abstract getPerimeter(): number;
  
  public getColor(): string {
    return this.color;
  }
}

// Concrete class implementing abstract class
class Rectangle extends Shape {
  private width: number;
  private height: number;
  
  constructor(color: string, width: number, height: number) {
    super(color);
    this.width = width;
    this.height = height;
  }
  
  public getArea(): number {
    return this.width * this.height;
  }
  
  public getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Usage
const dog = new Dog("Buddy", 3, "Golden Retriever");
console.log(dog.makeSound());
console.log(dog.fetch());
console.log(dog.getInfo());

const rectangle = new Rectangle("blue", 10, 5);
console.log(\`Rectangle area: \${rectangle.getArea()}\`);
console.log(\`Rectangle perimeter: \${rectangle.getPerimeter()}\`);`,
        expectedTime: 12,
        concepts: ['classes', 'inheritance', 'abstract classes', 'access modifiers', 'super()']
      },
      {
        id: 'typescript-intermediate-1',
        title: 'Advanced Types and Utility Types',
        description: 'Master advanced TypeScript type features and utility types',
        difficulty: 'intermediate',
        code: `// Utility types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Required - makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick - select specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// Omit - exclude specific properties
type UserWithoutDates = Omit<User, 'createdAt'>;

// Record - create object type with specific keys and values
type UserRoles = Record<string, string[]>;

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Template literal types
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // "onClick"

// Function overloads
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): boolean;
function processValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value * 2;
  } else {
    return !value;
  }
}

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Usage examples
const partialUser: PartialUser = { name: "Alice" };
const userBasicInfo: UserBasicInfo = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

const userRoles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read']
};

console.log(processValue("hello")); // "HELLO"
console.log(processValue(5)); // 10
console.log(processValue(true)); // false

logLength("Hello World"); // 11
logLength([1, 2, 3, 4, 5]); // 5`,
        expectedTime: 12,
        concepts: ['utility types', 'conditional types', 'mapped types', 'function overloads', 'generic constraints']
      },
      {
        id: 'typescript-intermediate-2',
        title: 'Async/Await and Error Handling',
        description: 'Handle asynchronous operations and errors in TypeScript',
        difficulty: 'intermediate',
        code: `// Promise-based function with proper typing
function fetchUserData(userId: number): Promise<{ id: number; name: string; email: string }> {
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

// Async/await with error handling
async function getUserInfo(userId: number): Promise<{ id: number; name: string; email: string } | null> {
  try {
    console.log("Fetching user data...");
    const user = await fetchUserData(userId);
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

// Custom error class
class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  
  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Function that throws custom error
async function validateUser(userId: number): Promise<void> {
  if (userId <= 0) {
    throw new ApiError("Invalid user ID", 400);
  }
  
  if (userId > 1000) {
    throw new ApiError("User not found", 404);
  }
}

// Multiple async operations
async function processUsers(userIds: number[]): Promise<Array<{ id: number; name: string; email: string } | null>> {
  const promises = userIds.map(async (id) => {
    try {
      await validateUser(id);
      return await fetchUserData(id);
    } catch (error) {
      console.error(\`Failed to process user \${id}:\`, error);
      return null;
    }
  });
  
  return Promise.all(promises);
}

// Error handling wrapper
async function safeAsyncOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error("Operation failed:", error);
    return fallback;
  }
}

// Usage
async function main() {
  // Single user
  const user = await getUserInfo(1);
  console.log("User result:", user);
  
  // Multiple users
  const users = await processUsers([1, 2, 3, -1, 1001]);
  console.log("Users result:", users);
  
  // Safe operation
  const safeResult = await safeAsyncOperation(
    () => fetchUserData(5),
    { id: 0, name: "Unknown", email: "unknown@example.com" }
  );
  console.log("Safe result:", safeResult);
}

main().catch(console.error);`,
        expectedTime: 12,
        concepts: ['async/await', 'error handling', 'custom errors', 'Promise.all', 'error boundaries']
      },
      {
        id: 'typescript-advanced-1',
        title: 'Decorators and Advanced Patterns',
        description: 'Advanced TypeScript features including decorators and design patterns',
        difficulty: 'advanced',
        code: `// Decorator function
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyName} with args:\`, args);
    const result = method.apply(this, args);
    console.log(\`\${propertyName} returned:\`, result);
    return result;
  };
}

// Class decorator
function Component(config: { selector: string; template: string }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      selector = config.selector;
      template = config.template;
    };
  };
}

// Method decorator with parameters
function Validate(min: number, max: number) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (value: number) {
      if (value < min || value > max) {
        throw new Error(\`Value must be between \${min} and \${max}\`);
      }
      return method.call(this, value);
    };
  };
}

// Property decorator
function Format(format: string) {
  return function (target: any, propertyName: string) {
    let value = target[propertyName];
    
    const getter = () => value;
    const setter = (newValue: any) => {
      if (format === 'uppercase' && typeof newValue === 'string') {
        value = newValue.toUpperCase();
      } else if (format === 'lowercase' && typeof newValue === 'string') {
        value = newValue.toLowerCase();
      } else {
        value = newValue;
      }
    };
    
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

// Using decorators
@Component({
  selector: 'app-user',
  template: '<div>User Component</div>'
})
class UserService {
  @Format('uppercase')
  private name: string = '';
  
  constructor() {}
  
  @Log
  @Validate(1, 100)
  setAge(age: number): void {
    console.log(\`Setting age to \${age}\`);
  }
  
  @Log
  setName(name: string): void {
    this.name = name;
  }
  
  getName(): string {
    return this.name;
  }
}

// Factory pattern with TypeScript
interface Product {
  name: string;
  price: number;
  getDescription(): string;
}

class Book implements Product {
  constructor(public name: string, public price: number, public author: string) {}
  
  getDescription(): string {
    return \`Book: \${this.name} by \${this.author} - $\${this.price}\`;
  }
}

class Electronics implements Product {
  constructor(public name: string, public price: number, public brand: string) {}
  
  getDescription(): string {
    return \`Electronics: \${this.name} by \${this.brand} - $\${this.price}\`;
  }
}

class ProductFactory {
  static createProduct(type: 'book' | 'electronics', name: string, price: number, extra: string): Product {
    switch (type) {
      case 'book':
        return new Book(name, price, extra);
      case 'electronics':
        return new Electronics(name, price, extra);
      default:
        throw new Error(\`Unknown product type: \${type}\`);
    }
  }
}

// Usage
const userService = new UserService();
userService.setName('john doe');
userService.setAge(25);
console.log('User name:', userService.getName());

const book = ProductFactory.createProduct('book', 'TypeScript Guide', 29.99, 'John Smith');
const laptop = ProductFactory.createProduct('electronics', 'Gaming Laptop', 1299.99, 'TechBrand');

console.log(book.getDescription());
console.log(laptop.getDescription());`,
        expectedTime: 15,
        concepts: ['decorators', 'class decorators', 'method decorators', 'property decorators', 'factory pattern']
      }
    ]
  },
  {
    language: 'go',
    languageName: 'Go',
    lessons: [
      {
        id: 'go-basics-1',
        title: 'Variables and Basic Types',
        description: 'Learn Go syntax with variables, types, and basic operations',
        difficulty: 'beginner',
        code: `package main

import "fmt"

func main() {
    // Variable declarations
    var name string = "Alice"
    var age int = 25
    var height float64 = 5.6
    var isStudent bool = true
    
    // Short variable declaration
    city := "New York"
    score := 95.5
    
    // Multiple variable declaration
    var (
        firstName = "John"
        lastName  = "Doe"
        email     = "john@example.com"
    )
    
    // Constants
    const pi = 3.14159
    const company = "TechCorp"
    
    // Basic types
    var (
        intVal     int     = 42
        int8Val    int8    = 127
        int16Val   int16   = 32767
        int32Val   int32   = 2147483647
        int64Val   int64   = 9223372036854775807
        float32Val float32 = 3.14
        float64Val float64 = 3.14159265359
        boolVal    bool    = true
        stringVal  string  = "Hello, Go!"
    )
    
    // Arrays
    var numbers [5]int = [5]int{1, 2, 3, 4, 5}
    fruits := [3]string{"apple", "banana", "orange"}
    
    // Slices (dynamic arrays)
    colors := []string{"red", "green", "blue"}
    colors = append(colors, "yellow", "purple")
    
    // Maps
    person := map[string]interface{}{
        "name":  "Alice",
        "age":   25,
        "city":  "New York",
        "email": "alice@example.com",
    }
    
    // Output
    fmt.Println("Name:", name)
    fmt.Println("Age:", age)
    fmt.Println("Height:", height)
    fmt.Println("Is Student:", isStudent)
    fmt.Println("City:", city)
    fmt.Println("Score:", score)
    fmt.Println("Full Name:", firstName, lastName)
    fmt.Println("Email:", email)
    fmt.Println("PI:", pi)
    fmt.Println("Company:", company)
    
    fmt.Println("\\nNumbers array:", numbers)
    fmt.Println("Fruits array:", fruits)
    fmt.Println("Colors slice:", colors)
    fmt.Println("Person map:", person)
    
    // Type conversion
    var intFromFloat = int(float64Val)
    var stringFromInt = fmt.Sprintf("%d", intVal)
    
    fmt.Println("\\nType conversions:")
    fmt.Println("Int from float64:", intFromFloat)
    fmt.Println("String from int:", stringFromInt)
}`,
        expectedTime: 10,
        concepts: ['variables', 'types', 'constants', 'arrays', 'slices', 'maps', 'type conversion']
      },
      {
        id: 'go-basics-2',
        title: 'Functions and Control Flow',
        description: 'Master Go functions, loops, and conditional statements',
        difficulty: 'beginner',
        code: `package main

import "fmt"

// Basic function
func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

// Function with multiple parameters and return values
func calculate(a, b int) (int, int, int, int) {
    sum := a + b
    diff := a - b
    product := a * b
    quotient := a / b
    return sum, diff, product, quotient
}

// Function with named return values
func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        err = fmt.Errorf("division by zero")
        return
    }
    result = a / b
    return
}

// Variadic function
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// Function as parameter
func applyOperation(a, b int, operation func(int, int) int) int {
    return operation(a, b)
}

func main() {
    // Function calls
    greeting := greet("Alice")
    fmt.Println(greeting)
    
    sum, diff, product, quotient := calculate(10, 3)
    fmt.Printf("Sum: %d, Difference: %d, Product: %d, Quotient: %d\\n", 
               sum, diff, product, quotient)
    
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Division result:", result)
    }
    
    // Variadic function
    total := sum(1, 2, 3, 4, 5)
    fmt.Println("Sum of 1,2,3,4,5:", total)
    
    // Function as parameter
    add := func(a, b int) int { return a + b }
    multiply := func(a, b int) int { return a * b }
    
    fmt.Println("10 + 3 =", applyOperation(10, 3, add))
    fmt.Println("10 * 3 =", applyOperation(10, 3, multiply))
    
    // If-else statements
    age := 20
    if age >= 18 {
        fmt.Println("You are an adult")
    } else if age >= 13 {
        fmt.Println("You are a teenager")
    } else {
        fmt.Println("You are a child")
    }
    
    // Switch statement
    day := "Monday"
    switch day {
    case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
        fmt.Println("It's a weekday")
    case "Saturday", "Sunday":
        fmt.Println("It's a weekend")
    default:
        fmt.Println("Invalid day")
    }
    
    // For loops
    fmt.Println("\\nFor loop (traditional):")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()
    
    // For loop (while-style)
    fmt.Println("\\nWhile-style loop:")
    count := 1
    for count <= 3 {
        fmt.Printf("Count: %d\\n", count)
        count++
    }
    
    // Range loop
    fmt.Println("\\nRange loop over slice:")
    fruits := []string{"apple", "banana", "orange"}
    for index, fruit := range fruits {
        fmt.Printf("%d: %s\\n", index, fruit)
    }
    
    // Range loop over map
    fmt.Println("\\nRange loop over map:")
    person := map[string]string{
        "name":  "Alice",
        "city":  "New York",
        "email": "alice@example.com",
    }
    for key, value := range person {
        fmt.Printf("%s: %s\\n", key, value)
    }
}`,
        expectedTime: 12,
        concepts: ['functions', 'multiple return values', 'variadic functions', 'if-else', 'switch', 'for loops', 'range']
      },
      {
        id: 'go-intermediate-1',
        title: 'Structs and Methods',
        description: 'Object-oriented programming with Go structs and methods',
        difficulty: 'intermediate',
        code: `package main

import (
    "fmt"
    "math"
)

// Basic struct
type Person struct {
    Name    string
    Age     int
    Email   string
    Address Address
}

type Address struct {
    Street  string
    City    string
    Country string
    ZipCode string
}

// Method with value receiver
func (p Person) GetFullInfo() string {
    return fmt.Sprintf("Name: %s, Age: %d, Email: %s, City: %s", 
                      p.Name, p.Age, p.Email, p.Address.City)
}

// Method with pointer receiver
func (p *Person) SetAge(age int) {
    if age > 0 && age < 150 {
        p.Age = age
    }
}

// Method with pointer receiver for updating
func (p *Person) UpdateEmail(email string) {
    p.Email = email
}

// Embedded struct (composition)
type Employee struct {
    Person
    EmployeeID int
    Department string
    Salary     float64
}

// Method for Employee
func (e Employee) GetEmployeeInfo() string {
    return fmt.Sprintf("Employee ID: %d, Department: %s, Salary: $%.2f", 
                      e.EmployeeID, e.Department, e.Salary)
}

// Interface definition
type Shape interface {
    Area() float64
    Perimeter() float64
    GetName() string
}

// Rectangle struct implementing Shape interface
type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

func (r Rectangle) GetName() string {
    return "Rectangle"
}

// Circle struct implementing Shape interface
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

func (c Circle) GetName() string {
    return "Circle"
}

// Function that works with interface
func printShapeInfo(shape Shape) {
    fmt.Printf("%s - Area: %.2f, Perimeter: %.2f\\n", 
               shape.GetName(), shape.Area(), shape.Perimeter())
}

// Constructor function
func NewPerson(name, email string, age int) *Person {
    return &Person{
        Name:  name,
        Email: email,
        Age:   age,
        Address: Address{
            City:    "Unknown",
            Country: "Unknown",
        },
    }
}

func main() {
    // Create Person using struct literal
    person1 := Person{
        Name:  "Alice",
        Age:   25,
        Email: "alice@example.com",
        Address: Address{
            Street:  "123 Main St",
            City:    "New York",
            Country: "USA",
            ZipCode: "10001",
        },
    }
    
    // Create Person using constructor
    person2 := NewPerson("Bob", "bob@example.com", 30)
    person2.Address = Address{
        Street:  "456 Oak Ave",
        City:    "Los Angeles",
        Country: "USA",
        ZipCode: "90210",
    }
    
    // Use methods
    fmt.Println("Person 1 Info:", person1.GetFullInfo())
    fmt.Println("Person 2 Info:", person2.GetFullInfo())
    
    // Update using pointer receiver
    person1.SetAge(26)
    person1.UpdateEmail("alice.new@example.com")
    fmt.Println("Updated Person 1:", person1.GetFullInfo())
    
    // Create Employee (embedded struct)
    employee := Employee{
        Person: Person{
            Name:  "Charlie",
            Age:   28,
            Email: "charlie@company.com",
            Address: Address{
                City: "San Francisco",
            },
        },
        EmployeeID: 1001,
        Department: "Engineering",
        Salary:     75000.00,
    }
    
    fmt.Println("\\nEmployee Info:")
    fmt.Println(employee.GetFullInfo())
    fmt.Println(employee.GetEmployeeInfo())
    
    // Interface usage
    shapes := []Shape{
        Rectangle{Width: 10, Height: 5},
        Circle{Radius: 7},
        Rectangle{Width: 3, Height: 4},
    }
    
    fmt.Println("\\nShape Information:")
    for _, shape := range shapes {
        printShapeInfo(shape)
    }
}`,
        expectedTime: 12,
        concepts: ['structs', 'methods', 'value receivers', 'pointer receivers', 'embedded structs', 'interfaces']
      },
      {
        id: 'go-intermediate-2',
        title: 'Goroutines and Channels',
        description: 'Concurrent programming with goroutines and channels',
        difficulty: 'intermediate',
        code: `package main

import (
    "fmt"
    "sync"
    "time"
)

// Basic goroutine
func sayHello(name string) {
    for i := 0; i < 3; i++ {
        fmt.Printf("Hello %s! (goroutine %d)\\n", name, i+1)
        time.Sleep(100 * time.Millisecond)
    }
}

// Function that sends data to channel
func sendNumbers(ch chan int, count int) {
    for i := 1; i <= count; i++ {
        ch <- i
        fmt.Printf("Sent: %d\\n", i)
        time.Sleep(200 * time.Millisecond)
    }
    close(ch)
}

// Function that receives data from channel
func receiveNumbers(ch chan int, done chan bool) {
    for num := range ch {
        fmt.Printf("Received: %d\\n", num)
        time.Sleep(100 * time.Millisecond)
    }
    done <- true
}

// Worker function for worker pool pattern
func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, job)
        time.Sleep(500 * time.Millisecond) // Simulate work
        results <- job * 2
    }
}

// Function using WaitGroup
func processWithWaitGroup(wg *sync.WaitGroup, id int) {
    defer wg.Done()
    fmt.Printf("Goroutine %d starting\\n", id)
    time.Sleep(1 * time.Second)
    fmt.Printf("Goroutine %d finished\\n", id)
}

// Function using Mutex for synchronization
type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    fmt.Println("=== Basic Goroutines ===")
    
    // Start goroutines
    go sayHello("Alice")
    go sayHello("Bob")
    
    // Wait for goroutines to complete
    time.Sleep(1 * time.Second)
    
    fmt.Println("\\n=== Channels ===")
    
    // Create channels
    numbers := make(chan int, 3) // Buffered channel
    done := make(chan bool)
    
    // Start goroutines
    go sendNumbers(numbers, 5)
    go receiveNumbers(numbers, done)
    
    // Wait for completion
    <-done
    
    fmt.Println("\\n=== Worker Pool Pattern ===")
    
    // Create channels for worker pool
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    
    // Start workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Send jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Collect results
    for r := 1; r <= 5; r++ {
        result := <-results
        fmt.Printf("Result: %d\\n", result)
    }
    
    fmt.Println("\\n=== WaitGroup ===")
    
    var wg sync.WaitGroup
    
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go processWithWaitGroup(&wg, i)
    }
    
    wg.Wait()
    fmt.Println("All goroutines completed")
    
    fmt.Println("\\n=== Mutex Synchronization ===")
    
    counter := &Counter{}
    var wg2 sync.WaitGroup
    
    // Start multiple goroutines that increment counter
    for i := 0; i < 10; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            for j := 0; j < 100; j++ {
                counter.Increment()
            }
        }()
    }
    
    wg2.Wait()
    fmt.Printf("Final counter value: %d\\n", counter.Value())
    
    fmt.Println("\\n=== Select Statement ===")
    
    ch1 := make(chan string)
    ch2 := make(chan string)
    
    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "Message from channel 1"
    }()
    
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "Message from channel 2"
    }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("Received:", msg1)
        case msg2 := <-ch2:
            fmt.Println("Received:", msg2)
        case <-time.After(3 * time.Second):
            fmt.Println("Timeout!")
        }
    }
}`,
        expectedTime: 12,
        concepts: ['goroutines', 'channels', 'buffered channels', 'worker pools', 'WaitGroup', 'Mutex', 'select']
      },
      {
        id: 'go-advanced-1',
        title: 'Error Handling and Advanced Patterns',
        description: 'Advanced Go features including error handling, reflection, and design patterns',
        difficulty: 'advanced',
        code: `package main

import (
    "errors"
    "fmt"
    "reflect"
    "time"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("validation error in field '%s': %s", e.Field, e.Message)
}

// Function that returns custom error
func validateUser(name, email string) error {
    if name == "" {
        return ValidationError{Field: "name", Message: "name is required"}
    }
    if email == "" {
        return ValidationError{Field: "email", Message: "email is required"}
    }
    if len(email) < 5 {
        return ValidationError{Field: "email", Message: "email is too short"}
    }
    return nil
}

// Generic function with type constraints
type Numeric interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 | ~float32 | ~float64
}

func Max[T Numeric](a, b T) T {
    if a > b {
        return a
    }
    return b
}

// Generic struct
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, error) {
    if len(s.items) == 0 {
        var zero T
        return zero, errors.New("stack is empty")
    }
    index := len(s.items) - 1
    item := s.items[index]
    s.items = s.items[:index]
    return item, nil
}

func (s *Stack[T]) IsEmpty() bool {
    return len(s.items) == 0
}

// Reflection example
func inspectValue(v interface{}) {
    t := reflect.TypeOf(v)
    val := reflect.ValueOf(v)
    
    fmt.Printf("Type: %s\\n", t)
    fmt.Printf("Kind: %s\\n", t.Kind())
    fmt.Printf("Value: %v\\n", val)
    
    if t.Kind() == reflect.Struct {
        fmt.Println("Fields:")
        for i := 0; i < t.NumField(); i++ {
            field := t.Field(i)
            fieldValue := val.Field(i)
            fmt.Printf("  %s: %v\\n", field.Name, fieldValue)
        }
    }
}

// Observer pattern
type Observer interface {
    Update(message string)
}

type Subject struct {
    observers []Observer
    message   string
}

func (s *Subject) Attach(observer Observer) {
    s.observers = append(s.observers, observer)
}

func (s *Subject) Notify() {
    for _, observer := range s.observers {
        observer.Update(s.message)
    }
}

func (s *Subject) SetMessage(message string) {
    s.message = message
    s.Notify()
}

type ConcreteObserver struct {
    name string
}

func (o ConcreteObserver) Update(message string) {
    fmt.Printf("Observer %s received: %s\\n", o.name, message)
}

// Context pattern for cancellation
func longRunningTask(done <-chan struct{}) {
    for {
        select {
        case <-done:
            fmt.Println("Task cancelled")
            return
        default:
            fmt.Println("Working...")
            time.Sleep(500 * time.Millisecond)
        }
    }
}

// Builder pattern
type UserBuilder struct {
    name    string
    email   string
    age     int
    address string
}

func NewUserBuilder() *UserBuilder {
    return &UserBuilder{}
}

func (b *UserBuilder) SetName(name string) *UserBuilder {
    b.name = name
    return b
}

func (b *UserBuilder) SetEmail(email string) *UserBuilder {
    b.email = email
    return b
}

func (b *UserBuilder) SetAge(age int) *UserBuilder {
    b.age = age
    return b
}

func (b *UserBuilder) SetAddress(address string) *UserBuilder {
    b.address = address
    return b
}

func (b *UserBuilder) Build() (string, error) {
    if b.name == "" {
        return "", errors.New("name is required")
    }
    if b.email == "" {
        return "", errors.New("email is required")
    }
    
    return fmt.Sprintf("User: %s, Email: %s, Age: %d, Address: %s", 
                      b.name, b.email, b.age, b.address), nil
}

func main() {
    fmt.Println("=== Error Handling ===")
    
    if err := validateUser("", "test@example.com"); err != nil {
        fmt.Printf("Validation error: %v\\n", err)
    }
    
    if err := validateUser("Alice", "short"); err != nil {
        fmt.Printf("Validation error: %v\\n", err)
    }
    
    fmt.Println("\\n=== Generics ===")
    
    fmt.Printf("Max of 10 and 20: %d\\n", Max(10, 20))
    fmt.Printf("Max of 3.14 and 2.71: %.2f\\n", Max(3.14, 2.71))
    
    // Generic stack
    intStack := &Stack[int]{}
    intStack.Push(1)
    intStack.Push(2)
    intStack.Push(3)
    
    for !intStack.IsEmpty() {
        item, err := intStack.Pop()
        if err != nil {
            fmt.Printf("Error: %v\\n", err)
            break
        }
        fmt.Printf("Popped: %d\\n", item)
    }
    
    fmt.Println("\\n=== Reflection ===")
    
    type Person struct {
        Name string
        Age  int
    }
    
    person := Person{Name: "Alice", Age: 25}
    inspectValue(person)
    inspectValue(42)
    inspectValue("Hello, Go!")
    
    fmt.Println("\\n=== Observer Pattern ===")
    
    subject := &Subject{}
    observer1 := &ConcreteObserver{name: "Observer1"}
    observer2 := &ConcreteObserver{name: "Observer2"}
    
    subject.Attach(observer1)
    subject.Attach(observer2)
    
    subject.SetMessage("Hello, Observers!")
    
    fmt.Println("\\n=== Context Cancellation ===")
    
    done := make(chan struct{})
    go longRunningTask(done)
    
    time.Sleep(2 * time.Second)
    close(done)
    time.Sleep(100 * time.Millisecond)
    
    fmt.Println("\\n=== Builder Pattern ===")
    
    user, err := NewUserBuilder().
        SetName("Alice").
        SetEmail("alice@example.com").
        SetAge(25).
        SetAddress("123 Main St").
        Build()
    
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
    } else {
        fmt.Println(user)
    }
}`,
        expectedTime: 15,
        concepts: ['custom errors', 'generics', 'reflection', 'observer pattern', 'context', 'builder pattern']
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
