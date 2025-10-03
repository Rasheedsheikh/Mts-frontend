import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder submit
    alert('Signup submitted');
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 16 }}>
      <h2>Create your account</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} type="text" />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} type="email" />
        <input name="password" placeholder="Password" value={form.password} onChange={onChange} type="password" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;


