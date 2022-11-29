/* eslint-disable no-undef */
const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo) {
    const response = await client
        .from('todos')
        .insert({
            todo: todo,
            complete: false,
            user_id: client.auth.user().id,
        })
        .single();

    // create a single incomplete todo with the correct 'todo' property for this user in supabase

    // once you have a response from supabase, comment this back in:
    return checkError(response);
}

export async function deleteAllTodos() {
    await client
        .from('todos')
        .delete()
        .match({ user_id: client.auth.user().id });
    // delete all todos for this user in supabase

    // once you have a response from supabase, comment this back in:
    // eslint-disable-next-line no-undef
    return checkError(response);
}

export async function getTodos() {
    const response = await client
        .from('todos')
        .select('*')
        .order('complete')
        .match({ user_id: client.auth.user().id });
    // get all todos for this user from supabase

    // once you have a response from supabase, comment this back in:
    return checkError(response);
}

export async function completeTodo(id) {
    const response = await client
        .from('todos')
        .update({ complete: true })
        .match({
            user_id: client.auth.user().id,
            id: id,
        });
    // find the and update (set complete to true), the todo that matches the correct id

    // once you have a response from supabase, comment this back in:
    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    const user = getUser();
    if (user) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    window.location.replace('../');
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}
