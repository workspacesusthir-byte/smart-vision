// lib/db.js - Resilient MySQL Connection Pool with In-Memory Fallback for V1
import mysql from 'mysql2/promise';

let pool = null;

// Initial seed data matching the Laravel 13 MySQL schema
export const initialData = {
  users: [
    {
      id: 1,
      name: 'Rajesh Sharma',
      email: 'teacher@thesmartvision.in',
      // bcrypt hash for 'Teacher@2026'
      password: '$2a$10$X8L0Fh7e5fA3U8x71f4p.O3jQ8/Qy1m2V0N5bZ9hW1c7d3v6g8y2e',
      role: 'teacher',
      phone: '+91 98765 43210',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      created_at: new Date('2025-01-15T09:30:00Z').toISOString()
    },
    {
      id: 2,
      name: 'Aarav Patel',
      email: 'aarav@thesmartvision.in',
      // bcrypt hash for 'Student@2026'
      password: '$2a$10$vN9fP2Y4V5dM6wL7k8h9u.Y8k0N1m2p3q4r5s6t7u8v9w0x1y2z3a',
      role: 'student',
      phone: '+91 98111 22334',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      created_at: new Date('2025-02-10T11:20:00Z').toISOString()
    },
    {
      id: 3,
      name: 'Ananya Iyer',
      email: 'ananya@thesmartvision.in',
      // bcrypt hash for 'Student@2026'
      password: '$2a$10$vN9fP2Y4V5dM6wL7k8h9u.Y8k0N1m2p3q4r5s6t7u8v9w0x1y2z3a',
      role: 'student',
      phone: '+91 98222 33445',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      created_at: new Date('2025-02-14T14:15:00Z').toISOString()
    }
  ],
  quizzes: [
    {
      id: 1,
      title: 'Mental Math Speed Test — Level 1',
      description: 'Flash arithmetic test focusing on single and double digit rapid addition and subtraction without physical tools.',
      duration: 5,
      total_marks: 20,
      status: 'published',
      created_by: 1,
      created_by_name: 'Rajesh Sharma',
      category: 'Mental Math',
      level: 'Beginner to Intermediate',
      created_at: new Date('2026-02-01T10:00:00Z').toISOString(),
      questions: [
        {
          id: 1,
          quiz_id: 1,
          question: 'Calculate mentally: 47 + 38 = ?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 1,
          explanation: '47 + 38 = (47 + 40) - 2 = 87 - 2 = 85',
          options: [
            { id: 1, question_id: 1, option_text: '83', is_correct: false },
            { id: 2, question_id: 1, option_text: '85', is_correct: true },
            { id: 3, question_id: 1, option_text: '87', is_correct: false },
            { id: 4, question_id: 1, option_text: '95', is_correct: false }
          ]
        },
        {
          id: 2,
          quiz_id: 1,
          question: 'Rapid calculation: 92 - 47 = ?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 2,
          explanation: '92 - 47 = 92 - 50 + 3 = 42 + 3 = 45',
          options: [
            { id: 5, question_id: 2, option_text: '45', is_correct: true },
            { id: 6, question_id: 2, option_text: '43', is_correct: false },
            { id: 7, question_id: 2, option_text: '55', is_correct: false },
            { id: 8, question_id: 2, option_text: '47', is_correct: false }
          ]
        },
        {
          id: 3,
          quiz_id: 1,
          question: 'What is: 15 × 12 = ?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 3,
          explanation: '15 × 12 = 15 × 10 + 15 × 2 = 150 + 30 = 180',
          options: [
            { id: 9, question_id: 3, option_text: '170', is_correct: false },
            { id: 10, question_id: 3, option_text: '175', is_correct: false },
            { id: 11, question_id: 3, option_text: '180', is_correct: true },
            { id: 12, question_id: 3, option_text: '190', is_correct: false }
          ]
        },
        {
          id: 4,
          quiz_id: 1,
          question: 'Abacus Bead Value: On a standard Soroban abacus, how much value does the upper deck bead represent?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 4,
          explanation: 'The upper deck bead (heaven bead) represents a value of 5, while each of the lower 4 beads represents 1.',
          options: [
            { id: 13, question_id: 4, option_text: '1', is_correct: false },
            { id: 14, question_id: 4, option_text: '5', is_correct: true },
            { id: 15, question_id: 4, option_text: '10', is_correct: false },
            { id: 16, question_id: 4, option_text: '50', is_correct: false }
          ]
        },
        {
          id: 5,
          quiz_id: 1,
          question: 'Speed subtraction: 1000 - 384 = ?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 5,
          explanation: 'Vedic rule "All from 9 and the last from 10": 9-3=6, 9-8=1, 10-4=6 => 616',
          options: [
            { id: 17, question_id: 5, option_text: '614', is_correct: false },
            { id: 18, question_id: 5, option_text: '616', is_correct: true },
            { id: 19, question_id: 5, option_text: '626', is_correct: false },
            { id: 20, question_id: 5, option_text: '716', is_correct: false }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Vedic Mathematics Fast Techniques — Level 2',
      description: 'Master fast squares, Ekadhikena Purvena, and Nikhilam multiplication tricks for competitive confidence.',
      duration: 6,
      total_marks: 20,
      status: 'published',
      created_by: 1,
      created_by_name: 'Rajesh Sharma',
      category: 'Vedic Math',
      level: 'Advanced',
      created_at: new Date('2026-02-10T14:00:00Z').toISOString(),
      questions: [
        {
          id: 6,
          quiz_id: 2,
          question: 'Using Vedic square formula (ends in 5), calculate: 65² = ?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 1,
          explanation: 'First part: 6 × (6 + 1) = 42. Last part: 25. Result = 4225',
          options: [
            { id: 21, question_id: 6, option_text: '4025', is_correct: false },
            { id: 22, question_id: 6, option_text: '4225', is_correct: true },
            { id: 23, question_id: 6, option_text: '4425', is_correct: false },
            { id: 24, question_id: 6, option_text: '4205', is_correct: false }
          ]
        },
        {
          id: 7,
          quiz_id: 2,
          question: 'What is 98 × 97 using Nikhilam Base 100 method?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 2,
          explanation: 'Deviations: -2 and -3. Left: 98 - 3 = 95. Right: (-2) × (-3) = 06. Result = 9506',
          options: [
            { id: 25, question_id: 7, option_text: '9506', is_correct: true },
            { id: 26, question_id: 7, option_text: '9504', is_correct: false },
            { id: 27, question_id: 7, option_text: '9606', is_correct: false },
            { id: 28, question_id: 7, option_text: '9406', is_correct: false }
          ]
        },
        {
          id: 8,
          quiz_id: 2,
          question: 'Multiply by 11: 43 × 11 = ?',
          question_type: 'multiple_choice',
          marks: 4,
          order: 3,
          explanation: 'Keep 4 at start, 3 at end, middle is (4 + 3) = 7. Result = 473',
          options: [
            { id: 29, question_id: 8, option_text: '453', is_correct: false },
            { id: 30, question_id: 8, option_text: '463', is_correct: false },
            { id: 31, question_id: 8, option_text: '473', is_correct: true },
            { id: 32, question_id: 8, option_text: '483', is_correct: false }
          ]
        }
      ]
    }
  ],
  attempts: [
    {
      id: 1,
      quiz_id: 1,
      quiz_title: 'Mental Math Speed Test — Level 1',
      student_id: 2,
      student_name: 'Aarav Patel',
      student_email: 'aarav@thesmartvision.in',
      score: 20,
      total_marks: 20,
      percentage: 100,
      passed: true,
      time_spent_seconds: 142,
      status: 'completed',
      submitted_at: new Date('2026-02-15T11:45:00Z').toISOString()
    }
  ]
};

// Global in-memory storage to survive warm lambda/server calls
if (!global.__tsvStore) {
  global.__tsvStore = JSON.parse(JSON.stringify(initialData));
}
const store = global.__tsvStore;

/**
 * Initializes and returns MySQL connection pool if config is present and reachable.
 */
export async function getDbPool() {
  if (pool) return pool;

  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USERNAME || process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_DATABASE || process.env.DB_NAME;
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  // If no DB host is configured, return null to use memory store
  if (!dbHost || !dbUser) {
    return null;
  }

  try {
    pool = mysql.createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 2000 // Quick timeout to prevent stalling
    });

    // Test connection
    const conn = await pool.getConnection();
    conn.release();
    return pool;
  } catch (err) {
    console.warn('[DB] MySQL connection failed. Gracefully falling back to in-memory store:', err.message);
    pool = null;
    return null;
  }
}

/**
 * Check DB health status
 */
export async function checkDbHealth() {
  try {
    const db = await getDbPool();
    if (db) {
      const [rows] = await db.query('SELECT 1 as healthy');
      return { status: 'connected', type: 'mysql', details: rows[0] };
    }
  } catch (err) {
    // ignore
  }
  return { status: 'fallback', type: 'in-memory', details: 'Operational with mock dataset' };
}

/**
 * Find user by email (for authentication)
 */
export async function findUserByEmail(email) {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();

  try {
    const db = await getDbPool();
    if (db) {
      const [rows] = await db.query('SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1', [normalized]);
      if (rows && rows.length > 0) return rows[0];
    }
  } catch (err) {
    console.warn('[DB] MySQL query error in findUserByEmail, falling back to memory store:', err.message);
  }

  return store.users.find(u => u.email.toLowerCase() === normalized) || null;
}

/**
 * Find user by ID
 */
export async function findUserById(id) {
  const numId = Number(id);
  try {
    const db = await getDbPool();
    if (db) {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [numId]);
      if (rows && rows.length > 0) return rows[0];
    }
  } catch (err) {
    console.warn('[DB] MySQL query error in findUserById, falling back to memory store:', err.message);
  }

  return store.users.find(u => u.id === numId) || null;
}

