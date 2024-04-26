import { redirect, useNavigate } from '@remix-run/react';
import { ActionFunction } from '@remix-run/node';

import { addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }
  
    return (
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    );
  }
  
  export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    }catch(error){
      return error;
    }

    await addExpense(expenseData);
    return redirect('/expenses');
  }