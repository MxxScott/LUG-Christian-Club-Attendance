// Profile Page JavaScript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMVTwr45d0xPK5He6pv1bibApte1flpds",
  authDomain: "christian-club-online.firebaseapp.com",
  projectId: "christian-club-online",
  storageBucket: "christian-club-online.appspot.com",
  messagingSenderId: "599223982319",
  appId: "1:599223982319:web:2aa246d44bae1ddc6ca31a",
  measurementId: "G-PSCB7CHW3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const homeButton = document.getElementById('home-button');
const membersButton = document.getElementById('members-button');
const profileButton = document.getElementById('profile-button');
const logoutButton = document.getElementById('logout-button');

// Profile elements
const userName = document.getElementById('user-name');
const userRole = document.getElementById('user-role');
const userEmail = document.getElementById('user-email');
const usernameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');
const roleSelect = document.getElementById('role-select');

// Activity stats elements
const membersAdded = document.getElementById('members-added');
const attendanceSessions = document.getElementById('attendance-sessions');
const lastLogin = document.getElementById('last-login');

// Navigation Event Listeners
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

membersButton.addEventListener('click', () => {
  window.location.href = 'list.html';
});

profileButton.addEventListener('click', () => {
  // Already on profile page
  console.log('Already on profile page');
});

logoutButton.addEventListener('click', () => {
  logout();
});

// Logout function
function logout() {
  // Clear authentication data
  localStorage.removeItem('listData');

  // Show confirmation
  if (confirm('Are you sure you want to logout?')) {
    // Redirect to login page
    window.location.href = 'index.html';
  }
}

// Load user profile data
async function loadUserProfile() {
  try {
    // Get authentication data from localStorage
    const authData = JSON.parse(localStorage.getItem('listData'));

    if (!authData) {
      // No authentication data, redirect to login
      window.location.href = 'index.html';
      return;
    }

    // Set user information based on authentication
    const username = authData.firstVal;
    userName.textContent = username.charAt(0).toUpperCase() + username.slice(1) + ' User';
    usernameInput.value = username;

    // Set role based on username
    if (username === 'admin') {
      userRole.textContent = 'Administrator';
      roleSelect.value = 'admin';
      userEmail.textContent = 'admin@christianclub.com';
      emailInput.value = 'admin@christianclub.com';
    } else if (username === 'user') {
      userRole.textContent = 'Moderator';
      roleSelect.value = 'moderator';
      userEmail.textContent = 'user@christianclub.com';
      emailInput.value = 'user@christianclub.com';
    } else {
      userRole.textContent = 'Member';
      roleSelect.value = 'member';
      userEmail.textContent = username + '@christianclub.com';
      emailInput.value = username + '@christianclub.com';
    }

    // Load activity statistics
    await loadActivityStats();

  } catch (error) {
    console.error('Error loading profile:', error);
    alert('Error loading profile data');
  }
}

// Load activity statistics
async function loadActivityStats() {
  try {
    // Get members count
    const membersQuery = await getDocs(collection(db, "members"));
    membersAdded.textContent = membersQuery.size;

    // Calculate attendance sessions (this is a simplified version)
    let totalSessions = 0;
    membersQuery.forEach((doc) => {
      const data = doc.data();
      if (data.attendance && Array.isArray(data.attendance)) {
        totalSessions += data.attendance.length;
      }
    });
    attendanceSessions.textContent = totalSessions;

    // Set last login to today
    const today = new Date().toLocaleDateString();
    lastLogin.textContent = today;

  } catch (error) {
    console.error('Error loading activity stats:', error);
    // Set default values if there's an error
    membersAdded.textContent = '0';
    attendanceSessions.textContent = '0';
    lastLogin.textContent = 'Today';
  }
}

// Global functions for HTML onclick events
window.editField = function (fieldId) {
  const field = document.getElementById(fieldId);
  if (field.readOnly) {
    field.readOnly = false;
    field.focus();
    field.style.backgroundColor = 'white';
  } else {
    field.readOnly = true;
    field.style.backgroundColor = '#f5f5f5';
  }
};

window.changePassword = function () {
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Get current user credentials
  const authData = JSON.parse(localStorage.getItem('listData'));

  if (!authData) {
    alert('No authentication data found');
    return;
  }

  // Validate current password
  if (currentPassword !== authData.secondVal) {
    alert('Current password is incorrect');
    return;
  }

  // Validate new password
  if (newPassword.length < 6) {
    alert('New password must be at least 6 characters long');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('New passwords do not match');
    return;
  }

  // Update password in localStorage (in a real app, this would update the database)
  authData.secondVal = newPassword;
  localStorage.setItem('listData', JSON.stringify(authData));

  // Clear password fields
  document.getElementById('current-password').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-password').value = '';

  alert('Password changed successfully!');
};

// Save profile changes
async function saveProfileChanges() {
  try {
    const newEmail = emailInput.value;
    const newRole = roleSelect.value;

    // Update user role display
    const roleText = newRole.charAt(0).toUpperCase() + newRole.slice(1);
    userRole.textContent = roleText;
    userEmail.textContent = newEmail;

    // In a real application, you would save these changes to the database
    console.log('Profile changes saved:', { email: newEmail, role: newRole });

    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('Error saving profile changes');
  }
}

// Add event listeners for profile updates
emailInput.addEventListener('change', saveProfileChanges);
roleSelect.addEventListener('change', saveProfileChanges);

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  loadUserProfile();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + L for logout
  if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
    e.preventDefault();
    logout();
  }

  // Escape key to cancel editing
  if (e.key === 'Escape') {
    const activeInput = document.activeElement;
    if (activeInput && activeInput.readOnly === false) {
      activeInput.readOnly = true;
      activeInput.style.backgroundColor = '#f5f5f5';
    }
  }
});
