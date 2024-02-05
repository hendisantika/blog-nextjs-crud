// this is a server action
'use server'

// Import the database client and the Post type from Prisma

// Import the revalidatePath and redirect functions from Next.js

// Import the Zod library for validation
import {z} from 'zod'

// Define a schema for the post using Zod
const postSchema = z.object({
    // the title must be a string between 3 and 255 characters
    title: z.string().min(3).max(255),
    // the content must be a string between 10 and 4000 characters
    content: z.string().min(10).max(4000),
})

// Define an interface for the form state
interface PostFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[],
    }
}
