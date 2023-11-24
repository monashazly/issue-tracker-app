'use client';

import { Select } from '@radix-ui/themes'
import { User, Issue } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

  const { data: users, error, isLoading } = useUsers()


  if (isLoading) return <Skeleton />
  if (error) return null

  const assignIssue = (userId: string) => {
    axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null }).then(() => {
      toast.success('Issue assigned successfully ')
    }).catch(err => {
      toast.error('Changes could not be saved')
    })
  }

  return (
    <div>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}>
        <Select.Trigger placeholder='Assign..' />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map(user => (
              <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </div>
  )
}
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
export default AssigneeSelect
