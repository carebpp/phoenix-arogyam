import { useState } from 'react'

export default function Settings() {
    const [form, setForm] = useState({
        email: localStorage.getItem('userEmail') || '',
        oldPassword: '',
        newPassword: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Netlify function ko call karo
        const res = await fetch('/.netlify/functions/change-password', {
            method: 'POST',
            body: JSON.stringify(form)
        })
        const data = await res.json()
        alert(data.message)
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                {/* 1. Email ka khana */}
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="aapka@email.com"
                    style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                />

                {/* 2. Old PW / New PW */}
                <label>Old Password</label>
                <input
                    type="password"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    placeholder="Old Password"
                    style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                />

                <label>New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                />

                <button type="submit" style={{ width: '100%', padding: '10px', background: '#2e7d32', color: 'white' }}>
                    Update Password
                </button>
            </form>
        </div>
    )
}