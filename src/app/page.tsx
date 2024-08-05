// File: app/page.tsx
"use client"

import React, { useState } from "react"

interface MatchResult {
  matched: boolean
  sophomoreId?: string
  clue?: string
  isExistingMatch?: boolean
}

export default function Home() {
  const [freshmanId, setFreshmanId] = useState<string>("")
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMatchResult(null) // Clear previous results
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ freshmanId }),
      })
      const data = (await response.json()) as MatchResult
      setMatchResult(data)
    } catch (error) {
      console.error("Error fetching match:", error)
      // Optionally set an error state here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Freshman-Sophomore Matching System
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={freshmanId}
              onChange={(e) => setFreshmanId(e.target.value)}
              placeholder="Enter Freshman ID"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Matching..." : "Match"}
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}
        {!isLoading && matchResult && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            {matchResult.matched ? (
              <div>
                <p
                  className={`text-lg font-semibold mb-2 ${
                    matchResult.isExistingMatch
                      ? "text-purple-600"
                      : "text-green-600"
                  }`}
                >
                  {matchResult.isExistingMatch
                    ? "Existing match found!"
                    : "New match found!"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Clue for your sophomore:</span>{" "}
                  {matchResult.clue}
                </p>
              </div>
            ) : (
              <p className="text-red-600 text-lg font-semibold">
                No match found at this time.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