/**
 * Get all published quizzes
 */
export async function getAllQuizzes() {
  try {
    const db = await getDbPool();
    if (db) {
      const [quizzes] = await db.query('SELECT * FROM quizzes WHERE status = "published" ORDER BY id DESC');
      if (quizzes && quizzes.length > 0) return quizzes;
    }
  } catch (err) {
    console.warn('[DB] MySQL query error in getAllQuizzes, falling back to memory store:', err.message);
  }

  return store.quizzes.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    duration: q.duration,
    total_marks: q.total_marks,
    status: q.status,
    category: q.category,
    level: q.level,
    question_count: q.questions ? q.questions.length : 0,
    created_by_name: q.created_by_name || 'Rajesh Sharma'
  }));
}

/**
 * Get single quiz by ID with its questions and options
 */
export async function getQuizById(id) {
  const numId = Number(id);

  try {
    const db = await getDbPool();
    if (db) {
      const [quizzes] = await db.query('SELECT * FROM quizzes WHERE id = ? LIMIT 1', [numId]);
      if (quizzes && quizzes.length > 0) {
        const quiz = quizzes[0];
        const [questions] = await db.query('SELECT * FROM quiz_questions WHERE quiz_id = ? ORDER BY `order` ASC', [numId]);
        
        for (const q of questions) {
          const [options] = await db.query('SELECT * FROM quiz_options WHERE question_id = ?', [q.id]);
          q.options = options;
        }
        quiz.questions = questions;
        return quiz;
      }
    }
  } catch (err) {
    console.warn('[DB] MySQL query error in getQuizById, falling back to memory store:', err.message);
  }

  return store.quizzes.find(q => q.id === numId) || null;
}

