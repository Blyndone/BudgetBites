import { fetchUser } from "./servertest.mjs";

const x =  await fetchUser()
console.log("--------------------------------")
console.log(x.payload.user.Name)


