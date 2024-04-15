import React, { useState } from 'react';
import { Button, Input, List, Checkbox } from 'antd';
import { Todo } from 'components/App';

interface TodoProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onUpdate: (id: number, task: string) => void;
}

const Todos = ({ todos, onDelete, onToggleComplete, onUpdate }: TodoProps) => {
    const [edit, setEdit] = useState<{ id: null | number; value: string }>({ id: null, value: "" });

    const handleEditChange = (e: any) => {
        setEdit({ ...edit, value: e.target.value });
    };

    const submitUpdate = (id: number) => {
        onUpdate(id, edit.value);
        setEdit({ id: null, value: "" });
    };

    return (
        <List
            size="large"
            bordered
            dataSource={todos}
            renderItem={item => (
                <List.Item>
                    <Checkbox checked={item.completed} onChange={() => onToggleComplete(item.id)} />
                    {edit.id === item.id ? (
                        <Input value={edit.value} onChange={handleEditChange} onPressEnter={() => submitUpdate(item.id)} />
                    ) : (
                        <div onDoubleClick={() => setEdit({ id: item.id, value: item.task })}>
                            {item.task}
                        </div>
                    )}
                    <Button onClick={() => onDelete(item.id)} type="dashed">Delete</Button>
                </List.Item>
            )}
        />
    );
};

export default Todos;
