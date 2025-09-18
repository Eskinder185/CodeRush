import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, RotateCcw, Clock, Target, Zap, Code } from 'lucide-react'

const LanguagePractice = () => {
  const { language } = useParams<{ language: string }>()
  const [userInput, setUserInput] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [accuracy, setAccuracy] = useState(100)
  const [wpm, setWpm] = useState(0)

  // Placeholder code snippets for different languages
  const codeSnippets: Record<string, string> = {
    python: `def fibonacci(n):
    """Calculate the nth Fibonacci number using recursion."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def quick_sort(arr):
    """Sort an array using the quicksort algorithm."""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
    
    javascript: `// Async/await with error handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}`,
    
    java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }
}`,
    
    cpp: `#include <iostream>
#include <vector>
using namespace std;

class QuickSort {
public:
    static void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
private:
    static int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        return i + 1;
    }
};`,
    
    'html-css': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Card Component</title>
    <style>
        .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-10px);
        }
    </style>
</head>`,
    
    sql: `-- Create a table for user management
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert sample data
INSERT INTO users (username, email) VALUES
('john_doe', 'john@example.com'),
('jane_smith', 'jane@example.com'),
('bob_wilson', 'bob@example.com');

-- Query to find active users
SELECT username, email, created_at
FROM users
WHERE is_active = TRUE
ORDER BY created_at DESC;`,
    
    bash: `#!/bin/bash

# Function to check if a service is running
check_service() {
    local service_name=$1
    if systemctl is-active --quiet $service_name; then
        echo "✅ $service_name is running"
        return 0
    else
        echo "❌ $service_name is not running"
        return 1
    fi
}

# Function to backup files
backup_files() {
    local source_dir=$1
    local backup_dir="/backups/$(date +%Y%m%d_%H%M%S)"
    
    echo "Creating backup of $source_dir..."
    mkdir -p $backup_dir
    cp -r $source_dir $backup_dir/
    echo "Backup completed: $backup_dir"
}

# Main script
echo "System Health Check"
check_service "nginx"
check_service "mysql"
backup_files "/var/www/html"`,
    
    typescript: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

class UserService {
  private users: User[] = [];
  
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      ...userData,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    return newUser;
  }
  
  async getUserById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }
}`,
    
    go: `package main

import (
    "fmt"
    "net/http"
    "encoding/json"
    "log"
)

type User struct {
    ID       int    \`json:"id"\`
    Name     string \`json:"name"\`
    Email    string \`json:"email"\`
    IsActive bool   \`json:"is_active"\`
}

type UserService struct {
    users []User
}

func (us *UserService) CreateUser(name, email string) User {
    newUser := User{
        ID:       len(us.users) + 1,
        Name:     name,
        Email:    email,
        IsActive: true,
    }
    us.users = append(us.users, newUser)
    return newUser
}

func (us *UserService) GetUserByID(id int) (*User, error) {
    for _, user := range us.users {
        if user.ID == id {
            return &user, nil
        }
    }
    return nil, fmt.Errorf("user with ID %d not found", id)
}

func (us *UserService) GetAllUsers() []User {
    return us.users
}`
  }

  const languageNames: Record<string, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    java: 'Java',
    cpp: 'C++',
    'html-css': 'HTML/CSS',
    sql: 'SQL',
    bash: 'Bash',
    typescript: 'TypeScript',
    go: 'Go'
  }

  const currentLanguage = language || 'python'
  const languageName = languageNames[currentLanguage] || 'Unknown'
  const codeSnippet = codeSnippets[currentLanguage] || codeSnippets.python

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTyping) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTyping])

  useEffect(() => {
    if (userInput.length > 0 && !isTyping) {
      setIsTyping(true)
    }
    
    // Calculate accuracy
    const correctChars = codeSnippet.slice(0, userInput.length).split('').filter((char, index) => 
      char === userInput[index]
    ).length
    const accuracyPercent = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100
    setAccuracy(Math.round(accuracyPercent))

    // Calculate WPM (words per minute)
    const words = userInput.split(' ').length
    const minutes = timeElapsed / 60
    const currentWpm = minutes > 0 ? Math.round(words / minutes) : 0
    setWpm(currentWpm)
  }, [userInput, timeElapsed, isTyping, codeSnippet])

  const resetPractice = () => {
    setUserInput('')
    setTimeElapsed(0)
    setIsTyping(false)
    setAccuracy(100)
    setWpm(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/languages" 
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Languages
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">{languageName}</span> Practice
              </h1>
              <p className="text-gray-400">
                Practice typing {languageName} code with real-world examples
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Display */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Code className="w-5 h-5 mr-2 text-neon-blue" />
                Code Snippet
              </h2>
              <button
                onClick={resetPractice}
                className="btn-secondary text-sm px-4 py-2"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
            
            <div className="relative">
              <pre className="bg-dark-bg border border-dark-border rounded-lg p-4 text-sm text-gray-300 font-mono overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </motion.div>

          {/* Practice Area */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center">
                <Clock className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-gray-400">Time</div>
              </div>
              <div className="card text-center">
                <Target className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{accuracy}%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="card text-center">
                <Zap className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{wpm}</div>
                <div className="text-sm text-gray-400">WPM</div>
              </div>
            </div>

            {/* Typing Area */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-neon-blue" />
                Start Typing
              </h3>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the code above to start practicing..."
                className="w-full h-40 bg-dark-bg border border-dark-border rounded-lg p-4 text-white font-mono text-sm resize-none focus:border-neon-blue focus:outline-none transition-colors duration-300"
                spellCheck={false}
              />
              <div className="mt-4 text-sm text-gray-400">
                Progress: {userInput.length} / {codeSnippet.length} characters
              </div>
            </div>

            {/* Coming Soon Notice */}
            <div className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
              <h3 className="text-lg font-semibold text-white mb-3">
                🚧 Enhanced Features Coming Soon
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Syntax highlighting for better code readability</li>
                <li>• Multiple difficulty levels and code snippets</li>
                <li>• Progress tracking and performance analytics</li>
                <li>• Custom code snippet submission</li>
                <li>• Real-time error detection and suggestions</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LanguagePractice
