import { useTaskContext } from '../../context/TaskContext';

const DeleteNotifications = () => {
    const {tasks, deletedTaskIds, onUndoDelete} = useTaskContext()
    const getTrimmedTitle = (id) => {
        const title = tasks.find(t => t.id === id).title;
        return title.length > 8 ? title.substring(0, 8) + "..." : title;
    }
    return (
        deletedTaskIds.length > 0 &&
        deletedTaskIds.map((id) => (
            <div key={id} className="message bg-blue-950 text-white py-1 relative fade-1">
                <div className="loader-line"></div>
                <div className="flex items-center gap-5 px-5">
                    <p>Task <span className='bg-white/10 px-2 rounded-lg'>{getTrimmedTitle(id)}</span> Deleted</p>
                    <button className='btn text-sm' onClick={() => onUndoDelete(id)}>Undo</button>
                </div>
            </div>
        ))
    )
}

export default DeleteNotifications