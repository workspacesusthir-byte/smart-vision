// scripts/seed.js - Seeds MySQL database if connected, or verifies memory store
import { getDbPool, initialData } from '../lib/db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('--- The Smart Vision Database Seeding ---');
  const pool = await getDbPool();

  if (!pool) {
    console.log('[Seed] MySQL is not configured or offline. In-memory store is active and verified.');
    console.log(`[Seed] In-memory users ready: ${initialData.users.length}`);
    console.log(`[Seed] In-memory quizzes ready: ${initialData.quizzes.length}`);
    return;
  }

  console.log('[Seed] Connected to MySQL. Ensuring tables exist...');

  try {
    // 1. Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
        phone VARCHAR(50) NULL,
        status VARCHAR(50) DEFAULT 'active',
        avatar VARCHAR(500) NULL,
        remember_token VARCHAR(100) NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Quizzes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        duration INT NOT NULL DEFAULT 5,
        total_marks INT NOT NULL DEFAULT 20,
        status ENUM('draft', 'published', 'archived') DEFAULT 'published',
        category VARCHAR(100) DEFAULT 'Mental Math',
        level VARCHAR(100) DEFAULT 'All Levels',
        created_by BIGINT UNSIGNED NULL,
        created_by_name VARCHAR(255) NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Quiz Questions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_questions (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        quiz_id BIGINT UNSIGNED NOT NULL,
        question TEXT NOT NULL,
        question_type VARCHAR(50) DEFAULT 'multiple_choice',
        marks INT NOT NULL DEFAULT 4,
        \`order\` INT NOT NULL DEFAULT 1,
        explanation TEXT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Quiz Options table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_options (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        question_id BIGINT UNSIGNED NOT NULL,
        option_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Quiz Attempts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        quiz_id BIGINT UNSIGNED NOT NULL,
        quiz_title VARCHAR(255) NOT NULL,
        student_id BIGINT UNSIGNED NOT NULL,
        student_name VARCHAR(255) NOT NULL,
        student_email VARCHAR(255) NOT NULL,
        score INT NOT NULL DEFAULT 0,
        total_marks INT NOT NULL DEFAULT 20,
        percentage INT NOT NULL DEFAULT 0,
        passed BOOLEAN DEFAULT FALSE,
        time_spent_seconds INT NOT NULL DEFAULT 0,
        status VARCHAR(50) DEFAULT 'completed',
        submitted_at TIMESTAMP NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('[Seed] Tables verified.');

    // Seed users if empty
    const [existingUsers] = await pool.query('SELECT COUNT(*) as cnt FROM users');
    if (existingUsers[0].cnt === 0) {
      console.log('[Seed] Seeding default users...');
      const studentHash = await bcrypt.hash('Student@2026', 10);
      const teacherHash = await bcrypt.hash('Teacher@2026', 10);

      await pool.query(
        'INSERT INTO users (name, email, password, role, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        ['Rajesh Sharma', 'teacher@thesmartvision.in', teacherHash, 'teacher', '+91 98765 43210', 'active']
      );

      await pool.query(
        'INSERT INTO users (name, email, password, role, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        ['Aarav Patel', 'aarav@thesmartvision.in', studentHash, 'student', '+91 98111 22334', 'active']
      );

      await pool.query(
        'INSERT INTO users (name, email, password, role, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        ['Ananya Iyer', 'ananya@thesmartvision.in', studentHash, 'student', '+91 98222 33445', 'active']
      );
      console.log('[Seed] Default users seeded successfully.');
    }

    console.log('[Seed] MySQL Seeding complete.');
  } catch (err) {
    console.error('[Seed] Error during MySQL seeding:', err);
  } finally {
    process.exit(0);
  }
}

seed();
