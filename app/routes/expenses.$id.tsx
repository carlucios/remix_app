// import { LoaderFunction } from "@remix-run/node";
import { ActionFunction, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpense } from "~/data/expenses.server";

export default function ExpensesByIdPage() {
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
  
// export const loader: LoaderFunction = async ({params}) => {
//   console.log('EXPENSES ID LOADER', params.id);
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export const action: ActionFunction = async ({params, request}) => {
  const expenseId = params.id;
  
  console.log(request.method);

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
  
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
  
    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');

  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return redirect('/expenses');
  }

}