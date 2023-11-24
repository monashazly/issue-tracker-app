'use client';

import { Select } from "@radix-ui/themes"
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

interface status {
    label: string, value?: Status 
}

const statuses = [
    { label: 'All'  , value : 'all'},
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
 ];
 

 
const IssueStatusFilter = () => {
    const router = useRouter()

    return (
        <Select.Root 
        onValueChange={(status)=>{
            const query = status && status !== 'all' ? `?status=${status}` : ''
           router.push(`/issues/list${query}`)
        }}>
            <Select.Trigger placeholder='Filter by status...'/>
            <Select.Content position="popper">
                { statuses.map(status =>(
                    <Select.Item key={status.label} value={status.value}> { status.label}</Select.Item>
                )) }
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter
