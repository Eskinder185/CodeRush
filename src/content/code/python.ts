import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const pythonTrack: LanguageTrack = {
  "language": "python",
  "languageName": "Python",
  "description": "High-level language for automation, data work, and web services.",
  "lessons": [
    {
      "id": "python-basics-1",
      "title": "Hello World & Variables",
      "description": "Learn basic Python syntax with print statements and variable assignments",
      "difficulty": "beginner",
      "code": "# Hello World in Python\nprint(\"Hello, World!\")\n\n# Variables and basic data types\nname = \"Alice\"\nage = 25\nheight = 5.6\nis_student = True\n\n# String formatting\nprint(f\"Name: {name}\")\nprint(f\"Age: {age}\")\nprint(f\"Height: {height} feet\")\nprint(f\"Is student: {is_student}\")",
      "expectedTime": 5,
      "concepts": [
        "print statements",
        "variables",
        "data types",
        "f-strings"
      ]
    },
    {
      "id": "python-basics-2",
      "title": "Lists and Loops",
      "description": "Master Python lists and basic loop structures",
      "difficulty": "beginner",
      "code": "# Creating and manipulating lists\nfruits = [\"apple\", \"banana\", \"orange\"]\nnumbers = [1, 2, 3, 4, 5]\n\n# Adding items to lists\nfruits.append(\"grape\")\nnumbers.insert(0, 0)\n\n# For loops\nfor fruit in fruits:\n    print(f\"I like {fruit}\")\n\n# List comprehensions\nsquared_numbers = [x**2 for x in numbers]\nprint(squared_numbers)\n\n# While loops\ncount = 0\nwhile count < 3:\n    print(f\"Count: {count}\")\n    count += 1",
      "expectedTime": 8,
      "concepts": [
        "lists",
        "for loops",
        "while loops",
        "list comprehensions"
      ]
    },
    {
      "id": "python-intermediate-1",
      "title": "Functions and Conditionals",
      "description": "Create reusable functions and implement conditional logic",
      "difficulty": "intermediate",
      "code": "def calculate_grade(score):\n    \"\"\"Calculate letter grade based on score\"\"\"\n    if score >= 90:\n        return \"A\"\n    elif score >= 80:\n        return \"B\"\n    elif score >= 70:\n        return \"C\"\n    elif score >= 60:\n        return \"D\"\n    else:\n        return \"F\"\n\ndef process_students(student_scores):\n    \"\"\"Process a list of student scores\"\"\"\n    results = []\n    for name, score in student_scores.items():\n        grade = calculate_grade(score)\n        results.append(f\"{name}: {score} -> {grade}\")\n    return results\n\n# Example usage\nstudents = {\"Alice\": 95, \"Bob\": 78, \"Charlie\": 82}\ngrades = process_students(students)\nfor grade in grades:\n    print(grade)",
      "expectedTime": 10,
      "concepts": [
        "functions",
        "conditionals",
        "dictionaries",
        "docstrings"
      ]
    },
    {
      "id": "python-intermediate-2",
      "title": "Error Handling and Imports",
      "description": "Handle errors gracefully and work with external modules",
      "difficulty": "intermediate",
      "code": "import math\nfrom datetime import datetime, timedelta\n\ndef safe_divide(a, b):\n    \"\"\"Safely divide two numbers with error handling\"\"\"\n    try:\n        result = a / b\n        return result\n    except ZeroDivisionError:\n        print(\"Error: Cannot divide by zero\")\n        return None\n    except TypeError:\n        print(\"Error: Invalid input types\")\n        return None\n\ndef calculate_circle_area(radius):\n    \"\"\"Calculate circle area with input validation\"\"\"\n    try:\n        if radius < 0:\n            raise ValueError(\"Radius cannot be negative\")\n        return math.pi * radius ** 2\n    except ValueError as e:\n        print(f\"Value error: {e}\")\n        return None\n\n# Working with dates\nnow = datetime.now()\nfuture_date = now + timedelta(days=30)\nprint(f\"Today: {now.strftime('%Y-%m-%d')}\")\nprint(f\"30 days from now: {future_date.strftime('%Y-%m-%d')}\")",
      "expectedTime": 12,
      "concepts": [
        "try-except",
        "imports",
        "datetime",
        "input validation"
      ]
    },
    {
      "id": "python-advanced-1",
      "title": "Classes and Objects",
      "description": "Object-oriented programming with classes and inheritance",
      "difficulty": "advanced",
      "code": "class Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n        self.energy = 100\n    \n    def eat(self, food_amount):\n        self.energy += food_amount\n        print(f\"{self.name} ate and gained {food_amount} energy\")\n    \n    def make_sound(self):\n        return \"Some generic animal sound\"\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, \"Canine\")\n        self.breed = breed\n    \n    def make_sound(self):\n        return \"Woof!\"\n    \n    def fetch(self):\n        if self.energy >= 20:\n            self.energy -= 20\n            return f\"{self.name} fetched the ball!\"\n        else:\n            return f\"{self.name} is too tired to fetch\"\n\n# Usage\nmy_dog = Dog(\"Buddy\", \"Golden Retriever\")\nprint(my_dog.make_sound())\nprint(my_dog.fetch())",
      "expectedTime": 15,
      "concepts": [
        "classes",
        "inheritance",
        "super()",
        "method overriding"
      ]
    }
  ]
}
