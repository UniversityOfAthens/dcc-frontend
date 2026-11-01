import { PageContainer, PageHeader } from '@/components/page-container';

export default function Schedule() {
  return (
    <PageContainer wide>
      <PageHeader title="Πρόγραμμα" description="Οι επόμενες συναντήσεις όλων των ομάδων." />
      <div className="h-[75vh] min-h-[500px] w-full overflow-hidden rounded-2xl bg-card p-2">
        <iframe
          title="Πρόγραμμα συναντήσεων"
          className="h-full w-full rounded-xl [filter:invert(90%)_hue-rotate(180deg)] [html[data-darkreader-scheme='dark']_&]:[filter:none]"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAthens&showPrint=0&src=NzU4ZTlmY2NiMGM0NjAxYmIzMzNmYWI1MjZkNGUzMzIyNGQ0YTBjYWI4NjllZTIwMWEyYWYzNzkxMTIzNDUwYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23AD1457"
        ></iframe>
      </div>
    </PageContainer>
  );
}
