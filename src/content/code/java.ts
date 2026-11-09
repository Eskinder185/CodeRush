import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const javaTrack: LanguageTrack = {
  "language": "java",
  "languageName": "Java",
  "description": "Object-oriented language for enterprise and Android development.",
  "lessons": [
    {
      "id": "java-basics-1",
      "title": "Hello World & Variables",
      "description": "Learn basic Java syntax with print statements and variable declarations",
      "difficulty": "beginner",
      "code": "public class HelloWorld {\n    public static void main(String[] args) {\n        // Hello World in Java\n        System.out.println(\"Hello, World!\");\n        \n        // Variables and basic data types\n        String name = \"Alice\";\n        int age = 25;\n        double height = 5.6;\n        boolean isStudent = true;\n        \n        // String formatting\n        System.out.println(\"Name: \" + name);\n        System.out.println(\"Age: \" + age);\n        System.out.println(\"Height: \" + height + \" feet\");\n        System.out.println(\"Is student: \" + isStudent);\n    }\n}",
      "expectedTime": 8,
      "concepts": [
        "System.out.println",
        "variables",
        "data types",
        "string concatenation"
      ]
    },
    {
      "id": "java-basics-2",
      "title": "Arrays and Loops",
      "description": "Master Java arrays and different loop structures",
      "difficulty": "beginner",
      "code": "public class ArraysAndLoops {\n    public static void main(String[] args) {\n        // Creating arrays\n        String[] fruits = {\"apple\", \"banana\", \"orange\"};\n        int[] numbers = {1, 2, 3, 4, 5};\n        \n        // For loops\n        for (int i = 0; i < fruits.length; i++) {\n            System.out.println(fruits[i]);\n        }\n        \n        // Enhanced for loop\n        for (String fruit : fruits) {\n            System.out.println(\"I like \" + fruit);\n        }\n        \n        // While loop\n        int count = 0;\n        while (count < 3) {\n            System.out.println(\"Count: \" + count);\n            count++;\n        }\n        \n        // Array manipulation\n        int[] doubled = new int[numbers.length];\n        for (int i = 0; i < numbers.length; i++) {\n            doubled[i] = numbers[i] * 2;\n        }\n        \n        System.out.println(\"Doubled numbers:\");\n        for (int num : doubled) {\n            System.out.print(num + \" \");\n        }\n    }\n}",
      "expectedTime": 10,
      "concepts": [
        "arrays",
        "for loops",
        "enhanced for loops",
        "while loops"
      ]
    },
    {
      "id": "java-intermediate-1",
      "title": "Methods and Classes",
      "description": "Create methods and basic class structures",
      "difficulty": "intermediate",
      "code": "public class Calculator {\n    // Instance variables\n    private double result;\n    \n    // Constructor\n    public Calculator() {\n        this.result = 0.0;\n    }\n    \n    // Methods\n    public double add(double a, double b) {\n        result = a + b;\n        return result;\n    }\n    \n    public double subtract(double a, double b) {\n        result = a - b;\n        return result;\n    }\n    \n    public double multiply(double a, double b) {\n        result = a * b;\n        return result;\n    }\n    \n    public double divide(double a, double b) {\n        if (b != 0) {\n            result = a / b;\n            return result;\n        } else {\n            System.out.println(\"Error: Division by zero!\");\n            return 0;\n        }\n    }\n    \n    public double getResult() {\n        return result;\n    }\n    \n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        \n        System.out.println(\"Addition: \" + calc.add(10, 5));\n        System.out.println(\"Subtraction: \" + calc.subtract(10, 5));\n        System.out.println(\"Multiplication: \" + calc.multiply(10, 5));\n        System.out.println(\"Division: \" + calc.divide(10, 5));\n    }\n}",
      "expectedTime": 12,
      "concepts": [
        "methods",
        "classes",
        "constructors",
        "instance variables"
      ]
    },
    {
      "id": "java-intermediate-2",
      "title": "Exception Handling",
      "description": "Handle errors gracefully with try-catch blocks",
      "difficulty": "intermediate",
      "code": "import java.util.Scanner;\nimport java.util.InputMismatchException;\n\npublic class ExceptionHandling {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        try {\n            System.out.print(\"Enter a number: \");\n            int number = scanner.nextInt();\n            \n            System.out.print(\"Enter divisor: \");\n            int divisor = scanner.nextInt();\n            \n            double result = safeDivide(number, divisor);\n            System.out.println(\"Result: \" + result);\n            \n        } catch (InputMismatchException e) {\n            System.out.println(\"Error: Please enter a valid number!\");\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error: \" + e.getMessage());\n        } catch (Exception e) {\n            System.out.println(\"Unexpected error: \" + e.getMessage());\n        } finally {\n            scanner.close();\n            System.out.println(\"Scanner closed successfully.\");\n        }\n    }\n    \n    public static double safeDivide(int a, int b) throws ArithmeticException {\n        if (b == 0) {\n            throw new ArithmeticException(\"Cannot divide by zero!\");\n        }\n        return (double) a / b;\n    }\n}",
      "expectedTime": 10,
      "concepts": [
        "try-catch",
        "exception handling",
        "Scanner",
        "finally block"
      ]
    },
    {
      "id": "java-advanced-1",
      "title": "Inheritance and Polymorphism",
      "description": "Object-oriented programming with inheritance and method overriding",
      "difficulty": "advanced",
      "code": "// Base class\nclass Animal {\n    protected String name;\n    protected int age;\n    \n    public Animal(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public void makeSound() {\n        System.out.println(\"Some generic animal sound\");\n    }\n    \n    public void displayInfo() {\n        System.out.println(\"Name: \" + name + \", Age: \" + age);\n    }\n}\n\n// Derived class\nclass Dog extends Animal {\n    private String breed;\n    \n    public Dog(String name, int age, String breed) {\n        super(name, age); // Call parent constructor\n        this.breed = breed;\n    }\n    \n    @Override\n    public void makeSound() {\n        System.out.println(\"Woof! Woof!\");\n    }\n    \n    public void fetch() {\n        System.out.println(name + \" is fetching the ball!\");\n    }\n    \n    @Override\n    public void displayInfo() {\n        super.displayInfo(); // Call parent method\n        System.out.println(\"Breed: \" + breed);\n    }\n}\n\npublic class InheritanceDemo {\n    public static void main(String[] args) {\n        Animal animal = new Animal(\"Generic\", 5);\n        Dog dog = new Dog(\"Buddy\", 3, \"Golden Retriever\");\n        \n        // Polymorphism\n        Animal[] animals = {animal, dog};\n        \n        for (Animal a : animals) {\n            a.makeSound(); // Calls appropriate method based on actual type\n            a.displayInfo();\n            System.out.println(\"---\");\n        }\n        \n        // Dog-specific method\n        dog.fetch();\n    }\n}",
      "expectedTime": 15,
      "concepts": [
        "inheritance",
        "polymorphism",
        "super()",
        "method overriding"
      ]
    }
  ]
}
