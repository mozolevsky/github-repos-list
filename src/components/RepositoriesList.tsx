import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Table, Spin, message, Input } from 'antd'
import { GET_REPOS_QUERY } from '../appolo/repos-queries'
import { INode, IRepositories } from '../interfaces/repos-types'
import styles from './RepositoriesList.module.css'

const { Search } = Input

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: ([text, url]: [string, string]) => <a href={url}>{text}</a>
    },
    {
        title: 'Stars',
        dataIndex: 'stars',
        key: 'stars'
    },
    {
        title: 'Forks',
        dataIndex: 'forks',
        key: 'forks'
    }
]

export const RepositoriesList: React.FC = () => {
    const [query, changeQuery] = useState('react')

    const { loading, data, error } = useQuery<IRepositories<INode>>(
        GET_REPOS_QUERY,
        {
            variables: {
                query
            }
        }
    )

    const onSearch = (value: string) => {
        changeQuery(value)
    }

    const transformData = (data: IRepositories<INode>) => {
        return data.search.edges.map(
            ({ node: { id, forkCount, name, stargazerCount, url } }) => {
                return {
                    key: id,
                    name: [name, url],
                    stars: stargazerCount,
                    forks: forkCount
                }
            }
        )
    }

    if (loading) return <Spin size="large" />
    if (error) {
        message.error(error)
    }

    return (
        <>
            <Search
                className={styles.search}
                placeholder="input repo search params"
                onSearch={onSearch}
                enterButton
                defaultValue={query}
            />
            <Table
                className={styles.table}
                columns={columns}
                dataSource={transformData(data!)}
            />
        </>
    )
}
