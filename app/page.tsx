'use client'

import { useState } from 'react'
import { MessageSquare, Send, Users, Settings, Play, Pause, Trash2, Plus } from 'lucide-react'

interface DMTemplate {
  id: string
  name: string
  message: string
  trigger: string
  active: boolean
}

interface Message {
  id: string
  username: string
  message: string
  timestamp: string
  sent: boolean
}

export default function Home() {
  const [templates, setTemplates] = useState<DMTemplate[]>([
    {
      id: '1',
      name: 'Welcome Message',
      message: 'Hey {username}! 👋 Thanks for reaching out. How can I help you today?',
      trigger: 'new_follower',
      active: true
    },
    {
      id: '2',
      name: 'Product Inquiry',
      message: 'Hi {username}! Thanks for your interest in our products. Check out our latest collection at our website!',
      trigger: 'keyword:product',
      active: true
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: 'user_john123',
      message: 'Hey! Thanks for reaching out. How can I help you today?',
      timestamp: '2025-01-06 10:30 AM',
      sent: true
    },
    {
      id: '2',
      username: 'sarah_miller',
      message: 'Hi Sarah! Thanks for your interest in our products. Check out our latest collection at our website!',
      timestamp: '2025-01-06 11:15 AM',
      sent: true
    },
    {
      id: '3',
      username: 'mike_designs',
      message: 'Hey! Thanks for reaching out. How can I help you today?',
      timestamp: '2025-01-06 12:00 PM',
      sent: true
    }
  ])

  const [activeTab, setActiveTab] = useState<'dashboard' | 'templates' | 'messages'>('dashboard')
  const [isAddingTemplate, setIsAddingTemplate] = useState(false)
  const [newTemplate, setNewTemplate] = useState({ name: '', message: '', trigger: '' })

  const toggleTemplateActive = (id: string) => {
    setTemplates(templates.map(t =>
      t.id === id ? { ...t, active: !t.active } : t
    ))
  }

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id))
  }

  const addTemplate = () => {
    if (newTemplate.name && newTemplate.message && newTemplate.trigger) {
      setTemplates([...templates, {
        id: Date.now().toString(),
        ...newTemplate,
        active: true
      }])
      setNewTemplate({ name: '', message: '', trigger: '' })
      setIsAddingTemplate(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Instagram Auto DM Agent
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Automated message management system</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'templates'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Send className="w-5 h-5" />
              Sent Messages
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Active Templates</h3>
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-purple-600">{templates.filter(t => t.active).length}</p>
              <p className="text-sm text-gray-500 mt-2">of {templates.length} total</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Messages Sent</h3>
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-purple-600">{messages.length}</p>
              <p className="text-sm text-gray-500 mt-2">last 24 hours</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Response Rate</h3>
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-purple-600">87%</p>
              <p className="text-sm text-gray-500 mt-2">average engagement</p>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Message Templates</h2>
              <button
                onClick={() => setIsAddingTemplate(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Template
              </button>
            </div>

            {isAddingTemplate && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">New Template</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Template Name</label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="e.g., Welcome Message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                    <textarea
                      value={newTemplate.message}
                      onChange={(e) => setNewTemplate({ ...newTemplate, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-24"
                      placeholder="Use {username} to personalize"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Trigger</label>
                    <input
                      type="text"
                      value={newTemplate.trigger}
                      onChange={(e) => setNewTemplate({ ...newTemplate, trigger: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="e.g., new_follower or keyword:product"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addTemplate}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Add Template
                    </button>
                    <button
                      onClick={() => setIsAddingTemplate(false)}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {templates.map((template) => (
              <div key={template.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{template.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{template.message}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium">
                        {template.trigger}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        template.active
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {template.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTemplateActive(template.id)}
                      className={`p-2 rounded-lg transition-all ${
                        template.active
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 hover:bg-yellow-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200'
                      }`}
                    >
                      {template.active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Sent Messages</h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {msg.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">@{msg.username}</p>
                        <p className="text-sm text-gray-500">{msg.timestamp}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-medium">
                      Sent
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 ml-13">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">⚠️ Demo Mode: Connect your Instagram account to start sending automated DMs</p>
        </div>
      </div>
    </main>
  )
}
