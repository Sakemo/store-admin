import { AuthHeader } from "./(utils)/auth-header";

import { SetupStoreModal } from "./(utils)/setup-store-modal";

export default function Home() {
  return (
    <div>
        <header className="flex items-center justify-between p-4 border-b">
          <AuthHeader />
        </header>

        <main>
          <SetupStoreModal />
        </main>
    </div>
  );
}
