import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const SAVE_BOOK = gql`
    mutation saveBook($book: booksInput!) {
        saveBook(book: $book) {
            username
            email
            savedBook {
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }

`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            email
            saveBook {
                authors 
                description
                title
                bookId
                image
                link
            }
        }
    }
`;