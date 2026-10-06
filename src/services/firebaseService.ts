import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  getDocFromServer
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser
} from 'firebase/auth';
import config from '../../firebase-applet-config.json';
import { NewsItem, ReelItem, UserProfile, CommentItem } from '../types';
import { NEWS_DATA, REELS_DATA } from '../data/newsData';

const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
});

export const auth = getAuth(app);
export const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

// Set browserLocalPersistence so device session remains active indefinitely
try {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
} catch (_) {}

// Validate Connection to Firestore on boot
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client appears offline:', error);
    }
  }
}
testFirestoreConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notification: ', JSON.stringify(errInfo));
}

// ----------------- PERMANENT DEVICE USER STORAGE HELPERS -----------------
const DEVICE_PROFILE_KEY = 'samitv_user_profile';
const DEVICE_PERSISTENT_KEY = 'samitv_device_persistent_user';
const DEVICE_USER_ID_KEY = 'samitv_device_user_id';

const saveUserToDeviceStorage = (profile: UserProfile) => {
  try {
    const jsonStr = JSON.stringify(profile);
    localStorage.setItem(DEVICE_PROFILE_KEY, jsonStr);
    localStorage.setItem(DEVICE_PERSISTENT_KEY, jsonStr);
    if (profile.uid) {
      localStorage.setItem(DEVICE_USER_ID_KEY, profile.uid);
    }
  } catch (e) {
    console.error('Error saving user to device storage:', e);
  }
};

// Ensure anonymous authentication for Firestore security rules ONLY if no user exists on this device
export const initAuth = async () => {
  try {
    const storedUser = getCurrentUserProfile();
    if (storedUser || (auth.currentUser && !auth.currentUser.isAnonymous)) {
      return;
    }
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
  } catch (error) {
    console.warn('Anonymous auth signin notice:', error);
  }
};

// Firestore collections
const NEWS_COLLECTION = 'news';
const REELS_COLLECTION = 'reels';
const USERS_COLLECTION = 'users';
const COMMENTS_COLLECTION = 'comments';

// ----------------- USER AUTHENTICATION & PROFILE -----------------

// Listen to Auth State and sync with Firestore & Device
export const subscribeToAuth = (callback: (userProfile: UserProfile | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser && !firebaseUser.isAnonymous) {
      try {
        const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));
        if (userDoc.exists()) {
          const profile = userDoc.data() as UserProfile;
          saveUserToDeviceStorage(profile);
          callback(profile);
          return;
        }
      } catch (err) {
        console.warn('Error fetching firestore profile during auth state change:', err);
      }
    }

    // Check device local storage
    const currentDeviceProfile = getCurrentUserProfile();
    if (currentDeviceProfile) {
      callback(currentDeviceProfile);
    } else {
      callback(null);
    }
  });
};

// Register New Account (Instant VIP Premium Activation & Permanent Device Storage)
export const registerUser = async (
  email: string,
  pass: string,
  displayName: string,
  phone?: string,
  district?: string
): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName });

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      displayName: displayName || 'সামি টিভি পাঠক',
      phone: phone || '',
      district: district || 'জামালপুর সদর',
      isPremium: true, // Instant VIP access upon creating account!
      premiumPlan: 'VIP Lifetime Member',
      joinedDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      savedNewsIds: [],
      adFreeEnabled: true,
      hdStreamingEnabled: true,
    };

    // Save to Firestore
    try {
      await setDoc(doc(db, USERS_COLLECTION, user.uid), userProfile);
    } catch (dbErr) {
      console.warn('Error syncing profile to Firestore:', dbErr);
    }

    // Permanently save to device
    saveUserToDeviceStorage(userProfile);

    return userProfile;
  } catch (error: any) {
    console.error('Registration error, generating permanent device account:', error);
    // If Firebase Auth domain isn't fully enabled for email or offline, fallback to permanent device VIP account
    const existingId = localStorage.getItem(DEVICE_USER_ID_KEY) || 'user_' + Date.now();
    const fallbackProfile: UserProfile = {
      uid: existingId,
      email,
      displayName: displayName || 'সামি টিভি ভিআইপি মেম্বার',
      phone: phone || '',
      district: district || 'জামালপুর',
      isPremium: true,
      premiumPlan: 'VIP Lifetime Member',
      joinedDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      savedNewsIds: [],
      adFreeEnabled: true,
      hdStreamingEnabled: true,
    };

    try {
      await setDoc(doc(db, USERS_COLLECTION, fallbackProfile.uid), fallbackProfile);
    } catch (_) {}

    saveUserToDeviceStorage(fallbackProfile);
    return fallbackProfile;
  }
};

