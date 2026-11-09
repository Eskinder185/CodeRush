import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const javascriptTrack: LanguageTrack = {
  "language": "javascript",
  "languageName": "JavaScript",
  "description": "The language of the web, in browsers and on servers.",
  "lessons": [
    {
      "id": "js-basics-1",
      "title": "Variables and Console",
      "description": "Learn JavaScript basics with variables and console output",
      "difficulty": "beginner",
      "code": "// Variables in JavaScript\nlet name = \"Alice\";\nconst age = 25;\nvar city = \"New York\";\n\n// Console output\nconsole.log(\"Hello, World!\");\nconsole.log(`Name: ${name}`);\nconsole.log(`Age: ${age}`);\nconsole.log(`City: ${city}`);\n\n// Data types\nlet isStudent = true;\nlet score = 95.5;\nlet hobbies = [\"reading\", \"coding\", \"gaming\"];\n\nconsole.log(typeof name);    // string\nconsole.log(typeof age);     // number\nconsole.log(typeof isStudent); // boolean",
      "expectedTime": 6,
      "concepts": [
        "variables",
        "console.log",
        "template literals",
        "data types"
      ]
    },
    {
      "id": "js-basics-2",
      "title": "Arrays and Loops",
      "description": "Work with arrays and different loop types",
      "difficulty": "beginner",
      "code": "// Creating arrays\nlet fruits = [\"apple\", \"banana\", \"orange\"];\nlet numbers = [1, 2, 3, 4, 5];\n\n// Array methods\nfruits.push(\"grape\");\nnumbers.unshift(0);\n\n// For loops\nfor (let i = 0; i < fruits.length; i++) {\n    console.log(fruits[i]);\n}\n\n// For...of loop\nfor (let fruit of fruits) {\n    console.log(`I like ${fruit}`);\n}\n\n// Array methods\nlet doubled = numbers.map(num => num * 2);\nlet evens = numbers.filter(num => num % 2 === 0);\n\nconsole.log(\"Doubled:\", doubled);\nconsole.log(\"Even numbers:\", evens);",
      "expectedTime": 8,
      "concepts": [
        "arrays",
        "for loops",
        "array methods",
        "arrow functions"
      ]
    },
    {
      "id": "js-intermediate-1",
      "title": "Functions and Objects",
      "description": "Create functions and work with objects",
      "difficulty": "intermediate",
      "code": "// Function declarations\nfunction greet(name, age) {\n    return `Hello, ${name}! You are ${age} years old.`;\n}\n\n// Arrow functions\nconst calculateArea = (width, height) => {\n    return width * height;\n};\n\n// Objects\nconst person = {\n    name: \"Alice\",\n    age: 30,\n    city: \"San Francisco\",\n    greet: function() {\n        return `Hi, I'm ${this.name}`;\n    }\n};\n\n// Object methods\nperson.introduce = function() {\n    return `I'm ${this.name}, ${this.age} years old, from ${this.city}`;\n};\n\n// Usage\nconsole.log(greet(\"Bob\", 25));\nconsole.log(calculateArea(10, 5));\nconsole.log(person.greet());\nconsole.log(person.introduce());",
      "expectedTime": 10,
      "concepts": [
        "functions",
        "arrow functions",
        "objects",
        "methods"
      ]
    },
    {
      "id": "js-intermediate-2",
      "title": "Async/Await and Promises",
      "description": "Handle asynchronous operations with modern JavaScript",
      "difficulty": "intermediate",
      "code": "// Promise-based function\nfunction fetchUserData(userId) {\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            if (userId > 0) {\n                resolve({\n                    id: userId,\n                    name: \"John Doe\",\n                    email: \"john@example.com\"\n                });\n            } else {\n                reject(new Error(\"Invalid user ID\"));\n            }\n        }, 1000);\n    });\n}\n\n// Async/await usage\nasync function getUserInfo(userId) {\n    try {\n        console.log(\"Fetching user data...\");\n        const user = await fetchUserData(userId);\n        console.log(\"User found:\", user);\n        return user;\n    } catch (error) {\n        console.error(\"Error:\", error.message);\n        return null;\n    }\n}\n\n// Multiple async operations\nasync function processUsers(userIds) {\n    const promises = userIds.map(id => fetchUserData(id));\n    try {\n        const users = await Promise.all(promises);\n        console.log(\"All users:\", users);\n        return users;\n    } catch (error) {\n        console.error(\"Failed to fetch users:\", error);\n    }\n}",
      "expectedTime": 12,
      "concepts": [
        "promises",
        "async/await",
        "error handling",
        "Promise.all"
      ]
    },
    {
      "id": "js-advanced-1",
      "title": "Classes and Modules",
      "description": "Object-oriented programming and module patterns",
      "difficulty": "advanced",
      "code": "// ES6 Classes\nclass User {\n    constructor(name, email) {\n        this.name = name;\n        this.email = email;\n        this.createdAt = new Date();\n    }\n    \n    greet() {\n        return `Hello, I'm ${this.name}`;\n    }\n    \n    getInfo() {\n        return {\n            name: this.name,\n            email: this.email,\n            memberSince: this.createdAt.getFullYear()\n        };\n    }\n}\n\nclass Admin extends User {\n    constructor(name, email, permissions) {\n        super(name, email);\n        this.permissions = permissions;\n    }\n    \n    greet() {\n        return `Hello, I'm ${this.name}, an admin`;\n    }\n    \n    hasPermission(permission) {\n        return this.permissions.includes(permission);\n    }\n}\n\n// Usage\nconst admin = new Admin(\"Alice\", \"alice@admin.com\", [\"read\", \"write\", \"delete\"]);\nconsole.log(admin.greet());\nconsole.log(admin.hasPermission(\"delete\"));",
      "expectedTime": 15,
      "concepts": [
        "classes",
        "inheritance",
        "super()",
        "ES6 modules"
      ]
    }
  ]
}
