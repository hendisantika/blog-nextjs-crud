import {createPost} from "@/app/actions/posts";
import PostForm from "@/components/post-form";

// create a new server component PostsCreate.
export default function PostsCreate() {
    return (
        <main className="flex min-h-screen flex-col items-start p-24">
            <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                // Renders a PostForm component, passing the createPost action as the form action
                // and an initial data object with empty title and content.
                <PostForm formAction={createPost} initialData={{title: '', content: ''}}/>
            </div>
        </main>
    );
}
