import AsideNav from '@/components/Navbar/AsideNav';
import WelcomeMessage from '@/components/Home/WelcomeMessage';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ScratchPad from '@/components/Home/ScratchPad';
import NotebookCard from '@/components/Home/NotebookCard';
import recentNotebook from '@/service/getRecentNotebook';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/signin');
  }
  const recentPromise = recentNotebook(session.user.AccessToken, 'recent');
  const oldPromise = recentNotebook(session.user.AccessToken, 'old');

  const [recent, old] = await Promise.all([recentPromise, oldPromise]);
  if (recent.error || old.error) {
    return;
  }
  return (
    <main className="flex">
      <AsideNav className="h-full w-[14rem] fixed top-0 left-0" />
      <div className="ml-[14rem] flex-grow h-full">
        <WelcomeMessage />
        <div className="-mt-40 my-2 z-50 relative grid grid-cols-6 gap-5 mx-3">
          <NotebookCard
            notebookCard={recent.data}
            oldNotebookCardData={old.data}
          />
          <ScratchPad />
        </div>
      </div>
    </main>
  );
}
