import db from "db"
import * as z from "zod"
import { resolver } from "@blitzjs/rpc"

const CreateTask = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTask), async ({ name }) => {
  const newTask = await db.task.create({
    data: {
      name,
    },
  })
  return {
    newTask,
  }
})
