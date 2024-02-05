// this is a client component, because we need to use client-side feature
'use client'

// Importing the function to delete posts.
import {deletePost} from "@/app/actions/posts";

// Define the props that the PostDelete component expects.
interface PostDeleteProps {
    id: string, // The ID of the post to delete.
}

export default function PostDelete({id}: PostDeleteProps) {
    // Define the action to perform when the form is submitted.
    // This is how we do it if we omit the bind from the server action
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way.
        deletePost(id); // Delete the post with the given ID.
    };

    // Render a form with a single submit button. When the button is clicked, the form is submitted
    // and the deleteAction is performed.
    return <form onSubmit={deleteAction}>
        <button type="submit" className="text-sm opacity-30 text-red-500">Delete</button>
    </form>
}
