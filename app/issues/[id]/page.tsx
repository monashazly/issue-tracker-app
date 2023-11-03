import prisma from "@/prisma/client"
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique(
        {
            where: { id: parseInt(params.id) }
        })
    if (!issue) notFound();

    await delay(2000)

    return (
        <div>
            <Card size="1" style={{ width: '100%' }}>
                <Flex gap="3" align="center">
                    <Avatar size="5" radius="full" fallback={issue.status} color={issue.status === 'OPEN' ? 'red' : issue.status === 'IN_PROGRESS' ? 'violet' : 'green'} />
                    <Box className="space-y-4">
                        <Text as="div" size="2" weight="bold">
                            {issue.title}
                        </Text>
                        <Text as="div" size="2" color="gray">
                            <ReactMarkdown>{issue.description}</ReactMarkdown>
                        </Text>
                        <Text as="div" size="2" color="gray">
                            {issue.createdAt.toDateString()}
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </div>
    )
}

export default IssueDetailsPage
