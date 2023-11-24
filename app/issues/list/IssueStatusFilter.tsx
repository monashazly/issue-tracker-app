'use client';

import { Select } from "@radix-ui/themes"
import { Status } from "@prisma/client";

interface status {
    label: string, value?: Status 
}

const statuses: status[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
 ];
const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by status...'/>
            <Select.Content position="popper">
                { statuses.map(status =>(
                    <Select.Item value={ status.label} key={status.label}> { status.label}</Select.Item>
                )) }
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter
