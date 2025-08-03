'use client'

import { useState, useEffect } from 'react'
import { whalePositionApi } from '@/services/api'
import type { WhalePosition } from '@/types'

export function useWhalePositions() {
  const [positions, setPositions] = useState<WhalePosition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPositions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await whalePositionApi.getActivePositions()
      
      if (response.success && response.data) {
        setPositions(response.data)
      } else {
        setError(response.error || 'Failed to fetch positions')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getPositionById = async (id: string): Promise<WhalePosition | null> => {
    try {
      const response = await whalePositionApi.getPositionById(id)
      if (response.success && response.data) {
        return response.data
      }
      return null
    } catch (err) {
      console.error('Error fetching position:', err)
      return null
    }
  }

  useEffect(() => {
    fetchPositions()
  }, [])

  return {
    positions,
    loading,
    error,
    refetch: fetchPositions,
    getPositionById,
  }
}

export function useWhalePosition(id: string) {
  const [position, setPosition] = useState<WhalePosition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await whalePositionApi.getPositionById(id)
        
        if (response.success && response.data) {
          setPosition(response.data)
        } else {
          setError(response.error || 'Failed to fetch position')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPosition()
    }
  }, [id])

  return { position, loading, error }
} 