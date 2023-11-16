
import prisma from "@/prisma/client"
import {  Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Pencil2Icon} from '@radix-ui/react-icons';
import Link from "next/link"
import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import DeleteIssueButton from "../_components/DeleteButton";
import AssigneeSelect from "./AssigneeSelect";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
      const session = await getServerSession(authOptions)

    const issue = await prisma.issue.findUnique(
        {
            where: { id: parseInt(params.id) }
        })
        
    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex className="space-x-3" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose" mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            {session && (<Box>
                <Flex direction="column" gap="4">  
                <AssigneeSelect/>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/edit/${issue.id}`}>Edit Issue</Link>
                </Button>
                <DeleteIssueButton issueId={issue.id}/>
                </Flex>
            </Box>)}
        </Grid>
    )
}

export default IssueDetailsPage
