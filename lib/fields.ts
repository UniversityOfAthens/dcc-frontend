import { Section } from '@/types/section';

export type Field = {
  section: Exclude<Section, 'general'>;
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
};

export const fields: Field[] = [
  {
    section: 'security',
    title: 'Security',
    description:
      'Βουτήξτε στον κόσμο της ασφάλειας πληροφοριακών συστημάτων και μάθετε πώς να εντοπίζετε και να διορθώνετε ευπάθειες.',
    imageUrl: '/se-logo.png',
    pageUrl: '/security',
  },
  {
    section: 'gamedev',
    title: 'Game Development',
    description:
      'Εξερευνήστε τη δημιουργία παιχνιδιών από το μηδέν! Από την ανάπτυξη ιστοριών και σχεδιασμού μέχρι την κωδικοποίηση και την κυκλοφορία.',
    imageUrl: '/gd-logo.png',
    pageUrl: '/gamedev',
  },
  {
    section: 'cp',
    title: 'Competitive Programming',
    description:
      'Βελτιώστε τις δεξιότητές σας στον προγραμματισμό μέσα από απαιτητικές ασκήσεις, αλγοριθμικά challenges και διαγωνισμούς.',
    imageUrl: '/cp-logo.png',
    pageUrl: '/cp',
  },
  {
    section: 'hackathons',
    title: 'Hackathons',
    description:
      'Λάβετε μέρος σε δημιουργικά hackathons, λύνοντας πραγματικά προβλήματα, μαθαίνοντας νέα εργαλεία και συναγωνιζόμενοι με άλλες ομάδες.',
    imageUrl: '/h-logo.png',
    pageUrl: '/hackathons',
  },
  {
    section: 'art3d',
    title: '3D Art',
    description:
      'Εξερευνήστε τον κόσμο του 3D art, δημιουργώντας εντυπωσιακά μοντέλα, περιβάλλοντα και animations, ενώ μαθαίνετε νέα εργαλεία και τεχνικές.',
    imageUrl: '/art3d-logo.png',
    pageUrl: '/art3d',
  },
];

export const sectionLabelMap: Record<Section, string> = {
  general: 'General',
  gamedev: 'Game Development',
  security: 'Security',
  cp: 'Competitive Programming',
  hackathons: 'Hackathons',
  art3d: '3D Art',
};

export const getField = (section: Field['section']) => fields.find((f) => f.section === section)!;
