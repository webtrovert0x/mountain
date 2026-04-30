import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type SermonRecord = {
  id: string;
  title: string;
  date: string;
  videoUrl: string;
  description: string;
  viewCount?: number;
};

export type EventRecord = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: "Program" | "Vigil" | "Retreat" | "Other";
  description: string;
};

export const addSermon = async (payload: Omit<SermonRecord, "id">) => {
  await addDoc(collection(db, "sermons"), {
    ...payload,
    viewCount: payload.viewCount ?? 0,
  });
};

export const incrementSermonView = async (id: string) => {
  await updateDoc(doc(db, "sermons", id), {
    viewCount: increment(1),
  });
};

export const removeSermon = async (id: string) => {
  await deleteDoc(doc(db, "sermons", id));
};

export const subscribeSermons = (
  onChange: (items: SermonRecord[]) => void,
  onError?: (message: string) => void,
) => {
  const q = query(collection(db, "sermons"), orderBy("date", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: SermonRecord[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<SermonRecord, "id">),
      }));
      onChange(items);
    },
    (err) => onError?.(err.message),
  );
};

export const addEvent = async (payload: Omit<EventRecord, "id">) => {
  await addDoc(collection(db, "events"), payload);
};

export const removeEvent = async (id: string) => {
  await deleteDoc(doc(db, "events", id));
};

export const subscribeEvents = (
  onChange: (items: EventRecord[]) => void,
  onError?: (message: string) => void,
) => {
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: EventRecord[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<EventRecord, "id">),
      }));
      onChange(items);
    },
    (err) => onError?.(err.message),
  );
};

export const saveMapAddress = async (address: string) => {
  await setDoc(
    doc(db, "settings", "site"),
    { mapAddress: address },
    { merge: true },
  );
};

export const subscribeMapAddress = (
  onChange: (address: string) => void,
  onError?: (message: string) => void,
) => {
  return onSnapshot(
    doc(db, "settings", "site"),
    (snapshot) => {
      const data = snapshot.data() as { mapAddress?: string } | undefined;
      onChange(data?.mapAddress || "");
    },
    (err) => onError?.(err.message),
  );
};
