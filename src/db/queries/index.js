const queries = {
    addUser: `
        INSERT INTO users(
            first_name, 
            last_name,
            email,
            password,
            role
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `,
    getUser: `
        SELECT *
        FROM users
        WHERE email=$1
    `,
    viewBooks: `
    SELECT *
    FROM books
    `,
    addBooks: `
        INSERT INTO books(
            title,
            author
        )
        VALUES($1, $2)
        RETURNING *
    `,
    deleteBook: `
    DELETE FROM books
    WHERE id=$1 
    `,
    updateBook: `
    UPDATE books
        SET 
        title = $1,
        author = $2
        WHERE id = $3
        RETURNING *
    `,
    addUserCatalogue: `
        INSERT INTO catalogue(
            userId,
            bookId
        )
        VALUES($1, $2)
        RETURNING *
    `,
}

module.exports = queries