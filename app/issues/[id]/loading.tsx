
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';

const IssueDetailsLoadingPage = () => {
  return (
    <div>
       <Card size="1" style={{ width: '100%' }}>
                <Flex gap="3" align="center">
                    <Avatar size="5" radius="full" fallback={<Skeleton/>}/>
                </Flex>
                <Skeleton className="mt-2"/>
                <Skeleton/>
                <Skeleton/>
        </Card>
    </div>
  )
}

export default IssueDetailsLoadingPage
