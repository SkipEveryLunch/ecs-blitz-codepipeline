import { FC, useState, useMemo } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Input, Button, VStack, Text, Flex, Box, Spacer } from "@chakra-ui/react"
import { useQuery, useMutation } from "@blitzjs/rpc"
import getTasks from "src/tasks/queries/getTasks"
import createTask from "src/tasks/mutations/createTask"
import updateTask from "src/tasks/mutations/updateTask"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const TaskItem: FC<{ name: string; isDone: boolean; onDone: () => void }> = ({
  name,
  isDone,
  onDone,
}) => {
  return (
    <Flex border="1px" borderColor="gray.200" p={3} rounded="md" justify="space-betweem">
      <Box>
        <Text textDecoration={isDone ? "line-through" : "none"}>{name}</Text>
      </Box>
      <Spacer />
      <Button p={0} size="sm" colorScheme="gray" onClick={onDone}>
        ×
      </Button>
    </Flex>
  )
}
const Home: BlitzPage = () => {
  const [name, setName] = useState("")
  const [{ tasks }, { refetch }] = useQuery(getTasks, {})
  const [updateTaskMutation] = useMutation(updateTask)
  const [createTaskMutation] = useMutation(createTask)

  const availableIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const addTask = async () => {
    if (name.length === 0) return
    await createTaskMutation({ name })
    setName("")
    await refetch()
  }
  const doneTask = async (id: number, isDone: boolean) => {
    if (!availableIds.includes(id)) return
    await updateTaskMutation({ id, isDone })
    setName("")
    await refetch()
  }
  return (
    <Layout title="Home">
      <VStack p={4}>
        <Flex mb={4}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Taskを追加..."
            mr={2}
          />
          <Button onClick={addTask}>＋</Button>
        </Flex>
        <VStack spacing={4} align="stretch" w="50%">
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                name={task.name}
                isDone={task.isDone}
                onDone={async () => await doneTask(task.id, !task.isDone)}
              />
            )
          })}
        </VStack>
      </VStack>
    </Layout>
  )
}

export default Home
