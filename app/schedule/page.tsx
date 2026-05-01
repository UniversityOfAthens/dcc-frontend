export default function Schedule() {
  return (
    <div className="h-[90vh] min-h-screen">
      <iframe
        className="w-full h-full p-4 [filter:invert(90%)_hue-rotate(180deg)] [html[data-darkreader-scheme='dark']_&]:[filter:none]"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAthens&showPrint=0&src=NzU4ZTlmY2NiMGM0NjAxYmIzMzNmYWI1MjZkNGUzMzIyNGQ0YTBjYWI4NjllZTIwMWEyYWYzNzkxMTIzNDUwYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23AD1457"
      ></iframe>
    </div>
  );
}
