import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { RepositoriesList } from './components/RepositoriesList'
import {client} from './appolo/client'

import 'antd/dist/antd.css'
import styles from './App.module.css'


function App() {
    return (
        <main className={styles.main}>
            <ApolloProvider client={client}>
                <RepositoriesList />
            </ApolloProvider>
        </main>
    )
}

export default App
