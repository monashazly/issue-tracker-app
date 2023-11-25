import prisma from "@/prisma/client"
import { Button, Flex, Table } from "@radix-ui/themes"
import Link from "next/link"
import IssueStatusBadge from "../../components/IssueStatusBadge"
import IssueStatusFilter from "./IssueStatusFilter"
import { Status } from "@prisma/client"
import { Issue } from "@prisma/client"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import NextLink from 'next/link';
import Pagination from "@/app/components/Pagination"
import { Metadata } from "next"



interface Props {
  searchParams: { status: Status, orderBy: keyof Issue , page : string }
}




const IssuesPage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status);
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [{ label: "ID", value: "id" },
  { label: "Description", value: "description" },
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
    ];

  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;
  const page = parseInt(searchParams.page) || 1
  const pageSize = 5

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where : {status} })


  return (
    <>
      <Flex mb="5" justify="between">
        <IssueStatusFilter />
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
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
          {
            !issues.length && (
              <Table.Row>
                <Table.Cell justify={"center"} colSpan={5}> There is no issues !</Table.Cell>
              </Table.Row>
            )
          }

        </Table.Body>

      </Table.Root>
      <div className="py-2">
      <Pagination  itemCount={issueCount} currentPage={page} pageSize={pageSize}/>
      </div>
    </>
  )
}

export const metadata:Metadata ={
  title : 'Issue Tracker - Issue list',
  description : 'View all project issues'
}

export default IssuesPage
