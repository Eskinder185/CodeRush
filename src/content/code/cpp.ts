import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const cppTrack: LanguageTrack = {
  "language": "cpp",
  "languageName": "C++",
  "description": "High-performance language for systems, games, and embedded software.",
  "lessons": [
    {
      "id": "cpp-basics-1",
      "title": "Hello World & Variables",
      "description": "Learn basic C++ syntax with cout and variable declarations",
      "difficulty": "beginner",
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Hello World in C++\n    cout << \"Hello, World!\" << endl;\n    \n    // Variables and basic data types\n    string name = \"Alice\";\n    int age = 25;\n    double height = 5.6;\n    bool isStudent = true;\n    \n    // Output with cout\n    cout << \"Name: \" << name << endl;\n    cout << \"Age: \" << age << endl;\n    cout << \"Height: \" << height << \" feet\" << endl;\n    cout << \"Is student: \" << (isStudent ? \"true\" : \"false\") << endl;\n    \n    return 0;\n}",
      "expectedTime": 8,
      "concepts": [
        "#include",
        "cout",
        "variables",
        "data types",
        "endl"
      ]
    },
    {
      "id": "cpp-basics-2",
      "title": "Arrays and Loops",
      "description": "Master C++ arrays and different loop structures",
      "difficulty": "beginner",
      "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Traditional arrays\n    string fruits[] = {\"apple\", \"banana\", \"orange\"};\n    int numbers[] = {1, 2, 3, 4, 5};\n    int size = sizeof(numbers) / sizeof(numbers[0]);\n    \n    // For loops with traditional arrays\n    for (int i = 0; i < 3; i++) {\n        cout << fruits[i] << endl;\n    }\n    \n    // Range-based for loop (C++11)\n    for (const string& fruit : fruits) {\n        cout << \"I like \" << fruit << endl;\n    }\n    \n    // While loop\n    int count = 0;\n    while (count < 3) {\n        cout << \"Count: \" << count << endl;\n        count++;\n    }\n    \n    // Vector (dynamic array)\n    vector<int> doubled;\n    for (int i = 0; i < size; i++) {\n        doubled.push_back(numbers[i] * 2);\n    }\n    \n    cout << \"Doubled numbers: \";\n    for (int num : doubled) {\n        cout << num << \" \";\n    }\n    cout << endl;\n    \n    return 0;\n}",
      "expectedTime": 10,
      "concepts": [
        "arrays",
        "vectors",
        "for loops",
        "range-based loops",
        "while loops"
      ]
    },
    {
      "id": "cpp-intermediate-1",
      "title": "Functions and Classes",
      "description": "Create functions and basic class structures",
      "difficulty": "intermediate",
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Calculator {\nprivate:\n    double result;\n    \npublic:\n    // Constructor\n    Calculator() : result(0.0) {}\n    \n    // Methods\n    double add(double a, double b) {\n        result = a + b;\n        return result;\n    }\n    \n    double subtract(double a, double b) {\n        result = a - b;\n        return result;\n    }\n    \n    double multiply(double a, double b) {\n        result = a * b;\n        return result;\n    }\n    \n    double divide(double a, double b) {\n        if (b != 0) {\n            result = a / b;\n            return result;\n        } else {\n            cout << \"Error: Division by zero!\" << endl;\n            return 0;\n        }\n    }\n    \n    double getResult() const {\n        return result;\n    }\n};\n\n// Function outside class\nvoid displayResult(const string& operation, double value) {\n    cout << operation << \": \" << value << endl;\n}\n\nint main() {\n    Calculator calc;\n    \n    displayResult(\"Addition\", calc.add(10, 5));\n    displayResult(\"Subtraction\", calc.subtract(10, 5));\n    displayResult(\"Multiplication\", calc.multiply(10, 5));\n    displayResult(\"Division\", calc.divide(10, 5));\n    \n    return 0;\n}",
      "expectedTime": 12,
      "concepts": [
        "classes",
        "constructors",
        "methods",
        "const",
        "function parameters"
      ]
    },
    {
      "id": "cpp-intermediate-2",
      "title": "Pointers and References",
      "description": "Work with pointers, references, and memory management",
      "difficulty": "intermediate",
      "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nvoid demonstratePointers() {\n    int value = 42;\n    int* ptr = &value;  // Pointer to value\n    \n    cout << \"Value: \" << value << endl;\n    cout << \"Address: \" << &value << endl;\n    cout << \"Pointer value: \" << ptr << endl;\n    cout << \"Dereferenced: \" << *ptr << endl;\n    \n    // Modify through pointer\n    *ptr = 100;\n    cout << \"New value: \" << value << endl;\n}\n\nvoid demonstrateReferences() {\n    int original = 50;\n    int& ref = original;  // Reference to original\n    \n    cout << \"Original: \" << original << endl;\n    cout << \"Reference: \" << ref << endl;\n    \n    // Modify through reference\n    ref = 200;\n    cout << \"Modified original: \" << original << endl;\n}\n\nvoid demonstrateSmartPointers() {\n    // Smart pointer (C++11)\n    unique_ptr<int> smartPtr = make_unique<int>(300);\n    \n    cout << \"Smart pointer value: \" << *smartPtr << endl;\n    // Automatically deallocated when out of scope\n}\n\nint main() {\n    cout << \"=== Pointers ===\" << endl;\n    demonstratePointers();\n    \n    cout << \"\n=== References ===\" << endl;\n    demonstrateReferences();\n    \n    cout << \"\n=== Smart Pointers ===\" << endl;\n    demonstrateSmartPointers();\n    \n    return 0;\n}",
      "expectedTime": 12,
      "concepts": [
        "pointers",
        "references",
        "smart pointers",
        "memory management"
      ]
    },
    {
      "id": "cpp-advanced-1",
      "title": "Templates and STL",
      "description": "Generic programming with templates and Standard Template Library",
      "difficulty": "advanced",
      "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\n// Function template\ntemplate<typename T>\nT getMax(T a, T b) {\n    return (a > b) ? a : b;\n}\n\n// Class template\ntemplate<typename T>\nclass Stack {\nprivate:\n    vector<T> elements;\n    \npublic:\n    void push(const T& element) {\n        elements.push_back(element);\n    }\n    \n    T pop() {\n        if (elements.empty()) {\n            throw runtime_error(\"Stack is empty!\");\n        }\n        T element = elements.back();\n        elements.pop_back();\n        return element;\n    }\n    \n    bool empty() const {\n        return elements.empty();\n    }\n    \n    size_t size() const {\n        return elements.size();\n    }\n};\n\nint main() {\n    // Using function template\n    cout << \"Max of 10 and 20: \" << getMax(10, 20) << endl;\n    cout << \"Max of 3.14 and 2.71: \" << getMax(3.14, 2.71) << endl;\n    cout << \"Max of 'a' and 'z': \" << getMax('a', 'z') << endl;\n    \n    // Using class template\n    Stack<int> intStack;\n    intStack.push(10);\n    intStack.push(20);\n    intStack.push(30);\n    \n    cout << \"Stack size: \" << intStack.size() << endl;\n    \n    while (!intStack.empty()) {\n        cout << \"Popped: \" << intStack.pop() << endl;\n    }\n    \n    // STL algorithms\n    vector<int> numbers = {5, 2, 8, 1, 9, 3};\n    sort(numbers.begin(), numbers.end());\n    \n    cout << \"Sorted numbers: \";\n    for (int num : numbers) {\n        cout << num << \" \";\n    }\n    cout << endl;\n    \n    return 0;\n}",
      "expectedTime": 15,
      "concepts": [
        "templates",
        "STL",
        "generic programming",
        "algorithms"
      ]
    }
  ]
}
