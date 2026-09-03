import React from 'react'

const TaskListFooter = ({ tasksLength, filteredLength }) => {
    return <div className="items-count text-center">
        {tasksLength === 0
            ? "No Tasks Added yet."
            : (filteredLength === 0
                ? "Try changing your search or filters."
                : `Showing ${filteredLength} Results`)
        }
    </div>
}

export default TaskListFooter