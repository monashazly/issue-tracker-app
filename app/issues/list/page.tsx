import prisma from "@/prisma/client"
import { Button, Table } from "@radix-ui/themes"
import Link from "next/link"
import IssueStatusBadge from "../../components/IssueStatusBadge"

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  return (
    <>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.id}</Table.Cell>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>{issue.description}</div>
                <div className='block md:hidden'>{issue.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.description}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>
    </>
  )
}

export default IssuesPage