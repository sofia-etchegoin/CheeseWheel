//routes cheese.test.ts

// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/db-all-cheeses.ts'

vi.mock('../db/db')

describe('GET /api/v1/cheeses', () => {
  it('returns all cheeses', async () => {
    //Test logic
  })
})
