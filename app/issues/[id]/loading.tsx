
import { Box, Card, Flex, Grid} from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';

const IssueDetailsLoadingPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Skeleton />
        <Flex className="space-x-3" my="2">
          <Skeleton />
          <Skeleton />
        </Flex>
        <Card className="prose" mt="4">
          <Skeleton />
        </Card>
      </Box>
      <Box>
        <Skeleton />
      </Box>
    </Grid>
  )
}

export default IssueDetailsLoadingPage
