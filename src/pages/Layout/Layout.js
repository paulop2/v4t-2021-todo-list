// import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import uniqid from 'uniqid'
import api from '../../services/api'

import { TaskForm } from '../../components/TaskForm/TaskForm'
import { TaskList } from '../../components/TaskList/TaskList'

export const Layout = () => {

    const [taskList, setTaskList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get('/tasks.json').then(response => {
            if (response.status === 200 && response.data) {
                const posts = Object.keys(response.data).map(key => ({
                    taskId: key,
                    ...response.data[key],
                }));

                const reorderedTaskListCopy = posts.sort((x, y) => x.createdAt - y.createdAt)

                setTaskList(reorderedTaskListCopy)
            } else if (response.status !== 200) {
                alert('Ops!!! Something wrong happened!!!\n\n Server error: ' + response.status);
            }
        }).catch(error => {
            alert('Ops!!! Something wrong happened!!!\n\n' + error);
        });
    }, []);




    const submitNewTask = (newTask) => {
        setLoading(true)

        api.post('/tasks.json', newTask).then(response => {
            if (response.status === 200) {
                const taskListCopy = [...taskList]
                taskListCopy.push({
                    ...newTask,
                    taskId: response.data.name
                })

                const reorderedTaskListCopy = taskListCopy.sort((x, y) => x.createdAt - y.createdAt)

                setLoading(false)
                setTaskList(reorderedTaskListCopy)
            } else {
                setLoading(false)

                alert('Ops!!! Something wrong happened!!!\n\n Server error: ' + response.status);
            }
        }).catch(error => {
            setLoading(false)

            alert('Ops!!! Something wrong happened!!!\n\n' + error);
        });
    }

    const changeTaskStatus = (taskId, moveTo) => {
        setLoading(true)

        // axios.patch('https://tech-2021-todo-list-default-rtdb.firebaseio.com/tasks/' + taskId + '.json', { status: moveTo }).then(response => {
        api.patch(`/tasks/${taskId}.json`, { status: moveTo }).then(response => {
            if (response.status === 200) {
                const taskListCopy = [...taskList]
                const taskToBeMoved = taskListCopy.find(x => x.taskId === taskId)

                taskToBeMoved.status = moveTo
                setLoading(false)
                setTaskList(taskListCopy)
            } else {
                setLoading(false)

                alert('Ops!!! Something wrong happened!!!\n\n Server error: ' + response.status);
            }
        }).catch(error => {
            setLoading(false)

            alert('Ops!!! Something wrong happened!!!\n\n' + error);
        });
    }

    const handleDeleteTask = (taskId) => {
        setLoading(true)

        api.delete(`/tasks/${taskId}.json`, {}).then(response => {
            if (response.status === 200) {
                // const taskListCopy = [...taskList]
                // const taskToBeRemoved = taskListCopy.find(x => x.taskId === taskId)

                setLoading(false)
                setTaskList(taskList.filter(taskList => taskList.taskId !== taskId))
            } else {
                setLoading(false)

                alert('Ops!!! Something wrong happened!!!\n\n Server error: ' + response.status);
            }


            //     await axios.delete(`https://tech-2021-todo-list-default-rtdb.firebaseio.com/tasks/${taskId}.json`);
            //     setTaskList(taskList.filter(taskList => taskIdonClick={ () => handleDeleteTask(taskId)} ))

            //     alert('Erro ao deletar caso, tente novamente')
            // }



        }).catch(error => {
            setLoading(false)

            alert('Ops!!! Something wrong happened!!!\n\n' + error);
        });
    }


    const Structure = styled.div`
        overflow-y: auto;
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: 8em 1fr 1fr 1fr 8em;
        grid-template-rows: 1rem 9rem 1fr;
        background-image: linear-gradient(to bottom right, #E7F0FD, #ACEEBB);
    `

    return <Structure>
        <TaskForm loading={loading} submitNewTask={submitNewTask} />
        <TaskList loading={loading} taskList={taskList} changeTaskStatus={changeTaskStatus} handleDeleteTask={handleDeleteTask} />
    </Structure>

}