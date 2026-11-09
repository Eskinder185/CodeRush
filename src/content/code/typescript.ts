import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const typescriptTrack: LanguageTrack = {
  "language": "typescript",
  "languageName": "TypeScript",
  "description": "JavaScript with static types for large applications.",
  "lessons": [
    {
      "id": "typescript-basics-1",
      "title": "Types and Interfaces",
      "description": "Learn TypeScript type system and interface definitions",
      "difficulty": "beginner",
      "code": "// Basic types\nlet name: string = \"Alice\";\nlet age: number = 25;\nlet isStudent: boolean = true;\nlet hobbies: string[] = [\"reading\", \"coding\", \"gaming\"];\n\n// Interface definition\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  age?: number; // Optional property\n  isActive: boolean;\n}\n\n// Using the interface\nconst user: User = {\n  id: 1,\n  name: \"John Doe\",\n  email: \"john@example.com\",\n  age: 30,\n  isActive: true\n};\n\n// Function with typed parameters\nfunction greetUser(user: User): string {\n  return `Hello, ${user.name}! You are ${user.age || 'unknown'} years old.`;\n}\n\n// Union types\ntype Status = \"pending\" | \"approved\" | \"rejected\";\nlet currentStatus: Status = \"pending\";\n\n// Generic types\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n  message: string;\n}\n\nconst userResponse: ApiResponse<User> = {\n  data: user,\n  status: 200,\n  message: \"Success\"\n};\n\nconsole.log(greetUser(user));\nconsole.log(\"Current status:\", currentStatus);",
      "expectedTime": 10,
      "concepts": [
        "types",
        "interfaces",
        "optional properties",
        "union types",
        "generics"
      ]
    },
    {
      "id": "typescript-basics-2",
      "title": "Classes and Inheritance",
      "description": "Object-oriented programming with TypeScript classes",
      "difficulty": "beginner",
      "code": "// Base class\nclass Animal {\n  protected name: string;\n  protected age: number;\n  \n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  public makeSound(): string {\n    return \"Some generic animal sound\";\n  }\n  \n  public getInfo(): string {\n    return `${this.name} is ${this.age} years old`;\n  }\n}\n\n// Derived class\nclass Dog extends Animal {\n  private breed: string;\n  \n  constructor(name: string, age: number, breed: string) {\n    super(name, age);\n    this.breed = breed;\n  }\n  \n  public makeSound(): string {\n    return \"Woof! Woof!\";\n  }\n  \n  public fetch(): string {\n    return `${this.name} is fetching the ball!`;\n  }\n  \n  public getBreed(): string {\n    return this.breed;\n  }\n}\n\n// Abstract class\nabstract class Shape {\n  protected color: string;\n  \n  constructor(color: string) {\n    this.color = color;\n  }\n  \n  abstract getArea(): number;\n  abstract getPerimeter(): number;\n  \n  public getColor(): string {\n    return this.color;\n  }\n}\n\n// Concrete class implementing abstract class\nclass Rectangle extends Shape {\n  private width: number;\n  private height: number;\n  \n  constructor(color: string, width: number, height: number) {\n    super(color);\n    this.width = width;\n    this.height = height;\n  }\n  \n  public getArea(): number {\n    return this.width * this.height;\n  }\n  \n  public getPerimeter(): number {\n    return 2 * (this.width + this.height);\n  }\n}\n\n// Usage\nconst dog = new Dog(\"Buddy\", 3, \"Golden Retriever\");\nconsole.log(dog.makeSound());\nconsole.log(dog.fetch());\nconsole.log(dog.getInfo());\n\nconst rectangle = new Rectangle(\"blue\", 10, 5);\nconsole.log(`Rectangle area: ${rectangle.getArea()}`);\nconsole.log(`Rectangle perimeter: ${rectangle.getPerimeter()}`);",
      "expectedTime": 12,
      "concepts": [
        "classes",
        "inheritance",
        "abstract classes",
        "access modifiers",
        "super()"
      ]
    },
    {
      "id": "typescript-intermediate-1",
      "title": "Advanced Types and Utility Types",
      "description": "Master advanced TypeScript type features and utility types",
      "difficulty": "intermediate",
      "code": "// Utility types\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  age: number;\n  isActive: boolean;\n  createdAt: Date;\n}\n\n// Partial - makes all properties optional\ntype PartialUser = Partial<User>;\n\n// Required - makes all properties required\ntype RequiredUser = Required<PartialUser>;\n\n// Pick - select specific properties\ntype UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;\n\n// Omit - exclude specific properties\ntype UserWithoutDates = Omit<User, 'createdAt'>;\n\n// Record - create object type with specific keys and values\ntype UserRoles = Record<string, string[]>;\n\n// Conditional types\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\n// Mapped types\ntype ReadonlyUser = {\n  readonly [K in keyof User]: User[K];\n};\n\n// Template literal types\ntype EventName<T extends string> = `on${Capitalize<T>}`;\ntype ClickEvent = EventName<'click'>; // \"onClick\"\n\n// Function overloads\nfunction processValue(value: string): string;\nfunction processValue(value: number): number;\nfunction processValue(value: boolean): boolean;\nfunction processValue(value: string | number | boolean): string | number | boolean {\n  if (typeof value === 'string') {\n    return value.toUpperCase();\n  } else if (typeof value === 'number') {\n    return value * 2;\n  } else {\n    return !value;\n  }\n}\n\n// Generic constraints\ninterface Lengthwise {\n  length: number;\n}\n\nfunction logLength<T extends Lengthwise>(arg: T): T {\n  console.log(arg.length);\n  return arg;\n}\n\n// Usage examples\nconst partialUser: PartialUser = { name: \"Alice\" };\nconst userBasicInfo: UserBasicInfo = {\n  id: 1,\n  name: \"John\",\n  email: \"john@example.com\"\n};\n\nconst userRoles: UserRoles = {\n  admin: ['read', 'write', 'delete'],\n  user: ['read']\n};\n\nconsole.log(processValue(\"hello\")); // \"HELLO\"\nconsole.log(processValue(5)); // 10\nconsole.log(processValue(true)); // false\n\nlogLength(\"Hello World\"); // 11\nlogLength([1, 2, 3, 4, 5]); // 5",
      "expectedTime": 12,
      "concepts": [
        "utility types",
        "conditional types",
        "mapped types",
        "function overloads",
        "generic constraints"
      ]
    },
    {
      "id": "typescript-intermediate-2",
      "title": "Async/Await and Error Handling",
      "description": "Handle asynchronous operations and errors in TypeScript",
      "difficulty": "intermediate",
      "code": "// Promise-based function with proper typing\nfunction fetchUserData(userId: number): Promise<{ id: number; name: string; email: string }> {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (userId > 0) {\n        resolve({\n          id: userId,\n          name: \"John Doe\",\n          email: \"john@example.com\"\n        });\n      } else {\n        reject(new Error(\"Invalid user ID\"));\n      }\n    }, 1000);\n  });\n}\n\n// Async/await with error handling\nasync function getUserInfo(userId: number): Promise<{ id: number; name: string; email: string } | null> {\n  try {\n    console.log(\"Fetching user data...\");\n    const user = await fetchUserData(userId);\n    console.log(\"User found:\", user);\n    return user;\n  } catch (error) {\n    console.error(\"Error:\", error instanceof Error ? error.message : \"Unknown error\");\n    return null;\n  }\n}\n\n// Custom error class\nclass ApiError extends Error {\n  public statusCode: number;\n  public isOperational: boolean;\n  \n  constructor(message: string, statusCode: number, isOperational: boolean = true) {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = isOperational;\n    \n    Error.captureStackTrace(this, this.constructor);\n  }\n}\n\n// Function that throws custom error\nasync function validateUser(userId: number): Promise<void> {\n  if (userId <= 0) {\n    throw new ApiError(\"Invalid user ID\", 400);\n  }\n  \n  if (userId > 1000) {\n    throw new ApiError(\"User not found\", 404);\n  }\n}\n\n// Multiple async operations\nasync function processUsers(userIds: number[]): Promise<Array<{ id: number; name: string; email: string } | null>> {\n  const promises = userIds.map(async (id) => {\n    try {\n      await validateUser(id);\n      return await fetchUserData(id);\n    } catch (error) {\n      console.error(`Failed to process user ${id}:`, error);\n      return null;\n    }\n  });\n  \n  return Promise.all(promises);\n}\n\n// Error handling wrapper\nasync function safeAsyncOperation<T>(\n  operation: () => Promise<T>,\n  fallback: T\n): Promise<T> {\n  try {\n    return await operation();\n  } catch (error) {\n    console.error(\"Operation failed:\", error);\n    return fallback;\n  }\n}\n\n// Usage\nasync function main() {\n  // Single user\n  const user = await getUserInfo(1);\n  console.log(\"User result:\", user);\n  \n  // Multiple users\n  const users = await processUsers([1, 2, 3, -1, 1001]);\n  console.log(\"Users result:\", users);\n  \n  // Safe operation\n  const safeResult = await safeAsyncOperation(\n    () => fetchUserData(5),\n    { id: 0, name: \"Unknown\", email: \"unknown@example.com\" }\n  );\n  console.log(\"Safe result:\", safeResult);\n}\n\nmain().catch(console.error);",
      "expectedTime": 12,
      "concepts": [
        "async/await",
        "error handling",
        "custom errors",
        "Promise.all",
        "error boundaries"
      ]
    },
    {
      "id": "typescript-advanced-1",
      "title": "Decorators and Advanced Patterns",
      "description": "Advanced TypeScript features including decorators and design patterns",
      "difficulty": "advanced",
      "code": "// Decorator function\nfunction Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {\n  const method = descriptor.value;\n  \n  descriptor.value = function (...args: any[]) {\n    console.log(`Calling ${propertyName} with args:`, args);\n    const result = method.apply(this, args);\n    console.log(`${propertyName} returned:`, result);\n    return result;\n  };\n}\n\n// Class decorator\nfunction Component(config: { selector: string; template: string }) {\n  return function <T extends { new (...args: any[]): {} }>(constructor: T) {\n    return class extends constructor {\n      selector = config.selector;\n      template = config.template;\n    };\n  };\n}\n\n// Method decorator with parameters\nfunction Validate(min: number, max: number) {\n  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {\n    const method = descriptor.value;\n    \n    descriptor.value = function (value: number) {\n      if (value < min || value > max) {\n        throw new Error(`Value must be between ${min} and ${max}`);\n      }\n      return method.call(this, value);\n    };\n  };\n}\n\n// Property decorator\nfunction Format(format: string) {\n  return function (target: any, propertyName: string) {\n    let value = target[propertyName];\n    \n    const getter = () => value;\n    const setter = (newValue: any) => {\n      if (format === 'uppercase' && typeof newValue === 'string') {\n        value = newValue.toUpperCase();\n      } else if (format === 'lowercase' && typeof newValue === 'string') {\n        value = newValue.toLowerCase();\n      } else {\n        value = newValue;\n      }\n    };\n    \n    Object.defineProperty(target, propertyName, {\n      get: getter,\n      set: setter,\n      enumerable: true,\n      configurable: true\n    });\n  };\n}\n\n// Using decorators\n@Component({\n  selector: 'app-user',\n  template: '<div>User Component</div>'\n})\nclass UserService {\n  @Format('uppercase')\n  private name: string = '';\n  \n  constructor() {}\n  \n  @Log\n  @Validate(1, 100)\n  setAge(age: number): void {\n    console.log(`Setting age to ${age}`);\n  }\n  \n  @Log\n  setName(name: string): void {\n    this.name = name;\n  }\n  \n  getName(): string {\n    return this.name;\n  }\n}\n\n// Factory pattern with TypeScript\ninterface Product {\n  name: string;\n  price: number;\n  getDescription(): string;\n}\n\nclass Book implements Product {\n  constructor(public name: string, public price: number, public author: string) {}\n  \n  getDescription(): string {\n    return `Book: ${this.name} by ${this.author} - $${this.price}`;\n  }\n}\n\nclass Electronics implements Product {\n  constructor(public name: string, public price: number, public brand: string) {}\n  \n  getDescription(): string {\n    return `Electronics: ${this.name} by ${this.brand} - $${this.price}`;\n  }\n}\n\nclass ProductFactory {\n  static createProduct(type: 'book' | 'electronics', name: string, price: number, extra: string): Product {\n    switch (type) {\n      case 'book':\n        return new Book(name, price, extra);\n      case 'electronics':\n        return new Electronics(name, price, extra);\n      default:\n        throw new Error(`Unknown product type: ${type}`);\n    }\n  }\n}\n\n// Usage\nconst userService = new UserService();\nuserService.setName('john doe');\nuserService.setAge(25);\nconsole.log('User name:', userService.getName());\n\nconst book = ProductFactory.createProduct('book', 'TypeScript Guide', 29.99, 'John Smith');\nconst laptop = ProductFactory.createProduct('electronics', 'Gaming Laptop', 1299.99, 'TechBrand');\n\nconsole.log(book.getDescription());\nconsole.log(laptop.getDescription());",
      "expectedTime": 15,
      "concepts": [
        "decorators",
        "class decorators",
        "method decorators",
        "property decorators",
        "factory pattern"
      ]
    }
  ]
}
