import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material";
import Link from 'next/link';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";

import SvgIcon from "@mui/material/SvgIcon"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const GoogleIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
        fill="#4285F4"
      />
      <path
        d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
        fill="#34A853"
      />
      <path
        d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
        fill="#FBBC05"
      />
      <path
        d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
        fill="#EA4335"
      />
    </SvgIcon>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
  
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      localStorage.setItem('token', data.token);
      console.log("Token data:", data.token);
  
      console.log("Login successful for:", data.email);
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };
 
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Card
          sx={{
            width: 550,
            padding: 8,
            backgroundColor: "#e0f7fa",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                placeholder="Enter your password"
                variant="outlined"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <Typography color="error">{error}</Typography>}
              <Box sx={{ textAlign: "center", marginY: 4 }}>
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
              </Box>
            </form>
            <Box
              sx={{
                textAlign: "center",
                marginTop: 2,
                display: "flex",
                fontSize: "0.50rem",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              <Typography variant="h6" component="span" gutterBottom>
                Don&apos;t have an account?&nbsp;
              </Typography>

              <Link href="/auth/register" passHref>
                <Button
                  sx={{
                    color: "black",
                    textDecoration: "underline",
                    background: "none",
                    fontSize: "1.16rem",
                    padding: 0,
                    marginTop:-1.0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                margin: "auto",
                marginBottom: 3,
              }}
            >
              <Divider variant="fullWidth" textAlign="center">
                or
              </Divider>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2, 
                width: "100%", 
                maxWidth: 400,
                margin: "auto", 
              }}
            >
            
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                  href="https://www.google.com"
                target="_blank"
                sx={{
                  color: "primary.main",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "lightgray",
                  },
                  "&:active": {
                    backgroundColor: "lightgray",
                  },
                  "&:focus": {
                    backgroundColor: "lightgray",
                  },
                }}
                fullWidth
              >
                Sign in with Google
              </Button>

            
              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                fullWidth
                color="primary"
                sx={{
                  padding: 1.5, 
                  background: "linear-gradient(to right, #1AAFFF, #0163E0)", 
                  color: "white", 
                  "&:hover": {
                    background: "linear-gradient(to right, #0b6bd6, #014fb1)", 
                  },
                }}
              >
                Sign in with Facebook
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {error && (
  <Typography color="error" sx={{ mt: 2 }}>
    {error}
  </Typography>
)}
    </Box>
  );
}
