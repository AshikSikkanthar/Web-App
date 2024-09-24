import pool from "../../utils/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
    
      const [existingUser] = await pool.execute('SELECT * FROM userinfo WHERE email = ?', [email]);

      if (existingUser.length > 0) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
     
      const [result] = await pool.execute(
        "INSERT INTO userinfo (email, password) VALUES (?, ?)",
        [email, hashedPassword]
      );
      return res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
      });

    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Error registering user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
