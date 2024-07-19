// this is a server action
'use server'

// Import the database client and the Post type from Prisma

// Import the revalidatePath and redirect functions from Next.js

// Import the Zod library for validation
import {z} from 'zod'
import {Post} from "@prisma/client";
import {db} from "@/db";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

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

// Define an asynchronous function to create a post
export async function createPost(
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // Validate the form data against the post schema
    // If the form data does not match the schema, the safeParse method returns an object
    // with a success property of false and an error property containing the validation errors.
    // If the form data matches the schema, the safeParse method returns an object
    // with a success property of true and a data property containing the validated data.
    const result = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        // If validation passes, create a new post in the database
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        // If there's an error, return it
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Revalidate the path and redirect to the home page
    revalidatePath('/')
    redirect('/')
}

export async function updatePost(
    id: string,
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const result = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        post = await db.post.update({
            where: {id},
            data: {
                title: result.data.title,
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function deletePost(
    id: string,
): Promise<PostFormState> {
    let post: Post
    try {
        post = await db.post.delete({
            where: {id},
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}
