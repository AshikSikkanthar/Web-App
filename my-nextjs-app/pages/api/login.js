import db from '../../utils/db'; 
import bcrypt from 'bcryptjs'; 
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      
      const [rows] = await db.execute('SELECT * FROM userinfo WHERE email = ?', [email]);

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password); 

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
      return res.status(200).json({ message: 'Login successful', email: user.email,token});
  
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
