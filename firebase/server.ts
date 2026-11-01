import 'server-only';
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

const serviceAccount: ServiceAccount = {
  projectId: 'coding-club-c45e8',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize app only once
const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];

const firestore: Firestore = getFirestore(app);

export const getTotalPages = async (
  fireStoreQuery: FirebaseFirestore.Query<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >,
  pageSize: number,
) => {
  const queryCount = fireStoreQuery.count();
  const countSnapshot = await queryCount.get();
  const countData = countSnapshot.data();
  const total = countData.count;
  return Math.ceil(total / pageSize);
};

export { firestore };
