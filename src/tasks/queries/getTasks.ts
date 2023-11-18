import db from "db"
import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(async () => {
  const tasks = await db.task.findMany({})
  return {
    tasks,
  }
})
