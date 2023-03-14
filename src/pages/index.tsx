import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

const TODOS = [
  { id: "1", text: "Learn React" },
  { id: "2", text: "Learn Next.js" },
  { id: "3", text: "Learn React Query" },
];
type Todo = typeof TODOS[0];

export default function Home() {
  const { data, isLoading, isFetched, isFetching, isError, error } = useQuery(["hello"], () =>
    wait(100).then(() => [...TODOS])
  ) as UseQueryResult<typeof TODOS>;

  const queryClient = useQueryClient();

  const { mutate, isLoading: mutationIsLoading } = useMutation({
    mutationFn: (todo: Todo) => wait().then(() => TODOS.push(todo)),
    onSuccess: () => {
      queryClient.invalidateQueries(["hello"]);
    },
  });
  console.log(TODOS);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <h1>React Query</h1>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button
        disabled={mutationIsLoading}
        onClick={() => {
          mutate({
            id: crypto.randomUUID(),
            text: randomText(),
          });
        }}
      >
        Add Todo
      </button>
    </main>
  );
}

const randomDelay = () => Math.floor(Math.random() * 2500 + 500);
const wait = (ms: number = randomDelay()) => new Promise((resolve) => setTimeout(resolve, ms));
const randomText = () => Math.random().toString(36).substring(7);
