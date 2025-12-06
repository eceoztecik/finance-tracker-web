export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface FilterState {
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
}