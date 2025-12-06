import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Transaction } from '../../types'

interface TransactionState {
  items: Transaction[]
  totalIncome: number
  totalExpense: number
}

const initialState: TransactionState = {
  items: [],
  totalIncome: 0,
  totalExpense: 0
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload)
      
      // Toplamları güncelle
      if (action.payload.type === 'income') {
        state.totalIncome += action.payload.amount
      } else {
        state.totalExpense += action.payload.amount
      }
    },
    
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.items.find(t => t.id === action.payload)
      
      if (transaction) {
        // Toplamları güncelle
        if (transaction.type === 'income') {
          state.totalIncome -= transaction.amount
        } else {
          state.totalExpense -= transaction.amount
        }
        
        // Transaction'ı sil
        state.items = state.items.filter(t => t.id !== action.payload)
      }
    }
  }
})

export const { addTransaction, deleteTransaction } = transactionSlice.actions
export default transactionSlice.reducer