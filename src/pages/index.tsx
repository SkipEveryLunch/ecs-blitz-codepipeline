import { FC, useState } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Input, Button, VStack, Text, Flex } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
type Todo = {
  code: string
  title: string
  isDone: boolean
}

const TodoItem: FC<{ title: string; isDone: boolean; onDone: () => void }> = ({
  title,
  isDone,
  onDone,
}) => {
  return (
    <Flex>
      <Text textDecoration={isDone ? "line-through" : "none"}>{title}</Text>
      <Button p={0} size="sm" colorScheme="gray" onClick={onDone}>
        ×
      </Button>
    </Flex>
  )
}
const Home: BlitzPage = () => {
  const [title, setTitle] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const addTodo = () => {
    if (title.length === 0) return
    const newTodo = {
      code: uuidv4(),
      title,
      isDone: false,
    }
    setTitle("")
    setTodos([newTodo, ...todos])
  }
  const doneTodo = (code: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.code === code) {
        return {
          code: todo.code,
          title: todo.title,
          isDone: !todo.isDone,
        }
      }
      return todo
    })
    setTodos(newTodos)
  }
  return (
    <Layout title="Home">
      <VStack p={4}>
        <Flex mb={4}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todoを追加..."
            mr={2}
          />
          <Button onClick={addTodo}>＋</Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.code}
                title={todo.title}
                isDone={todo.isDone}
                onDone={() => doneTodo(todo.code)}
              />
            )
          })}
        </VStack>
      </VStack>
    </Layout>
  )
}

export default Home
