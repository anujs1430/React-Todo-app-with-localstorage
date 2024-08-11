import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";

const TodoList = () => {
    // State to manage the list of activities (todos)
    // Initial state is loaded from localStorage if available, otherwise an empty array
    const [listData, setListData] = useState(() => {
        const savedList = localStorage.getItem("listData"); // Try to get the list from localStorage
        return savedList ? JSON.parse(savedList) : []; // Parse the JSON if available, or return an empty array
    });

    // State to manage the current input value for a new activity
    const [activity, setActivity] = useState("");

    // Function to add a new activity to the list
    const addActivity = () => {
        if (activity.trim() === "") { // Check if the input is empty or only contains whitespace
            alert('Please Add Todo First'); // Show an alert if no valid input is provided
        } else {
            const updatedList = [...listData, activity]; // Create a new list with the existing activities and the new activity
            setListData(updatedList); // Update the listData state with the new list
            setActivity(""); // Clear the input field after adding the activity
        }
    }

    // Function to delete an activity based on its index in the array
    const deleteHandle = (index) => {
        const updatedList = listData.filter((_, i) => i !== index); // Filter out the item at the given index
        setListData(updatedList); // Update the listData state with the filtered list
    }

    // useEffect hook to save the listData to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("listData", JSON.stringify(listData)); // Convert the listData to JSON and store it in localStorage
    }, [listData]); // The effect runs every time listData changes

    return (
        <div id='todo-container' className='container'>
            <header className='text-center'>
                <h2>Todo List</h2>
            </header>

            <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder='Add Todo...'
                required
            />

            <button onClick={addActivity}>Add</button>

            <div>
                {
                    listData.length > 0 ? (
                        listData.map((i, id) => (
                            <div id={id} key={id} className='list'>
                                <div>{i}</div>
                                <button onClick={() => deleteHandle(id)}><MdDelete /></button>
                            </div>
                        ))
                    ) : (
                        <div><h5 className='no-todo'>No Todo List Available</h5></div>
                    )
                }
            </div>
        </div>
    );
}

export default TodoList;
