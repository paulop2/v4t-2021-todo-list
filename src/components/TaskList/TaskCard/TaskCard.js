import React from 'react'
import { Avatar, Card, Tag } from 'antd';
import styled from 'styled-components'
import uniqid from 'uniqid'

import { whoList } from '../../../helpers/whoList';
import { DeleteFilled } from '@ant-design/icons';



export const TaskCard = ({ taskId, changeTaskStatus, status, whatToDo, who, priority, handleDeleteTask }) => {

    const getPriorityToSetIntoTitle = () => {
        const ColorBlock = styled.span`
        display: inline-block;
        height: 1rem;
        width: 1rem;
        background-color: ${priority.color};
        margin-left: 1rem;
        `

        const CardTitle = styled.span`
        display: flex;
        align-items: center;
        `
        return <CardTitle> Priority <ColorBlock /> </CardTitle>
    }

    const getCardButtons = () => {
        const ToDo = <Tag style={{ cursor: 'pointer' }} color="volcano" onClick={() => changeTaskStatus(taskId, 'To Do')}> To Do </Tag>
        const Doing = <Tag style={{ cursor: 'pointer' }} color="magenta" onClick={() => changeTaskStatus(taskId, 'Doing')}> Doing </Tag>
        const Done = <Tag style={{ cursor: 'pointer' }} color="green" onClick={() => changeTaskStatus(taskId, 'Done')}> Done </Tag>

        switch (status) {
            case 'To Do':
                return [Doing, Done]
            default:
                return

            case 'Doing':
                return [ToDo, Done]

            case 'Done':
                return [ToDo, Doing]
        }
    }

    const Button = styled.button`
        background-color:#fff;
        border:0;

        ${DeleteFilled}:hover {
            opacity: 0.8;
        };
    `


    const Footer = styled.div` 
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    `


    return <Card
        key={uniqid()}
        size="small"
        title={getPriorityToSetIntoTitle()}
        extra={getCardButtons()}
        style={{
            marginBottom: '2rem',
            width: '100%',
            borderRadius: '5px'
        }}>

        <div>
            {whatToDo}
        </div>
        <Footer>

            <Button onClick={() => handleDeleteTask(taskId)}  ><DeleteFilled size={30} /></Button>

            <span> Created at {new Date().toLocaleDateString()} </span>

            <Avatar src={<img src={whoList.find(x => x.idx === who).avatarSource} alt={`Avatar ${who}`} />} />
        </Footer>
    </Card>

}
