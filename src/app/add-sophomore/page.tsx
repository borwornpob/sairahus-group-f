"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddSophomore() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [clueForFreshman1, setClueForFreshman1] = useState("")
  const [clueForFreshman2, setClueForFreshman2] = useState("")
  const [willTakeSecondFreshman, setWillTakeSecondFreshman] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/add-sophomore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          nickname,
          clueForFreshman1,
          clueForFreshman2,
          willTakeSecondFreshman,
        }),
      })
      if (response.ok) {
        router.push("/")
      } else {
        // Handle error
        console.error("Failed to add sophomore")
      }
    } catch (error) {
      console.error("Error adding sophomore:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Sophomore
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Nickname"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={clueForFreshman1}
            onChange={(e) => setClueForFreshman1(e.target.value)}
            placeholder="Clue for Freshman 1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={clueForFreshman2}
            onChange={(e) => setClueForFreshman2(e.target.value)}
            placeholder="Clue for Freshman 2 (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={willTakeSecondFreshman}
              onChange={(e) => setWillTakeSecondFreshman(e.target.checked)}
              className="mr-2"
            />
            <label>Willing to take a second freshman</label>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Sophomore"}
          </button>
        </form>
      </div>
    </div>
  )
}