// Login Existing Account
export const loginUser = async (email: string, pass: string): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Fetch profile from Firestore
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as UserProfile;
      saveUserToDeviceStorage(data);
      return data;
    }

    // If profile document doesn't exist yet, create VIP profile
    const newProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      displayName: user.displayName || email.split('@')[0],
      isPremium: true,
      premiumPlan: 'VIP Lifetime Member',
      joinedDate: new Date().toLocaleDateString('bn-BD'),
      savedNewsIds: [],
      adFreeEnabled: true,
      hdStreamingEnabled: true,
    };
    try {
      await setDoc(doc(db, USERS_COLLECTION, user.uid), newProfile);
    } catch (_) {}
    saveUserToDeviceStorage(newProfile);
    return newProfile;
  } catch (error: any) {
    console.warn('Firebase login attempt, trying device profile sync:', error);
    // Check saved device account
    const savedLocal = getCurrentUserProfile();
    if (savedLocal && savedLocal.email.toLowerCase() === email.toLowerCase()) {
      return savedLocal;
    }
    
    // Create & persist profile on this device
    const quickProfile: UserProfile = {
      uid: 'user_' + Date.now(),
      email: email,
      displayName: email.split('@')[0] || 'সামি টিভি গ্রাহক',
      isPremium: true,
      premiumPlan: 'VIP Lifetime Member',
      joinedDate: new Date().toLocaleDateString('bn-BD'),
      savedNewsIds: [],
      adFreeEnabled: true,
      hdStreamingEnabled: true,
    };
    saveUserToDeviceStorage(quickProfile);
    return quickProfile;
  }
};

// Logout (Explicit user action to clear device session)
export const logoutUser = async () => {
  try {
    await fbSignOut(auth);
  } catch (e) {
    console.warn('Sign out warning:', e);
  }
  localStorage.removeItem(DEVICE_PROFILE_KEY);
  localStorage.removeItem(DEVICE_PERSISTENT_KEY);
  localStorage.removeItem(DEVICE_USER_ID_KEY);
  await initAuth();
};

// Get current saved user profile from device storage
export const getCurrentUserProfile = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem(DEVICE_PROFILE_KEY) || localStorage.getItem(DEVICE_PERSISTENT_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error parsing stored user profile:', e);
  }
  return null;
};

// Update User Profile Settings (e.g. adFreeEnabled, district, hdStreaming)
export const updateUserProfile = async (profile: UserProfile): Promise<void> => {
  saveUserToDeviceStorage(profile);
  try {
    if (profile.uid) {
      await setDoc(doc(db, USERS_COLLECTION, profile.uid), profile, { merge: true });
    }
  } catch (e) {
    console.warn('Error updating profile in firestore:', e);
  }
};

// Bookmark News
export const toggleBookmark = async (newsId: string, currentProfile: UserProfile | null): Promise<UserProfile | null> => {
  if (!currentProfile) return null;
  const currentSaved = currentProfile.savedNewsIds || [];
  const isSaved = currentSaved.includes(newsId);
  const updatedSaved = isSaved
    ? currentSaved.filter(id => id !== newsId)
    : [...currentSaved, newsId];

  const updatedProfile: UserProfile = {
    ...currentProfile,
    savedNewsIds: updatedSaved,
  };

  await updateUserProfile(updatedProfile);
  return updatedProfile;
};

