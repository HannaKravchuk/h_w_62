const msg = document.getElementById('message');
const loginError = document.getElementById('loginError');

registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: rUser.value,
      password: rPass.value,
      role: rRole.value
    })
  });

  msg.textContent = await res.text();
  msg.style.color = res.ok ? 'green' : 'red';
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: lUser.value,
      password: lPass.value
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    loginError.textContent = errorText; 
    return;
  }

  const data = await res.json();
  localStorage.setItem('token', data.token);
  window.location = '/dashboard.html';
};
