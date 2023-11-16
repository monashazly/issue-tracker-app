'use client';

import { Select } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { User } from '@prisma/client';
import axios from 'axios';

const AssigneeSelect = () => {

    const [ users , setUsers] = useState<User[]>([])

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {data} = await axios.get('/api/users')
            setUsers(data)
        }
        fetchUsers();
    } , [])

  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder='Assign..' />
        <Select.Content position="popper">
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               {users.map(user=>(
                  <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
               ))}
            </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default AssigneeSelect
