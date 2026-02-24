import React, { useState } from 'react';
import './App.css';
import emailjs from 'emailjs-com';

// Initialize EmailJS with your User ID
emailjs.init("YOUR_USER_ID"); // Get this from EmailJS dashboard

function App() {
  const [emails, setEmails] = useState([
    {
      id: 1,
      from: 'john@example.com',
      to: 'me@example.com',
      subject: 'Welcome to Email App',
      body: 'This is a sample email to get you started!',
      date: '2024-01-15',
      read: false
    },
    {
      id: 2,
      from: 'newsletter@updates.com',
      to: 'me@example.com',
      subject: 'Weekly Newsletter',
      body: 'Check out or latest updates and features...',
      date: '2024-01-14',
      read: true
    }
  ]);

  const [currentView, setCurrentView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeEmail, setComposeEmail] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [showCompose, setShowCompose] = useState(false);

  const handleComposeChange = (e) => {
    setComposeEmail({
      ...composeEmail,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: composeEmail.to,
      subject: composeEmail.subject,
      message: composeEmail.message,
      from_name: 'Your Name',
      reply_to: 'your-email@example.com'
    };

    emailjs.send(
      'YOUR_SERVICE_ID', // Get from EmailJS
      'YOUR_TEMPLATE_ID', // Get from EmailJS
      templateParams
    ).then((respone) => {
      alert('Email sent succesfully!');
      setShowCompose(false);
      setComposeEmail({ to: '', subject: '', message: '' });
    }).catch((error) => {
      alert('Failed to send email. Please try again.');
      console.error('Email error:', error);
    });
  };

  const marKAsRead = (emailId) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, read: true } : email
    ));
  };
}
