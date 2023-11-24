'use client';

import { Select } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = () => {

  const { data: users, error, isLoading  , isFetching} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  });
  

  if(isLoading) return <Skeleton/>
  if (error) return null

  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder='Assign..' />
        <Select.Content position="popper">
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               {users?.map(user=>(
                  <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
               ))}
            </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default AssigneeSelect
