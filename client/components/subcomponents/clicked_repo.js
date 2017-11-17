import React, { Component } from 'react'

export const SingleRepo = ({ repo }) => console.log(repo) || (
    <div>
        <div>
            <h1><strong>Project : {repo.name}</strong></h1>
            <h1><strong>By@ {repo.owner.login}</strong></h1>
        </div>
        <div>
            <img src={repo.owner.avatarUrl}/>
        </div>
    </div>
)
