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
    },
    {
      "id": "java-career-interfaces",
      "title": "Interfaces and Default Methods",
      "description": "Define contracts with modern Java interfaces, default methods, and static helpers.",
      "difficulty": "intermediate",
      "code": "public interface TaskNotifier {\n    void notifyUser(String recipient, String message);\n\n    default void broadcastAlert(String alert) {\n        notifyUser(\"all-engineers@internal.net\", \"[ALERT] \" + alert);\n    }\n\n    static boolean isValidRecipient(String email) {\n        return email != null && email.contains(\"@\");\n    }\n}\n\nclass EmailNotifier implements TaskNotifier {\n    @Override\n    public void notifyUser(String recipient, String message) {\n        if (TaskNotifier.isValidRecipient(recipient)) {\n            System.out.println(\"Delivering mail to \" + recipient + \": \" + message);\n        }\n    }\n}\n\npublic class NotifierApp {\n    public static void main(String[] args) {\n        TaskNotifier notifier = new EmailNotifier();\n        notifier.broadcastAlert(\"Scheduled maintenance at 02:00 UTC\");\n    }\n}",
      "expectedTime": 10,
      "concepts": [
        "interface",
        "default methods",
        "static methods",
        "polymorphic contracts"
      ]
    },
    {
      "id": "java-career-generics",
      "title": "Generics and Type Safety",
      "description": "Build type-safe generic classes and methods to eliminate unsafe casting.",
      "difficulty": "intermediate",
      "code": "public class ApiResponse<T> {\n    private final boolean success;\n    private final T data;\n    private final String error;\n\n    private ApiResponse(boolean success, T data, String error) {\n        this.success = success;\n        this.data = data;\n        this.error = error;\n    }\n\n    public static <T> ApiResponse<T> ok(T data) {\n        return new ApiResponse<>(true, data, null);\n    }\n\n    public static <T> ApiResponse<T> fail(String message) {\n        return new ApiResponse<>(false, null, message);\n    }\n\n    public boolean isSuccess() {\n        return success;\n    }\n\n    public T getData() {\n        return data;\n    }\n\n    public String getError() {\n        return error;\n    }\n\n    public static void main(String[] args) {\n        ApiResponse<Integer> port = ApiResponse.ok(8080);\n        System.out.println(\"Port configured: \" + port.getData());\n    }\n}",
      "expectedTime": 12,
      "concepts": [
        "generics",
        "type parameters",
        "factory methods",
        "type safety"
      ]
    },
    {
      "id": "java-career-collections",
      "title": "Collections: List, Set, and Map",
      "description": "Use standard Java collections for indexing, uniqueness, and key-value lookups.",
      "difficulty": "intermediate",
      "code": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.HashSet;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Set;\n\npublic class ServiceRegistry {\n    public static void main(String[] args) {\n        List<String> auditLog = new ArrayList<>();\n        auditLog.add(\"service-alpha registered\");\n        auditLog.add(\"service-beta registered\");\n\n        Set<String> activeNodes = new HashSet<>();\n        activeNodes.add(\"node-01\");\n        activeNodes.add(\"node-02\");\n        activeNodes.add(\"node-01\"); // duplicate ignored\n\n        Map<String, Integer> servicePorts = new HashMap<>();\n        servicePorts.put(\"auth\", 8081);\n        servicePorts.put(\"gateway\", 8080);\n\n        System.out.println(\"Total active nodes: \" + activeNodes.size());\n        System.out.println(\"Gateway port: \" + servicePorts.get(\"gateway\"));\n    }\n}",
      "expectedTime": 12,
      "concepts": [
        "ArrayList",
        "HashSet",
        "HashMap",
        "collections framework"
      ]
    },
    {
      "id": "java-career-streams",
      "title": "Lambdas and Stream Pipelines",
      "description": "Filter, map, and collect items using functional stream pipelines and predicates.",
      "difficulty": "advanced",
      "code": "import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class MetricsFilter {\n    record MetricSample(String name, double latencyMs, boolean error) {}\n\n    public static void main(String[] args) {\n        List<MetricSample> samples = List.of(\n            new MetricSample(\"GET /health\", 4.2, false),\n            new MetricSample(\"POST /login\", 128.5, false),\n            new MetricSample(\"GET /reports\", 540.0, true)\n        );\n\n        List<String> slowHealthy = samples.stream()\n            .filter(s -> !s.error())\n            .filter(s -> s.latencyMs() > 100.0)\n            .map(s -> s.name() + \" took \" + s.latencyMs() + \"ms\")\n            .collect(Collectors.toList());\n\n        slowHealthy.forEach(System.out::println);\n    }\n}",
      "expectedTime": 12,
      "concepts": [
        "lambdas",
        "Stream API",
        "filter",
        "map",
        "collect"
      ]
    },
    {
      "id": "java-career-optional",
      "title": "Optional and Defensive API Design",
      "description": "Handle absent values cleanly without throwing NullPointerException.",
      "difficulty": "intermediate",
      "code": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Optional;\n\npublic class UserRepository {\n    private final Map<Long, String> users = new HashMap<>();\n\n    public void save(Long id, String email) {\n        users.put(id, email);\n    }\n\n    public Optional<String> findEmailById(Long id) {\n        return Optional.ofNullable(users.get(id));\n    }\n\n    public static void main(String[] args) {\n        UserRepository repo = new UserRepository();\n        repo.save(42L, \"dev@example.internal\");\n\n        String contact = repo.findEmailById(42L)\n            .map(String::toUpperCase)\n            .orElse(\"NO_CONTACT_FOUND\");\n\n        System.out.println(\"User email: \" + contact);\n    }\n}",
      "expectedTime": 10,
      "concepts": [
        "Optional",
        "ofNullable",
        "orElse",
        "null safety"
      ]
    },
    {
      "id": "java-career-records",
      "title": "Records and Immutability",
      "description": "Declare immutable data carriers with concise records, compact constructors, and validation.",
      "difficulty": "intermediate",
      "code": "public record DatabaseConfig(String host, int port, String database) {\n    public DatabaseConfig {\n        if (host == null || host.isBlank()) {\n            throw new IllegalArgumentException(\"Host cannot be empty\");\n        }\n        if (port < 1024 || port > 65535) {\n            throw new IllegalArgumentException(\"Port out of range: \" + port);\n        }\n    }\n\n    public String jdbcUrl() {\n        return \"jdbc:postgresql://\" + host + \":\" + port + \"/\" + database;\n    }\n\n    public static void main(String[] args) {\n        DatabaseConfig cfg = new DatabaseConfig(\"db-primary.internal\", 5432, \"orders\");\n        System.out.println(\"Connection string: \" + cfg.jdbcUrl());\n    }\n}",
      "expectedTime": 10,
      "concepts": [
        "records",
        "immutability",
        "compact constructor",
        "validation"
      ]
    },
    {
      "id": "java-career-junit",
      "title": "Unit Testing with JUnit 5",
      "description": "Write automated test cases, assertions, and parameterized tests with JUnit 5.",
      "difficulty": "intermediate",
      "code": "import org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.DisplayName;\nimport static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.junit.jupiter.api.Assertions.assertNotNull;\n\npublic class TaskValidatorTest {\n    record Task(String title, int priority) {}\n\n    boolean isValid(Task task) {\n        return task.title() != null && !task.title().isBlank() && task.priority() >= 1;\n    }\n\n    @Test\n    @DisplayName(\"Valid task passes business validation rule\")\n    void validTaskPasses() {\n        Task task = new Task(\"Build CI Pipeline\", 1);\n        assertNotNull(task);\n        assertEquals(true, isValid(task));\n    }\n}",
      "expectedTime": 10,
      "concepts": [
        "JUnit 5",
        "@Test",
        "assertNotNull",
        "assertEquals",
        "automated testing"
      ]
    },
    {
      "id": "java-career-spring-controller",
      "title": "Spring Boot REST Controller",
      "description": "Build production RESTful endpoints with Spring Boot @RestController and @GetMapping.",
      "difficulty": "advanced",
      "code": "package com.example.coderush.controller;\n\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.PathVariable;\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RestController;\nimport java.util.Map;\n\n@RestController\n@RequestMapping(\"/api/v1/health\")\npublic class HealthCheckController {\n\n    @GetMapping(\"/{component}\")\n    public ResponseEntity<Map<String, String>> checkStatus(@PathVariable String component) {\n        return ResponseEntity.ok(Map.of(\n            \"status\", \"UP\",\n            \"component\", component,\n            \"version\", \"1.0.0\"\n        ));\n    }\n}",
      "expectedTime": 14,
      "concepts": [
        "Spring Boot",
        "@RestController",
        "@RequestMapping",
        "ResponseEntity",
        "REST APIs"
      ]
    },
    {
      "id": "java-career-spring-jpa",
      "title": "Spring Data JPA Repository",
      "description": "Persist and query database entities with Spring Data JPA and repository interfaces.",
      "difficulty": "advanced",
      "code": "package com.example.coderush.repository;\n\nimport jakarta.persistence.Entity;\nimport jakarta.persistence.GeneratedValue;\nimport jakarta.persistence.GenerationType;\nimport jakarta.persistence.Id;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport java.util.List;\n\n@Entity\nclass TaskItem {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String title;\n    private boolean completed;\n}\n\npublic interface TaskRepository extends JpaRepository<TaskItem, Long> {\n    List<TaskItem> findByCompleted(boolean completed);\n}",
      "expectedTime": 14,
      "concepts": [
        "Spring Data JPA",
        "JpaRepository",
        "@Entity",
        "@Id",
        "PostgreSQL persistence"
      ]
    },
    {
      "id": "java-career-task-capstone",
      "title": "Java Capstone: Task Service Implementation",
      "description": "Complete service layer with constructor dependency injection, business validation, and DTO mapping.",
      "difficulty": "advanced",
      "code": "package com.example.coderush.service;\n\nimport org.springframework.stereotype.Service;\nimport java.time.Instant;\n\npublic record TaskDto(Long id, String title, Instant createdAt) {}\n\n@Service\npublic class TaskManagementService {\n    public TaskDto createTask(String title) {\n        if (title == null || title.trim().isEmpty()) {\n            throw new IllegalArgumentException(\"Task title must be provided\");\n        }\n        // Simulate persisting domain model and returning clean API DTO\n        return new TaskDto(101L, title.trim(), Instant.now());\n    }\n\n    public static void main(String[] args) {\n        TaskManagementService svc = new TaskManagementService();\n        TaskDto dto = svc.createTask(\"Deploy Task Management API\");\n        System.out.println(\"Created task #\" + dto.id() + \": \" + dto.title());\n    }\n}",
      "expectedTime": 15,
      "concepts": [
        "Service layer",
        "dependency injection",
        "DTO pattern",
        "REST API capstone"
      ]
    }
  ]
}
