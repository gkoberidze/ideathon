'use client'

import { useState } from 'react'

export default function ExamplePage() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(120)
  const [dislikes, setDislikes] = useState(3)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Array<{ name: string; text: string; ts: number }>>([])

  const onLike = () => {
    if (liked) {
      setLiked(false)
      setLikes((n) => Math.max(0, n - 1))
    } else {
      setLiked(true)
      setLikes((n) => n + 1)
      if (disliked) {
        setDisliked(false)
        setDislikes((n) => Math.max(0, n - 1))
      }
    }
  }

  const onDislike = () => {
    if (disliked) {
      setDisliked(false)
      setDislikes((n) => Math.max(0, n - 1))
    } else {
      setDisliked(true)
      setDislikes((n) => n + 1)
      if (liked) {
        setLiked(false)
        setLikes((n) => Math.max(0, n - 1))
      }
    }
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    setComments((prev) => [{ name: name.trim() || 'Guest', text: comment.trim(), ts: Date.now() }, ...prev])
    setComment('')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] bg-clip-text text-transparent">Omelette example</h1>
        <div className="hidden sm:flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Beginner</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">10 min</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Cooking</span>
        </div>
      </div>

      {/* Video */}
      <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
        <video controls className="w-full h-full" src="/videos/demo.mp4" />
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={onLike} className={`px-4 py-2 rounded-xl border-2 ${liked ? 'bg-[#7b2ff7] border-[#7b2ff7] text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-800'}`}>
          👍 Like {likes}
        </button>
        <button onClick={onDislike} className={`px-4 py-2 rounded-xl border-2 ${disliked ? 'bg-gray-700 border-gray-700 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-800'}`}>
          👎 Dislike {dislikes}
        </button>
        <button onClick={() => setSaved((s) => !s)} className={`px-4 py-2 rounded-xl border-2 ${saved ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-800'}`}>
          {saved ? '★ Saved' : '☆ Save'}
        </button>
        <button onClick={onCopy} className="px-4 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 text-gray-800">
          {copied ? 'Link copied!' : 'Share'}
        </button>
      </div>

      {/* Overview + Resources */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Lesson overview</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Crack, whisk, and season eggs properly.</li>
            <li>Control heat for a fluffy texture.</li>
            <li>Fold and plate like a pro.</li>
          </ul>
        </div>
        <div className="bg-white/90 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Resources</h3>
          <div className="space-y-2">
            <a href="/videos/demo.mp4" className="block px-4 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 text-gray-800">Download video</a>
            <a href="#" className="block px-4 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 text-gray-800">Recipe (PDF) — coming soon</a>
          </div>
        </div>
      </div>

      {/* Comments (client-only) */}
      <div className="mt-8 bg-white/90 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Leave a comment</h3>
        <form onSubmit={submitComment} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" className="sm:col-span-1 border-2 border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment" className="sm:col-span-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] hover:shadow-md">Post</button>
          </div>
        </form>
        {comments.length > 0 && (
          <div className="mt-4 space-y-3">
            {comments.map((c, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-gray-200/70 dark:border-gray-700/50">
                <div className="text-sm text-gray-500">{c.name} • {new Date(c.ts).toLocaleString()}</div>
                <div className="text-gray-900 dark:text-gray-100">{c.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
