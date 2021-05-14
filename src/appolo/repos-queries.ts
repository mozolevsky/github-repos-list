import { gql } from '@apollo/client'

export const GET_REPOS_QUERY = gql`
    query GetRepositoriesData($query: String!) {
        search(type: REPOSITORY, first: 50, query: $query) {
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        forkCount
                        stargazerCount
                        url
                    }
                }
            }
        }
    }
`
