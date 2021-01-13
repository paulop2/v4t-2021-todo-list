import React, { useState } from 'react'
import styled from 'styled-components'

export const ItIsUrgent = () => {

    const [urgencyScale, setUrgencyScale] = useState([
        {
            urgency: 'low',
            color: '#71a1ff',
            selected: true,

        },
        {
            urgency: 'average',
            color: '#f8bd26',
            selected: false,

        },
        {
            urgency: 'low',
            color: '#ff7171',
            selected: false,
        },
    ])

    const FormItem = styled.div`
        display: flex;
        flex-direction: column;
        width: 25%;
        padding-left: 1rem;
    `

    const IsItUrgentLabel = styled.div`
        font-size: 30px;
    `
    const IsItUrgentSelectionArea = styled.div`
        display:flex;
        justify-content: space-around;
        align-items: center;
        height: 5rem;
        background: #FFF;
        box-shadow: 5px 5px 10px #a0c4da;
        border-radius:5px;
    `

    const generateUrgencyOptions = () => {
        return urgencyScale.map(urgency => {

            if (urgency.selected) {
                return <div
                    style={{
                        backgroundColor: urgency.color,
                        width: 'calc(2.5rem + 5px)',
                        height: 'calc(2.5rem + 5px)',
                        border: '5px solid #5BF326',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                />
            }

            return <div style={{
                backgroundColor: urgency.color,
                width: '2.5rem',
                height: '2.5rem',
                cursor: 'pointer'
            }} />

        })
    }

    return <FormItem>
        <IsItUrgentLabel>Is It Urgent? </IsItUrgentLabel>
        <IsItUrgentSelectionArea>
            {generateUrgencyOptions()}
        </IsItUrgentSelectionArea>
    </FormItem>
}