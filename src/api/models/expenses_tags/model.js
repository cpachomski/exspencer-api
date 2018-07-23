const MODEL = 'expenses_tags';

// only need create/ delete for when you add a tag to an expense
// make get tagsByExpenseId model method for use in type Expense

exports.createTable = `
        CREATE TABLE IF NOT EXISTS ${MODEL}
        (
            expense_id INT NOT NULL,
            tag_id INT NOT NULL,
            FOREIGN KEY (expense_id) REFERENCES expenses(id),
            FOREIGN KEY (tag_id) REFERENCES tags(id)
        );
    `;

// ADD INDEDES FOR user_id, id
