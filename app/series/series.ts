type Episode = {
  name: string;
  link1: string;
  link2: string;
  notes: string;
};

type Serie = {
  id: string;
  name: string;
  speaker: string;
  description: string;
  episodes: Episode[];
};

export const series: Serie[] = [
  {
    id: 'av-python',
    name: 'Python Introduction',
    speaker: 'Αυγερινός',
    description:
      'Είμαστε ενθουσιασμένοι να ανακοινώσουμε την έναρξη των εισαγωγικών διαλέξεων στην Python, σε συνεργασία με τον κύριο Αυγερινό. Οι διαλέξεις θα πραγματοποιούνται κάθε Δευτέρα, από τις 31/3, ώρα 11:00-13:00, στην αίθουσα Α2. Παράλληλα, θα καταγράφονται μέσω Delos για όσους δεν μπορούν να παρευρεθούν δια ζώσης. Σας περιμένουμε όλους για μια δυναμική εισαγωγή σε μία από τις πιο δημοφιλείς γλώσσες προγραμματισμού!',
    episodes: [
      {
        name: 'Lecture 1',
        link1: '',
        link2: '',
        notes:
          'https://drive.google.com/file/d/1ok2uAAM29LfWkDKmiSlvLLg4ivhywZEZ/view?usp=drive_link',
      },
      {
        name: 'Lecture 2',
        link1: 'https://uniflix.uoa.gr/events/player?id=69a3f59b0bc047d606578343',
        link2: 'https://uniflix.uoa.gr/events/player?id=69a3f7460bc047d60657e4a4',
        notes:
          'https://drive.google.com/file/d/1muI9R6u83VnuHRxpBrjscj745gOG1krW/view?usp=drive_link',
      },
      {
        name: 'Lecture 3',
        link1: 'https://uniflix.uoa.gr/events/player?id=69a3f60e0bc047d606579d63',
        link2: 'https://uniflix.uoa.gr/events/player?id=69a3f6e20bc047d60657cde4',
        notes:
          'https://drive.google.com/file/d/19LFJdGheGmLHt1WEDDa6zTJ8__v1gsA3/view?usp=drive_link',
      },
      {
        name: 'Lecture 4',
        link1: 'https://uniflix.uoa.gr/events/player?id=69a3f5810bc047d606577d4e',
        link2: 'https://uniflix.uoa.gr/events/player?id=69a3f7480bc047d60657e512',
        notes:
          'https://drive.google.com/file/d/1qTPLKxu3f8Og6vDTUP0DvhkooQXDZa2X/view?usp=drive_link',
      },
    ],
  },
];

export const getSerie = (id: string) => {
  return series.find((s) => s.id === id);
};