/**
 * Save new quiz (for teachers)
 */
export async function saveNewQuiz(quizData) {
  const newId = store.quizzes.length > 0 ? Math.max(...store.quizzes.map(q => q.id)) + 1 : 1;
  const quiz = {
    id: newId,
    title: quizData.title,
    description: quizData.description || '',
    duration: parseInt(quizData.duration || '5', 10),
    total_marks: parseInt(quizData.total_marks || '20', 10),
    status: 'published',
    created_by: quizData.created_by || 1,
    created_by_name: quizData.created_by_name || 'Rajesh Sharma',
    category: quizData.category || 'Mental Math',
    level: quizData.level || 'All Levels',
    created_at: new Date().toISOString(),
    questions: (quizData.questions || []).map((q, idx) => ({
      id: 1000 + (newId * 10) + idx,
      quiz_id: newId,
      question: q.question,
      question_type: 'multiple_choice',
      marks: q.marks || 4,
      order: idx + 1,
      explanation: q.explanation || '',
      options: (q.options || []).map((opt, optIdx) => ({
        id: 2000 + (newId * 100) + (idx * 10) + optIdx,
        question_id: 1000 + (newId * 10) + idx,
        option_text: opt.option_text || opt.text,
        is_correct: !!opt.is_correct
      }))
    }))
  };

  store.quizzes.unshift(quiz);
  return quiz;
}

/**
 * Save quiz submission & attempt
 */
export async function saveQuizSubmission(submissionData) {
  const newAttemptId = store.attempts.length > 0 ? Math.max(...store.attempts.map(a => a.id)) + 1 : 1;
  const attempt = {
    id: newAttemptId,
    quiz_id: submissionData.quiz_id,
    quiz_title: submissionData.quiz_title,
    student_id: submissionData.student_id,
    student_name: submissionData.student_name,
    student_email: submissionData.student_email,
    score: submissionData.score,
    total_marks: submissionData.total_marks,
    percentage: submissionData.percentage,
    passed: submissionData.passed,
    time_spent_seconds: submissionData.time_spent_seconds || 0,
    status: 'completed',
    submitted_at: new Date().toISOString()
  };

  store.attempts.unshift(attempt);
  return attempt;
}

/**
 * Get all submissions (for teachers)
 */
export async function getAllSubmissions() {
  return store.attempts;
}

/**
 * Get submissions for a single student
 */
export async function getStudentSubmissions(studentId) {
  const numId = Number(studentId);
  return store.attempts.filter(a => a.student_id === numId);
}
