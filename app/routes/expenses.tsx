import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import ExpensesHeader from '~/components/navigation/ExpensesHeader';
import { getExpenses } from "~/data/expenses.server";

import expensesStyles from '~/styles/expenses.css';

export default function ExpensesLayout() {
    const expenses = useLoaderData();
    console.log('RENDERING EXPENSES LAYOUT');

    return (
        <>
            <ExpensesHeader />
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expenses</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses} />
            </main>
        </>
    );
};

export function loader() {
    console.log('EXPENSES LOADER');
    return getExpenses();
}

export function links() {
    return [{rel: 'stylesheet', href: expensesStyles}]
}