import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client'


export default async function Notes() {
  const queryClient = new QueryClient();

  const page = 1
  const query = ''

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, query],
    queryFn: () => fetchNotes(query, page),
  });

  const dehydrateState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateState}>
      <NotesClient initialPage={page} initialQuery={query} />
    </HydrationBoundary>
  );
}