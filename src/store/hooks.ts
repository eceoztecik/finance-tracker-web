import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// TypeScript destekli hook'lar
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()