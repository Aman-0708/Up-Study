import { useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import Icon from '../components/Icon'
import { api } from '../utils/api'

const fileTypeColors = {
  'application/pdf': { bg: 'bg-red-500/10', text: 'text-red-400', label: 'PDF' },
  'application/msword': { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'DOC' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'DOCX' },
  'application/vnd.ms-powerpoint': { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'PPT' },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'PPTX' },
  'image/png': { bg: 'bg-green-500/10', text: 'text-green-400', label: 'IMG' },
  'image/jpeg': { bg: 'bg-green-500/10', text: 'text-green-400', label: 'IMG' },
}

const getFileType = (mimeType) => {
  return fileTypeColors[mimeType] || { bg: 'bg-white/5', text: 'text-white/40', label: 'FILE' }
}

const emptyForm = {
  title: '',
  description: '',
  subject: '',
  file: null,
}

export default function Hub() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [searchSubject, setSearchSubject] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLecturer = user.role === 'lecturer'

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async (subject = '') => {
    try {
      setLoading(true)
      const endpoint = subject ? `/materials?subject=${subject}` : '/materials'
      const data = await api(endpoint, 'GET', null, token)
      setMaterials(data)
    } catch (error) {
      console.error('Failed to fetch materials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchSubject(value)
    if (value.length > 2 || value.length === 0) {
      fetchMaterials(value)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] })
    setErrors({ ...errors, file: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.file) newErrors.file = 'Please select a file'
    return newErrors
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setUploading(true)
      setUploadError('')

      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('subject', form.subject)
      formData.append('file', form.file)

      const response = await fetch('http://localhost:5000/api/materials', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed')
      }

      setMaterials([data, ...materials])
      setShowModal(false)
      setForm(emptyForm)
    } catch (error) {
      setUploadError(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (material) => {
    try {
      await api(`/materials/${material._id}/download`, 'PUT', null, token)
      window.open(material.fileUrl, '_blank')
      setMaterials(materials.map((m) =>
        m._id === material._id ? { ...m, downloads: m.downloads + 1 } : m
      ))
    } catch (error) {
      console.error('Failed to track download:', error)
      window.open(material.fileUrl, '_blank')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api(`/materials/${id}`, 'DELETE', null, token)
      setMaterials(materials.filter((m) => m._id !== id))
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete material:', error)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Study Hub</h1>
          <p className="text-sm text-white/40 mt-1">
            Browse and download study materials
          </p>
        </div>
        {isLecturer && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Icon name="upload" size={15} />
            Upload material
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
          <Icon name="book" size={16} />
        </div>
        <input
          type="text"
          value={searchSubject}
          onChange={handleSearch}
          placeholder="Search by subject..."
          className="w-full bg-white/[0.03] border border-white/5 focus:border-accent-500 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
        />
      </div>

      {/* Materials grid */}
      {loading ? (
        <div className="text-center py-20 text-sm text-white/30">Loading materials...</div>
      ) : materials.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
            <Icon name="folder" size={28} />
          </div>
          <h2 className="text-base font-semibold text-white mb-2">No materials yet</h2>
          <p className="text-sm text-white/40">
            {isLecturer
              ? 'Upload the first study material for your students.'
              : 'No study materials have been uploaded yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => {
            const fileType = getFileType(material.fileType)
            const isOwner = material.uploadedBy === user._id
            return (
              <div
                key={material._id}
                className="bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col transition-all"
              >
                {/* File type badge + actions */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${fileType.bg} ${fileType.text}`}>
                    {fileType.label}
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => setDeleteId(material._id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Icon name="close" size={16} />
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 mb-4">
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                    {material.title}
                  </h3>
                  {material.description && (
                    <p className="text-xs text-white/40 mb-2 line-clamp-2">
                      {material.description}
                    </p>
                  )}
                  <span className="inline-block text-xs bg-accent-600/10 text-accent-400 border border-accent-500/20 px-2 py-0.5 rounded-full">
                    {material.subject}
                  </span>
                </div>

                {/* Footer */}
                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-white/50">{material.uploaderName}</div>
                      <div className="text-xs text-white/20 mt-0.5">{formatDate(material.createdAt)}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/30">
                      <Icon name="download" size={12} />
                      {material.downloads}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(material)}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-accent-600/15 hover:text-accent-400 border border-white/10 hover:border-accent-500/30 text-white text-xs font-medium py-2.5 rounded-lg transition-all"
                  >
                    <Icon name="download" size={13} />
                    Download
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Upload modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5">
          <div className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">Upload material</h2>
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); setErrors({}) }}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <Icon name="close" size={14} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Introduction to Calculus"
                  className="bg-white/5 border border-white/10 focus:border-accent-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {errors.title && <span className="text-xs text-red-400">{errors.title}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                  className="bg-white/5 border border-white/10 focus:border-accent-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {errors.subject && <span className="text-xs text-red-400">{errors.subject}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Description (optional)</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief description of the material..."
                  rows={3}
                  className="bg-white/5 border border-white/10 focus:border-accent-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">File</label>
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${form.file ? 'border-accent-500/40 bg-accent-600/5' : 'border-white/10 hover:border-white/20'}`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    {form.file ? (
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-accent-600/20 text-accent-400 flex items-center justify-center mx-auto mb-2">
                          <Icon name="file" size={20} />
                        </div>
                        <p className="text-sm text-accent-400 font-medium">{form.file.name}</p>
                        <p className="text-xs text-white/30 mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center mx-auto mb-2">
                          <Icon name="upload" size={20} />
                        </div>
                        <p className="text-sm text-white/40">Click to select a file</p>
                        <p className="text-xs text-white/20 mt-1">PDF, DOC, PPT, PNG, JPG</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.file && <span className="text-xs text-red-400">{errors.file}</span>}
              </div>

              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                  {uploadError}
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-accent-600 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {uploading ? (
                  'Uploading...'
                ) : (
                  <>
                    <Icon name="upload" size={15} />
                    Upload material
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5">
          <div className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
              <Icon name="file" size={22} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Delete this material?</h3>
            <p className="text-sm text-white/40 mb-6">
              This will permanently delete the file from the server. This cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 text-sm font-medium py-3 rounded-xl transition-colors"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  )
}