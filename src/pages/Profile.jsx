import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { api } from '../utils/api'

export default function Profile() {

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = user.firstName && user.lastName
    ? user.firstName[0] + user.lastName[0]
    : 'SF'
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')

  const [profileData, setProfileData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    university: 'University of Ilorin',
    department: 'Computer Science',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileErrors, setProfileErrors] = useState({})
  const [passwordErrors, setPasswordErrors] = useState({})
  const [profileSuccess, setProfileSuccess] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
    setProfileErrors({ ...profileErrors, [e.target.name]: '' })
    setProfileSuccess('')
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    setPasswordErrors({ ...passwordErrors, [e.target.name]: '' })
    setPasswordSuccess('')
  }

  const validateProfile = () => {
    const errors = {}
    if (!profileData.firstName.trim()) errors.firstName = 'First name is required'
    if (!profileData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!profileData.email.trim()) errors.email = 'Email is required'
    if (!profileData.phone.trim()) errors.phone = 'Phone number is required'
    if (!profileData.university.trim()) errors.university = 'University is required'
    if (!profileData.department.trim()) errors.department = 'Department is required'
    return errors
  }

  const validatePassword = () => {
    const errors = {}
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required'
    if (!passwordData.newPassword) errors.newPassword = 'New password is required'
    if (passwordData.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters'
    if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords do not match'
    return errors
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    const errors = validateProfile()
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors)
      return
    }
    setProfileLoading(true)
    // API call will go here later
    setTimeout(() => {
      const updatedUser = {
        ...user,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setProfileSuccess('Profile updated successfully!')
      setProfileLoading(false)
    }, 800)
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    const errors = validatePassword()
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }
    setPasswordLoading(true)
    // API call will go here later
    setTimeout(() => {
      setPasswordSuccess('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setPasswordLoading(false)
    }, 800)
  }

  const handleDeleteAccount = async () => {
    console.log('Delete account triggered') // add this
    try {
      setDeleteLoading(true)
      await api('/profile', 'DELETE', null, token)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    } catch (error) {
      console.error('Failed to delete account:', error)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">

        {/* Profile header */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-teal-500 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-white">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-sm text-white/40 mt-1">{profileData.email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
              <span className="text-xs bg-violet-600/15 text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full">
                {profileData.department}
              </span>
              <span className="text-xs bg-white/5 text-white/40 border border-white/10 px-2.5 py-1 rounded-full">
                {profileData.university}
              </span>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-5 pb-4 border-b border-white/5">
            Personal information
          </h2>
          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {profileErrors.firstName && (
                  <span className="text-xs text-red-400">{profileErrors.firstName}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {profileErrors.lastName && (
                  <span className="text-xs text-red-400">{profileErrors.lastName}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Email address</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {profileErrors.email && (
                <span className="text-xs text-red-400">{profileErrors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {profileErrors.phone && (
                <span className="text-xs text-red-400">{profileErrors.phone}</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">University</label>
                <input
                  type="text"
                  name="university"
                  value={profileData.university}
                  onChange={handleProfileChange}
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {profileErrors.university && (
                  <span className="text-xs text-red-400">{profileErrors.university}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Department</label>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleProfileChange}
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {profileErrors.department && (
                  <span className="text-xs text-red-400">{profileErrors.department}</span>
                )}
              </div>
            </div>

            {profileSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-sm text-green-400">
                {profileSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
            >
              {profileLoading ? 'Saving...' : 'Save changes'}
            </button>

          </form>
        </div>

        {/* Change password */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-5 pb-4 border-b border-white/5">
            Change password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Current password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {passwordErrors.currentPassword && (
                <span className="text-xs text-red-400">{passwordErrors.currentPassword}</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">New password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Min. 8 characters"
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {passwordErrors.newPassword && (
                  <span className="text-xs text-red-400">{passwordErrors.newPassword}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Confirm new password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {passwordErrors.confirmPassword && (
                  <span className="text-xs text-red-400">{passwordErrors.confirmPassword}</span>
                )}
              </div>
            </div>

            {passwordSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-sm text-green-400">
                {passwordSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
            >
              {passwordLoading ? 'Updating...' : 'Update password'}
            </button>

          </form>
        </div>

        {/* Delete account */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-2">
            Delete account
          </h2>
          <p className="text-sm text-white/40 mb-5">
            Permanently delete your account and all your data. This action cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Delete my account
          </button>
        </div>

      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5">
          <div className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <div className="text-2xl mb-3">⚠️</div>
            <h3 className="text-base font-semibold text-white mb-2">
              Delete your account?
            </h3>
            <p className="text-sm text-white/40 mb-6">
              This will permanently delete all your data including routines, schedules and progress. This cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 text-sm font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  )
}