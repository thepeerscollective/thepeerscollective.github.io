import OS from '@/components/OS';

export default function Page() {
  return (
    <main>
      <h1 className="sr" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>the peers collective, portfolio</h1>
      <OS />
    </main>
  );
}