// ----------------- REAL-TIME COMMENTS -----------------
export const addNewsComment = async (comment: CommentItem) => {
  try {
    await initAuth();
    const commentDoc = doc(db, COMMENTS_COLLECTION, comment.id);
    await setDoc(commentDoc, {
      ...comment,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.warn('Error adding comment to Firestore:', e);
  }
};

export const subscribeToNewsComments = (newsId: string, callback: (comments: CommentItem[]) => void) => {
  initAuth();
  const q = collection(db, COMMENTS_COLLECTION);
  return onSnapshot(q, (snapshot) => {
    const items: CommentItem[] = [];
    snapshot.forEach(doc => {
      const data = doc.data() as CommentItem;
      if (data.newsId === newsId) {
        items.push(data);
      }
    });
    // Sort latest first
    items.sort((a, b) => (b.id > a.id ? 1 : -1));
    callback(items);
  }, (err) => {
    console.warn('Comments subscription error:', err);
  });
};

// Seed initial data if collection is completely empty (News is kept clean/empty by default)
export const seedInitialFirebaseData = async () => {
  try {
    await initAuth();
    
    // One-time purge of legacy dummy news if any existed
    const hasPurged = localStorage.getItem('dummy_news_purged_v3');
    if (!hasPurged) {
      try {
        const newsSnapshot = await getDocs(collection(db, NEWS_COLLECTION));
        if (!newsSnapshot.empty) {
          const batch = writeBatch(db);
          newsSnapshot.forEach(doc => {
            // Delete all previous dummy news
            batch.delete(doc.ref);
          });
          await batch.commit();
        }
        localStorage.setItem('dummy_news_purged_v3', 'true');
      } catch (e) {
        console.warn('Dummy news purge error:', e);
      }
    }

    const reelsSnapshot = await getDocs(collection(db, REELS_COLLECTION));
    if (reelsSnapshot.empty) {
      console.log('Seeding initial reels to Firebase Firestore...');
      const batch = writeBatch(db);
      for (const item of REELS_DATA) {
        const itemDoc = doc(db, REELS_COLLECTION, item.id);
        batch.set(itemDoc, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      await batch.commit();
    }
  } catch (err) {
    console.error('Error seeding Firebase data:', err);
  }
};

// Real-time listener for News
export const subscribeToNews = (callback: (news: NewsItem[]) => void) => {
  initAuth();
  const q = collection(db, NEWS_COLLECTION);
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback([]);
      return;
    }
    const items: NewsItem[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as NewsItem);
    });
    // Sort items: featured first, then newer by id or date
    items.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (b.id > a.id ? 1 : -1);
    });
    callback(items);
  }, (error) => {
    console.error('Firestore news subscription error:', error);
    // Fallback to empty list
    callback([]);
  });
};

// Real-time listener for Reels
export const subscribeToReels = (callback: (reels: ReelItem[]) => void) => {
  initAuth();
  const q = collection(db, REELS_COLLECTION);
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(REELS_DATA);
      return;
    }
    const items: ReelItem[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as ReelItem);
    });
    callback(items);
  }, (error) => {
    console.error('Firestore reels subscription error:', error);
    callback(REELS_DATA);
  });
};

// Save or Update News to Firebase
export const saveNewsToFirebase = async (newsItem: NewsItem) => {
  try {
    await initAuth();
    const docRef = doc(db, NEWS_COLLECTION, newsItem.id);
    await setDoc(docRef, {
      ...newsItem,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving news to Firebase:', error);
    throw error;
  }
};

// Delete News from Firebase
export const deleteNewsFromFirebase = async (newsId: string) => {
  try {
    await initAuth();
    const docRef = doc(db, NEWS_COLLECTION, newsId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting news from Firebase:', error);
    throw error;
  }
};

// Save or Update Reel to Firebase
export const saveReelToFirebase = async (reelItem: ReelItem) => {
  try {
    await initAuth();
    const docRef = doc(db, REELS_COLLECTION, reelItem.id);
    await setDoc(docRef, {
      ...reelItem,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving reel to Firebase:', error);
    throw error;
  }
};

// Delete Reel from Firebase
export const deleteReelFromFirebase = async (reelId: string) => {
  try {
    await initAuth();
    const docRef = doc(db, REELS_COLLECTION, reelId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting reel from Firebase:', error);
    throw error;
  }
};

// Clear all News from Firebase
export const clearAllNewsFromFirebase = async () => {
  try {
    await initAuth();
    const newsSnapshot = await getDocs(collection(db, NEWS_COLLECTION));
    const batch = writeBatch(db);
    newsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error clearing all news from Firebase:', error);
    throw error;
  }
};

// Reset Firestore with default news
export const resetFirebaseNews = async () => {
  try {
    await initAuth();
    const newsSnapshot = await getDocs(collection(db, NEWS_COLLECTION));
    const batch = writeBatch(db);
    newsSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error resetting Firestore news:', error);
    throw error;
  }
};
