import React from 'react'
import styled from 'styled-components'

export const WhatToDo = () => {

    const FormItem = styled.div`
        display:flex;
        flex-direction:column;
        width: 35%;
    `
    const WhatToDoLabel = styled.div`
        font-size: 30px;
    `

    const InputWhatToDo = styled.input`
        background: #ffffff;
        box-shadow: 5px 5px 10px #a9c4da;
        border-radius: 5px;
        border: 0;
        height: 5rem;
        outline: none;
    `

    return <FormItem>
        <WhatToDoLabel> What to do?</WhatToDoLabel>
        <InputWhatToDo />
    </FormItem>
}