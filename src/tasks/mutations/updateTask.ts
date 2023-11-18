import db from "db"
import * as z from "zod"
import { resolver } from "@blitzjs/rpc"

const UpdateTask = z.object({
  id: z.number(),
  name: z.string().optional(),
  isDone: z.boolean().optional(),
})

export default resolver.pipe(resolver.zod(UpdateTask), async ({ id, name, isDone }) => {
  const newTask = await db.task.update({
    where: {
      id,
    },
    data: {
      name,
      isDone,
    },
  })
  return {
    newTask,
  }
})
